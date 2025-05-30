import React from 'react';
import { motion } from 'framer-motion';

export default function InfoGrid() {
  return (
    <section className="bg-white">
      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-full">
          {/* Item 1 (grande) */}
          <motion.a
            href="#"
            className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow col-span-2 sm:col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/imagenes/14.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <motion.span
                className="text-xs font-medium tracking-wider text-indigo-100 mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                FEATURED PROJECT
              </motion.span>
              <motion.h3
                className="text-3xl font-bold tracking-tight mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Innovative Digital Solutions
              </motion.h3>
              <motion.p
                className="text-base text-gray-100 max-w-[85%] mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Discover our cutting-edge approach to modern design challenges with our comprehensive suite of services
              </motion.p>
              <motion.div
                className="flex items-center gap-2 text-sm font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Explore now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.a>

          {/* Column vertical */}
          <div className="flex flex-col gap-4 col-span-1">
            {/* Bento 2 */}
            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/16.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                <motion.span
                  className="text-xs font-medium tracking-wider text-white/80 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NEW COLLECTION
                </motion.span>
                <motion.h3
                  className="text-lg font-bold tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Minimalist Design
                </motion.h3>
              </div>
            </motion.a>

            {/* Bento 3 */}
            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/18.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black opacity-35 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                <motion.h3
                  className="text-lg font-bold tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Sustainability
                </motion.h3>
              </div>
            </motion.a>

            {/* Bento 4 */}
            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/9.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black opacity-15 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                <motion.h3
                  className="text-lg font-bold tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Team Insights
                </motion.h3>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
