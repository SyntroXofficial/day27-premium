export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
};

export const TRANSITION_DEFAULTS = {
  duration: 0.3,
  ease: "easeInOut"
};

export const ROUTES = {
  HOME: '/',
  STEAM: '/steam',
  ACCOUNTS: '/accounts',
  METHODS: '/methods',
  OTHER_SERVICES: '/other-services',
  STREAMING: '/streaming',
  WARNING: '/warning'
};
