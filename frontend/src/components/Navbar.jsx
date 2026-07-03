import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
   {name: 'Portfolio',   path: 'https://surendrag.netlify.app/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/SWS1.png"
              alt="Surendra Web Solutions"
              className="h-12 w-auto object-contain"
            />
            <span className="font-bold text-lg tracking-tight text-white leading-tight">
              Surendra <span className="text-primary-500">Web Solutions</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isExternal = link.path.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal 
                ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' }
                : { to: link.path };
              
              return (
                <LinkComponent
                  key={link.name}
                  {...linkProps}
                  className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                    !isExternal && location.pathname === link.path ? 'text-primary-500' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </LinkComponent>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-b border-slate-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isExternal = link.path.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal 
                  ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: link.path };
                
                return (
                  <LinkComponent
                    key={link.name}
                    {...linkProps}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      !isExternal && location.pathname === link.path
                        ? 'bg-primary-500/10 text-primary-500'
                        : 'text-slate-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </LinkComponent>
                );
              })}
              <Link
                to="/contact"
                className="block mt-4 text-center btn-primary w-full"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
