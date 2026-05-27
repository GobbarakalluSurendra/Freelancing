import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Layout, Smartphone, Star, Quote, ExternalLink } from 'lucide-react';
import { FaGithub, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaWhatsapp } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiJavascript, SiTypescript } from 'react-icons/si';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const features = [
  {
    icon: <Layout className="h-8 w-8 text-primary-500" />,
    title: 'Modern Design',
    description: 'Creating visually stunning, user-centric interfaces that captivate and convert.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary-500" />,
    title: 'Clean Code',
    description: 'Scalable, maintainable, and highly optimized code architectures.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary-500" />,
    title: 'Responsive',
    description: 'Flawless experiences across all devices, from mobile to desktop.',
  },
];

const AVATAR_COLORS = [
  'bg-primary-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-purple-500', 'bg-amber-500', 'bg-rose-500',
];

const StarRating = ({ rating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
      />
    ))}
  </div>
);

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([
    {
      _id: '1',
      title: 'NLP Virtual Lab',
      description: 'An interactive virtual laboratory for Natural Language Processing experiments and educational purposes.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      techStack: ['Python', 'React', 'Flask', 'NLP'],
      liveLink: ' https://nlp-virtual-lab1.vercel.app/',
      githubLink: 'https://github.com/GobbarakalluSurendra/NLP-Virtual-Lab'
    },
    {
      _id: '2',
      title: 'Attendance Management System (AMS)',
      description: 'A robust web-based Attendance Management System built with PHP and MySQL supporting Admin, Teacher, and Student roles.',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      techStack: ['PHP', 'MySQL', 'CSS'],
      liveLink: '',
      githubLink: 'https://github.com/GobbarakalluSurendra/AMS'
    }
  ]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get('/api/testimonials');
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        if (data && data.length > 0) {
          setProjects(data.slice(0, 2)); // Get top 2 projects
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchTestimonials();
    // fetchProjects(); // Commented out to use the hardcoded GitHub projects
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-500 text-sm font-semibold tracking-wide uppercase shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              Available for Freelance Work
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Transforming Ideas <br className="hidden md:block" />
              into High-Performance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500 drop-shadow-sm">
                Web Applications
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              I'm a full-stack developer specializing in building modern, exceptional, high-quality websites and applications.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center text-lg px-8 py-4 group">
                Hire Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="btn-outline w-full sm:w-auto text-lg px-8 py-4">
                View My Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="w-full max-w-5xl mx-auto px-4 mt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Projects Completed', value: '20+' },
              { label: 'Happy Clients', value: '15+' },
              { label: 'Technologies', value: '10+' },
            ].map((stat, i) => (
              <div key={i} className="glass-card py-6 px-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brief About Me Snippet */}
      <section className="py-20 bg-dark-800/30 border-y border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Who Am <span className="text-accent-500">I?</span></h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              I'm a passionate full-stack developer dedicated to crafting beautiful, functional, and scalable digital solutions. With expertise in modern web technologies, I bridge the gap between stunning design and robust engineering to help businesses thrive in the digital landscape.
            </p>
            <Link to="/about" className="text-primary-400 hover:text-primary-300 font-semibold inline-flex items-center transition-colors">
              Read My Full Story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <section className="py-12 bg-dark-900 border-y border-slate-800 relative z-10 overflow-hidden flex items-center">
        <div className="flex w-max animate-marquee space-x-16 opacity-70 hover:opacity-100 hover:pause transition-opacity duration-300 py-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-16 items-center px-8">
              <FaReact className="h-12 w-12 text-slate-400 hover:text-[#61DAFB] transition-colors" />
              <FaNodeJs className="h-12 w-12 text-slate-400 hover:text-[#339933] transition-colors" />
              <SiJavascript className="h-10 w-10 text-slate-400 hover:text-[#F7DF1E] transition-colors" />
              <SiTypescript className="h-10 w-10 text-slate-400 hover:text-[#3178C6] transition-colors" />
              <SiMongodb className="h-12 w-12 text-slate-400 hover:text-[#47A248] transition-colors" />
              <SiTailwindcss className="h-12 w-12 text-slate-400 hover:text-[#06B6D4] transition-colors" />
              <FaHtml5 className="h-12 w-12 text-slate-400 hover:text-[#E34F26] transition-colors" />
              <FaCss3Alt className="h-12 w-12 text-slate-400 hover:text-[#1572B6] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Me?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Delivering value through expertise, innovation, and dedication.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 hover:-translate-y-2 hover:border-accent-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-300"
              >
                <div className="mb-6 inline-block p-4 bg-dark-900 rounded-xl shadow-inner border border-slate-700/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      {projects.length > 0 && (
        <section className="py-24 relative z-10 bg-dark-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Recent <span className="text-primary-500">Projects</span>
                </h2>
                <p className="text-slate-400 text-lg">A glimpse into my latest work.</p>
              </div>
              <Link to="/portfolio" className="hidden md:flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card overflow-hidden group flex flex-col"
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
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-slate-400 mb-6 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-dark-900 text-primary-400 text-xs font-medium rounded-full border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center md:hidden">
              <Link to="/portfolio" className="btn-outline inline-flex items-center">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  What Clients <span className="text-primary-500">Say</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                  Trusted by clients worldwide to deliver outstanding results.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
                >
                  {/* Quote icon */}
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-500/20" />

                  <StarRating rating={testimonial.rating} />

                  <p className="text-slate-300 leading-relaxed mt-4 mb-6 flex-grow italic">
                    "{testimonial.message}"
                  </p>

                  <div className="flex items-center space-x-4 mt-auto border-t border-slate-700/50 pt-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
                      {testimonial.avatarInitials || testimonial.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-slate-400 text-sm">
                        {testimonial.role}{testimonial.company ? ` @ ${testimonial.company}` : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 text-center rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-dark-900/50 z-0"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your next project?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let's work together to create something amazing. I'm currently accepting new freelance clients.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center w-full sm:w-auto justify-center">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="https://wa.me/919347040429" target="_blank" rel="noopener noreferrer" className="btn-accent text-lg px-8 py-4 inline-flex items-center w-full sm:w-auto justify-center">
                  WhatsApp Me
                  <FaWhatsapp className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
