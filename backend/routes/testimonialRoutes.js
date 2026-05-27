import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  Get all testimonials
// @route GET /api/testimonials
// @access Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc  Create a testimonial
// @route POST /api/testimonials
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, role, company, message, rating } = req.body;

    // Auto-generate avatar initials from name
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
    });

    const created = await testimonial.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  Delete a testimonial
// @route DELETE /api/testimonials/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
