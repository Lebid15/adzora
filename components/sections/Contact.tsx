'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            تواصل معنا
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق رؤيتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              معلومات التواصل
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: HiMail,
                  title: 'البريد الإلكتروني',
                  value: 'info@adzora.net',
                  href: 'mailto:info@adzora.net',
                },
                {
                  icon: HiPhone,
                  title: 'رقم الهاتف',
                  value: '+966 50 123 4567',
                  href: 'tel:+966501234567',
                },
                {
                  icon: HiLocationMarker,
                  title: 'الموقع',
                  value: 'الرياض، المملكة العربية السعودية',
                  href: '#',
                },
              ].map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 space-x-reverse group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <item.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-lg text-gray-900 dark:text-white font-medium">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-2xl"
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                ساعات العمل
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً
                <br />
                الجمعة - السبت: مغلق
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  placeholder="أدخل اسمك"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-colors"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                  status === 'sending'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700'
                }`}
              >
                {status === 'sending' && 'جاري الإرسال...'}
                {status === 'success' && '✓ تم الإرسال بنجاح!'}
                {status === 'idle' && 'إرسال الرسالة'}
                {status === 'error' && 'حدث خطأ، حاول مرة أخرى'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
