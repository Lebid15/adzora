'use client';

import { motion } from 'framer-motion';
import { HiLightningBolt, HiSparkles, HiHeart } from 'react-icons/hi';

const features = [
  {
    icon: HiLightningBolt,
    title: 'سرعة في التنفيذ',
    description: 'نلتزم بتسليم مشاريعك في الوقت المحدد بأعلى جودة ممكنة',
  },
  {
    icon: HiSparkles,
    title: 'إبداع لا محدود',
    description: 'نقدم أفكار مبتكرة وتصاميم فريدة تميز علامتك التجارية',
  },
  {
    icon: HiHeart,
    title: 'شغف بالتميز',
    description: 'نعمل بشغف وإخلاص لتحقيق رضاك الكامل',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            من نحن
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            نحن فريق من المصممين المحترفين المتخصصين في تحويل الأفكار إلى تصاميم بصرية مذهلة
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-2xl mb-4"
              >
                <feature.icon size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '100+', label: 'مشروع منجز' },
            { number: '100+', label: 'عميل سعيد' },
            { number: '0+', label: 'جائزة' },
            { number: '2+', label: 'سنوات خبرة' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
