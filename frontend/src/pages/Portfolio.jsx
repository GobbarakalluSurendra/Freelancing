import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import runningGameImage from '../assets/Running-Game.png';

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'Design', 'Other'];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback Dummy Data
          setProjects([
            {
              _id: '1',
              title: 'Running-Game',
              description: 'A high-performance modern e-commerce platform with seamless checkout and real-time inventory.',
              category: 'Full Stack',
              imageUrl: runningGameImage,
              techStack: ['React.js', 'Node.js', 'MongoDB'],
              liveLink: 'https://black-cati.netlify.app/',
              githubLink: 'https://github.com/GobbarakalluSurendra/Running-Game1/tree/master'
            },
            {
              _id: '2',
              title: 'CryptoDash Analytics',
              description: 'Real-time cryptocurrency tracking dashboard featuring complex data visualization and live websockets.',
              category: 'Frontend',
              imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              techStack: ['React', 'Tailwind', 'Chart.js'],
              liveLink: '#',
              githubLink: '#'
            },
            {
              _id: '3',
              title: 'Taskify REST API',
              description: 'A highly scalable, secure backend microservice for task management with Redis caching layer.',
              category: 'Backend',
              imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
              liveLink: '#',
              githubLink: '#'
            },
            {
              _id: '4',
              title: 'Aura UI Design System',
              description: 'A comprehensive, accessible design system and UI kit built for rapid modern web development.',
              category: 'Design',
              imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              techStack: ['Figma', 'Tailwind CSS', 'Storybook'],
              liveLink: '#',
              githubLink: '#'
            },
            {
              _id: '5',
              title: 'WeatherApp Pro',
              description: 'A beautiful, location-aware progressive web app delivering accurate forecasts and radar maps.',
              category: 'Frontend',
              imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              techStack: ['React', 'OpenWeather API', 'PWA'],
              liveLink: '#',
              githubLink: '#'
            },
            {
              _id: '6',
              title: 'DevBlog Platform',
              description: 'A full MERN stack blogging platform with markdown support, SEO optimization, and user authentication.',
              category: 'Full Stack',
              imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              techStack: ['MongoDB', 'Express', 'React', 'Node'],
              liveLink: '#',
              githubLink: '#'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">Work</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A selection of my recent projects. From complex web applications to stunning marketing sites.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/30'
                  : 'bg-dark-800/50 text-slate-400 border-slate-700 hover:border-primary-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="glass-card overflow-hidden group"
                  >
                    <div className="relative h-64 overflow-hidden bg-dark-900">
                      <img
                        src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 backdrop-blur-sm">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
                            <ExternalLink className="h-6 w-6" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">
                            <FaGithub className="h-6 w-6" />
                          </a>
                        )}
                      </div>
                      {/* Category badge */}
                      {project.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-dark-900/80 backdrop-blur-sm text-primary-500 text-xs font-semibold rounded-full border border-primary-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-slate-400 mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-dark-900 text-primary-500 text-sm font-medium rounded-full border border-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 col-span-full text-center py-16 text-lg"
                >
                  No projects in this category yet.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
