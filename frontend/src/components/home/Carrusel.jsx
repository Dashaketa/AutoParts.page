import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const brands = [
  { src: '/logos/Audi.svg', alt: 'Audi' },
  { src: '/logos/BMW.svg', alt: 'BMW' },
  { src: '/logos/Chevrolet.svg', alt: 'Chevrolet' },
  { src: '/logos/Ford_logo.svg', alt: 'Ford' },
  { src: '/logos/Hyundai_Motor_Company_logo.svg', alt: 'Hyundai' },
  { src: '/logos/KIA_logo3.svg', alt: 'KIA' },
  { src: '/logos/Mercedes-Benz_Logo_2010.svg', alt: 'Mercedes-Benz' },
  { src: '/logos/Nissan_2020_logo.svg', alt: 'Nissan' },
  { src: '/logos/Peugeot_Logo.svg', alt: 'Peugeot' },
  { src: '/logos/Renault_2021.svg', alt: 'Renault' },
  { src: '/logos/Toyota_carlogo.svg', alt: 'Toyota' },
  { src: '/logos/Volkswagen_logo_2019.svg', alt: 'Volkswagen' },
  { src: '/logos/Acura.svg', alt: 'Acura' },
  { src: '/logos/Chery.svg', alt: 'Chery' },
  { src: '/logos/Infiniti.svg', alt: 'Infiniti' },
  { src: '/logos/Jeep.svg', alt: 'Jeep' },
  { src: '/logos/Lexus.svg', alt: 'Lexus' },
  { src: '/logos/Mazda.svg', alt: 'Mazda' },
  { src: '/logos/Mitsubishi.svg', alt: 'Mitsubishi' },
  { src: '/logos/Subaru.svg', alt: 'Subaru' },
  { src: '/logos/Suzuki.svg', alt: 'Suzuki' },
];

const glowColors = [
  'shadow-[0_0_15px_5px_rgba(96,165,250,0.3)]',
  'shadow-[0_0_15px_5px_rgba(168,85,247,0.3)]',
  'shadow-[0_0_15px_5px_rgba(245,158,11,0.3)]',
  'shadow-[0_0_15px_5px_rgba(16,185,129,0.3)]',
  'shadow-[0_0_15px_5px_rgba(244,63,94,0.3)]',
  'shadow-[0_0_15px_5px_rgba(99,102,241,0.3)]'
];

export default function Carrusel() {
  const [currentGlows, setCurrentGlows] = useState([]);

  useEffect(() => {
    setCurrentGlows(brands.map(() => glowColors[Math.floor(Math.random() * glowColors.length)]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGlows(prev => prev.map(() => glowColors[Math.floor(Math.random() * glowColors.length)]));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative py-24 bg-white w-full overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
       

        {/* Fila Superior */}
        <motion.div 
          className="w-full relative mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={40}
            autoplay={{ 
              delay: 0, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={7500}
            loop
            className="swiper-brand-container"
          >
            {brands.map((logo, i) => (
              <SwiperSlide key={`top-${i}`} className="!w-[200px]">
                <div className={`p-6 rounded-xl bg-white border border-gray-100 transition-all duration-1000 ${currentGlows[i]}`}>
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-12 w-full object-contain grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Fila Inferior */}
        <motion.div 
          className="w-full relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={40}
            autoplay={{ 
              delay: 0, 
              disableOnInteraction: false,
              reverseDirection: true,
              pauseOnMouseEnter: true
            }}
            speed={7500}
            loop
            className="swiper-brand-container"
          >
            {[...brands].reverse().map((logo, i) => (
              <SwiperSlide key={`bottom-${i}`} className="!w-[200px]">
                <div className={`p-6 rounded-xl bg-white border border-gray-100 transition-all duration-1000 ${currentGlows[i]}`}>
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-12 w-full object-contain grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.div>
  );
}