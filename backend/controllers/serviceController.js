import Service from '../models/Service.js';

// Default services to seed if the database is empty
const defaultServices = [
  {
    icon: 'Monitor',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and highly interactive user interfaces using React and modern CSS frameworks.',
    price: 'Starting at $500',
  },
  {
    icon: 'Server',
    title: 'Backend Development',
    description: 'Creating robust RESTful APIs and server-side logic using Node.js, Express, and modern architectural patterns.',
    price: 'Starting at $600',
  },
  {
    icon: 'Database',
    title: 'Database Design',
    description: 'Designing optimized and scalable database schemas using MongoDB, PostgreSQL, or MySQL.',
    price: 'Starting at $400',
  },
  {
    icon: 'Smartphone',
    title: 'Full Stack Applications',
    description: 'End-to-end web application development from concept to deployment.',
    price: 'Starting at $1200',
  },
  {
    icon: 'PenTool',
    title: 'UI/UX Implementation',
    description: 'Translating Figma or Adobe XD designs into pixel-perfect, interactive code.',
    price: 'Starting at $300',
  },
  {
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Improving website visibility and performance through technical SEO best practices.',
    price: 'Starting at $250',
  },
];

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    let services = await Service.find({}).sort({ createdAt: 1 });
    
    // Seed database if no services are found
    if (services.length === 0) {
      await Service.insertMany(defaultServices);
      services = await Service.find({}).sort({ createdAt: 1 });
    }
    
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const { title, description, icon, price } = req.body;

    if (!title || !description || !icon || !price) {
      res.status(400);
      throw new Error('Please fill in all required fields (title, description, icon, price)');
    }

    const service = new Service({
      title,
      description,
      icon,
      price,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    const { title, description, icon, price } = req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.description = description || service.description;
      service.icon = icon || service.icon;
      service.price = price || service.price;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  } catch (error) {
    next(error);
  }
};
