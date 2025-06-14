import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

// Import images
import signUpImage from '../assets/images/tutor_signup.png';
import verifiedImage from '../assets/images/get_verified.png';
import studentDashboard from '../assets/images/student_dashboard.png';
import tutorDashboard from '../assets/images/tutor_dashboard.png';

const steps = [
  {
    title: "Sign Up",
    description: "Create your tutor profile in minutes. Add your qualifications, teaching experience, and subjects you specialize in.",
    image: signUpImage
  },
  {
    title: "Get Verified",
    description: "Our team reviews your credentials to ensure high-quality standards. Most applications are verified within 24 hours.",
    image: verifiedImage
  },
  {
    title: "Start Looking for Your Next Student",
    description: "Browse through student requests that match your expertise. Our smart matching system helps find the perfect fit.",
    image: tutorDashboard
  },
  {
    title: "Chat with Parents/Students",
    description: "Connect directly with students or parents to understand their needs and discuss how you can help them succeed.",
    image: studentDashboard
  },
  {
    title: "Share Your Knowledge!",
    description: "Start teaching and making a difference in students' lives while earning competitive rates on your own schedule.",
    image: tutorDashboard
  }
];

export default function AnimatedHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAccumulator = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const isTransitioning = useRef(false);
  const nextSectionRef = useRef<HTMLElement | null>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Observer for when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !isMobile) {
          setCanScroll(false);
          scrollAccumulator.current = 0;
          // Find the next section when this section comes into view
          nextSectionRef.current = document.querySelector('[data-one-stop-solution]');
        }
      },
      {
        threshold: isMobile ? 0.2 : 0.4
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  // Handle scroll behavior (disabled on mobile)
  useEffect(() => {
    if (!isInView || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      // Allow scrolling up when at first step
      if (activeStep === 0 && e.deltaY < 0) {
        setCanScroll(true);
        return;
      }

      // Allow scrolling down to next section at last step
      if (activeStep === steps.length - 1 && e.deltaY > 0) {
        setCanScroll(true);
        if (nextSectionRef.current) {
          nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Prevent default scroll during step transitions
      if (!canScroll) {
        e.preventDefault();

        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY;

        // Define threshold for step change
        const threshold = 50;

        if (Math.abs(scrollAccumulator.current) >= threshold) {
          const direction = scrollAccumulator.current > 0 ? 'down' : 'up';
          setScrollDirection(direction);

          setActiveStep(prev => {
            const next = direction === 'down' ? prev + 1 : prev - 1;
            const bounded = Math.max(0, Math.min(next, steps.length - 1));

            // Reset accumulator after step change
            scrollAccumulator.current = 0;

            // Set transitioning flag
            isTransitioning.current = true;
            setTimeout(() => {
              isTransitioning.current = false;
            }, 500);

            return bounded;
          });
        }
      }
    };

    // Add wheel event listener to window to ensure we catch all scroll events
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, canScroll, activeStep, isMobile]);

  const slideVariants = {
    enter: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? 60 : -60,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? -60 : 60,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const transition = {
    y: { type: 'spring', stiffness: 100, damping: 10 },
    opacity: { duration: 0.3 },
    scale: { duration: 0.3 }
  } as const;

  return (
    <section 
      ref={sectionRef}
      data-how-it-works
      className={`relative bg-gray-50 ${
        isMobile 
          ? 'min-h-screen py-8 sm:py-12' 
          : `min-h-screen ${isInView && !canScroll ? 'fixed inset-0 w-full' : ''}`
      }`}
    >
      <div className={`container mx-auto px-4 sm:px-6 ${
        isMobile 
          ? 'py-8' 
          : 'py-16 md:py-24 h-screen flex flex-col'
      }`}>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            Join our community of expert tutors in just a few simple steps
          </p>
        </div>

        {isMobile ? (
          // Mobile Layout - Embla Carousel with Arrows
          <div className="relative w-full">
            <Carousel
              opts={{ align: "start", loop: false }}
              className="w-full"
              setApi={api => {
                if (!api) return;
                api.on("select", () => {
                  setActiveStep(api.selectedScrollSnap());
                });
              }}
            >
              <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-orange-200 text-orange-500 hover:bg-orange-100" />
              <CarouselContent>
                {steps.map((step, index) => (
                  <CarouselItem key={index} className="px-2">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col items-center">
                      <div className="bg-gradient w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mb-4">
                        {index + 1}
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">{step.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center mb-4">{step.description}</p>
                      </div>
                      <div className="relative bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg w-full max-w-xs mx-auto">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-3 sm:h-4 bg-[#1A1A1A] rounded-b-lg"></div>
                        <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
                          <img 
                            src={step.image}
                            alt={step.title}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-orange-200 text-orange-500 hover:bg-orange-100" />
            </Carousel>
          </div>
        ) : (
          // Desktop Layout - Side by Side
          <div className="flex-1 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Device Frame */}
            <div className="h-[min(500px,60vh)] lg:h-auto">
              <div className="relative h-full flex items-center">
                <div className="absolute inset-0 bg-gradient rounded-2xl opacity-20 blur-xl -m-4"></div>
                {/* Device Frame */}
                <div className="relative w-full max-w-[800px] mx-auto bg-[#1A1A1A] rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#1A1A1A] rounded-b-xl"></div>
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <AnimatePresence mode="wait" custom={scrollDirection}>
                      <motion.img 
                        key={activeStep}
                        src={steps[activeStep].image}
                        alt={steps[activeStep].title}
                        className="w-full h-auto"
                        custom={scrollDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transition}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right side - Steps */}
            <div className="relative h-[min(300px,40vh)] lg:h-auto flex items-center">
              <AnimatePresence mode="wait" custom={scrollDirection}>
                {steps.map((step, index) => (
                  index === activeStep && (
                    <motion.div
                      key={index}
                      custom={scrollDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={transition}
                      className="absolute w-full"
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        <div className="bg-gradient w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{step.title}</h3>
                          <p className="text-gray-600 text-base md:text-lg">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-gradient w-6 sm:w-8' : 'bg-gray-300 w-2'
              } ${isMobile ? 'cursor-pointer' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Spacer div to maintain scroll position (desktop only) */}
      {!isMobile && isInView && !canScroll && (
        <div style={{ height: '100vh' }} aria-hidden="true" />
      )}
    </section>
  );
} 