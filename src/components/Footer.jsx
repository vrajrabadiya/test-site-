import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', link: '#' },
    { name: 'Careers', link: '#' },
    { name: 'Contact', link: '#' },
    { name: 'Blog', link: '#' }
  ];

  const productLinks = [
    { name: 'Robotics Kits', link: '/products' },
    { name: 'AI & IoT', link: '/products' },
    { name: 'DIY Electronics', link: '/products' },
    { name: 'Student Innovation', link: '/products' }
  ];

  const workshopLinks = [
    { name: 'Upcoming Workshops', link: '/workshops' },
    { name: 'Past Workshops', link: '#' },
    { name: 'Certification', link: '#' },
    { name: 'Resources', link: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, link: '#' },
    { icon: Twitter, link: '#' },
    { icon: Instagram, link: '#' },
    { icon: Linkedin, link: '#' },
    { icon: Youtube, link: '#' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-secondary-bg border-t border-border-color/50 pt-20 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[200px] bg-primary-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Column */}
          <div>
            <Link to="/" className="text-2xl font-bold font-poppins text-primary-accent flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <span className="text-lg font-black tracking-tighter">NR</span>
              </div>
              NeuroRob
            </Link>
            <p className="text-secondary-text mb-6 text-sm leading-relaxed">
              Empowering students, innovators and makers through robotics, AI and hands-on technology learning.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    className="w-9 h-9 rounded-lg bg-card-bg border border-border-color flex items-center justify-center text-secondary-text hover:text-primary-accent hover:border-primary-accent hover:shadow-[0_0_10px_rgba(255,122,0,0.3)] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary-text">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="text-secondary-text hover:text-primary-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary-accent group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary-text">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className="text-secondary-text hover:text-primary-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary-accent group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Workshops Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary-text">Workshops</h4>
            <ul className="space-y-3">
              {workshopLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className="text-secondary-text hover:text-primary-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary-accent group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border-color/50 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-secondary-text text-sm">
            © {new Date().getFullYear()} NeuroRob. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 w-10 h-10 rounded-full border border-border-color bg-card-bg flex items-center justify-center text-secondary-text hover:text-primary-accent hover:border-primary-accent transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,122,0,0.3)]"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;