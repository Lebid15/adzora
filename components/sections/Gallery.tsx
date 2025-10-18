'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import type { GalleryItem } from '@/lib/types';

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Extract unique categories
  const categories = ['الكل', ...Array.from(new Set(items.map(item => item.category)))];

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'الكل' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const goToNext = () => {
    const nextIndex = (selectedIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            معرض الأعمال
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            استكشف أحدث تصاميمنا وأعمالنا الإبداعية
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => openLightbox(item, index)}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.category}</p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {item.type === 'video' ? '🎬 فيديو' : '🖼️ صورة'}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              لا توجد عناصر في هذا التصنيف
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="إغلاق"
              className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-10"
            >
              <HiX size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="السابق"
              className="absolute left-4 text-white hover:text-orange-500 transition-colors z-10"
            >
              <HiChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="التالي"
              className="absolute right-4 text-white hover:text-orange-500 transition-colors z-10"
            >
              <HiChevronRight size={48} />
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              {selectedItem.type === 'image' ? (
                <div className="relative aspect-video">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                />
              )}

              {/* Info */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-400">{selectedItem.category}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {selectedItem.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
