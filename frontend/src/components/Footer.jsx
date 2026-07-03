import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/SWS1.png"
                alt="Surendra Web Solutions"
                className="h-12 w-auto object-contain"
              />
              <span className="font-bold text-lg tracking-tight text-white leading-tight">
                Surendra <span className="text-primary-500">Web Solutions</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Crafting modern, high-performance web applications that drive business growth and user engagement.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/GobbarakalluSurendra" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-primary-500 hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/gobbarakallusurendra/" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-primary-500 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
             <a
                  href="https://www.instagram.com/code_with_chinnu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-primary-500 hover:text-white transition-colors"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-primary-500 transition-colors">About Me</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-primary-500 transition-colors">Services</Link></li>
              <li><Link to="https://surendrag.netlify.app/" className="text-slate-400 hover:text-primary-500 transition-colors">Portfolio</Link></li>
              <li><Link to="/reviews" className="text-slate-400 hover:text-primary-500 transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-slate-400">
                <Mail className="h-5 w-5 mr-3 text-primary-500" />
              gobbarakallusurendra1@gmail.com
              </li>
              <li className="text-slate-400">
                Available for freelance opportunities worldwide.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Surendra. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
