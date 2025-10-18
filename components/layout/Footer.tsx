'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Adzora</h3>
            <p className="text-gray-400">
              نحن متخصصون في تصميم الإنفوجرافيك والمحتوى البصري الإبداعي
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-orange-500 transition-colors">
                  المعرض
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Adzora. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
