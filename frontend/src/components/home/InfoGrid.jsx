import React from 'react';
import { motion } from 'framer-motion';

export default function InfoGrid() {
  return (
    <section className="bg-white">
      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-full">
          {/* Item 1 (larger left) - Now takes 3/4 of the space */}
          <motion.a
            href="#"
            className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow col-span-2 sm:col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/30 rounded-xl" />
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-xl group-hover:opacity-90 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
            </div>
            
            {/* Content - Expanded to take advantage of larger space */}
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

          {/* Item 2 (right column) - Now a vertical stack taking 1/4 of space */}
          <div className="flex flex-col gap-4 col-span-1">
            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glass morphism effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10" />
              {/* Animated background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
              
              {/* Content */}
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
            
            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/30 rounded-xl" />
              {/* Pattern background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
              
              {/* Content */}
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

            <motion.a
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-4 pt-40 flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/30 rounded-xl" />
              {/* Pattern background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
              
              {/* Content */}
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