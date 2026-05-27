import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Smartphone, 
  Search, 
  Database, 
  PenTool, 
  Code, 
  Globe, 
  Layers, 
  Cpu, 
  Settings, 
  Shield, 
  Cloud,
  HelpCircle 
} from 'lucide-react';
import axios from 'axios';

const iconMap = {
  Monitor,
  Server,
  Smartphone,
  Search,
  Database,
  PenTool,
  Code,
  Globe,
  Layers,
  Cpu,
  Settings,
  Shield,
  Cloud,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('/api/services');
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary px-6 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">My <span className="text-primary-500">Services</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            I offer a comprehensive range of development services to help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || HelpCircle;
            return (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 flex flex-col h-full hover:border-primary-500/50 transition-colors"
              >
                <div className="mb-6">
                  <IconComponent className="h-10 w-10 text-primary-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 flex-grow mb-6">{service.description}</p>
                <div className="mt-auto">
                  <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-400 font-semibold rounded-lg border border-primary-500/20">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;

