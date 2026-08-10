export const AnimationConfig = {
  typing: {
    speed: 100,     
    deleteSpeed: 50, 
    pauseTime: 2000, 
  },
  tilt: {
    maxTilt: 10,    
    perspective: 1000,  
    scale: 1.02,         
    speed: 400,         
    glare: true,           
    maxGlare: 0.2,         
  },
  reveal: {
    threshold: 0.15,   
    rootMargin: '0px 0px -50px 0px',
  },
};


export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isMobileDevice() {
  return window.innerWidth <= 768 || 'ontouchstart' in window;
}
