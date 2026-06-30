export const USERS = {
  standard: {
    username: process.env.STANDARD_USER!,
    password: process.env.STANDARD_PASSWORD!,
  },
  admin: {
    username: process.env.ADMIN_USER!,
    password: process.env.ADMIN_PASSWORD!,
  },
  lockedOut: {
    username: process.env.LOCKED_OUT_USER!,
    password: process.env.LOCKED_OUT_PASSWORD!,
  },
  problem: {
    username: process.env.PROBLEM_USER!,
    password: process.env.PROBLEM_PASSWORD!,
  },
  performanceGlitch: {
    username: process.env.PERFORMANCE_GLITCH_USER!,
    password: process.env.PERFORMANCE_GLITCH_PASSWORD!,
  },
  error: {
    username: process.env.ERROR_USER!,
    password: process.env.ERROR_PASSWORD!,
  },
  visual: {
    username: process.env.VISUAL_USER!,
    password: process.env.VISUAL_PASSWORD!,
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;
