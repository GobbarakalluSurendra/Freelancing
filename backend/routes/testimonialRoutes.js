import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  Get approved testimonials (public)
// @route GET /api/testimonials
// @access Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc  Get ALL testimonials including pending — PUBLIC for admin dashboard use
// @route GET /api/testimonials/all
// @access Public (personal portfolio — no sensitive data)
router.get('/all', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc  Client submits a review (public, pending approval)
// @route POST /api/testimonials/submit
// @access Public
router.post('/submit', async (req, res) => {
  try {
    const { name, role, company, message, rating } = req.body;

    if (!name || !role || !message) {
      return res.status(400).json({ message: 'Name, role, and message are required.' });
    }

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const testimonial = new Testimonial({
      name,
      role,
      company: company || '',
      message,
      rating: Number(rating) || 5,
      avatarInitials: initials,
      approved: false,
    });

    await testimonial.save();
    res.status(201).json({ message: 'Thank you! Your review has been submitted and is pending approval.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  Admin adds a testimonial (auto-approved)
// @route POST /api/testimonials
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, role, company, message, rating } = req.body;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const testimonial = new Testimonial({
      name,
      role,
      company,
      message,
      rating: Number(rating) || 5,
      avatarInitials: initials,
      approved: true,
    });

    const created = await testimonial.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  Approve a testimonial
// @route PUT /api/testimonials/:id/approve
// @access Private/Admin
router.put('/:id/approve', protect, admin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    testimonial.approved = true;
    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc  Delete a testimonial
// @route DELETE /api/testimonials/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
