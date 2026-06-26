export const USERS = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  admin: {
    username: process.env.ADMIN_USER || 'standard_user',
    password: process.env.ADMIN_PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: process.env.LOCKED_OUT_USER || 'locked_out_user',
    password: process.env.LOCKED_OUT_PASSWORD || 'secret_sauce',
  },
  problem: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.PROBLEM_PASSWORD || 'secret_sauce',
  },
  performanceGlitch: {
    username: process.env.PERFORMANCE_GLITCH_USER || 'performance_glitch_user',
    password: process.env.PERFORMANCE_GLITCH_PASSWORD || 'secret_sauce',
  },
  error: {
    username: process.env.ERROR_USER || 'error_user',
    password: process.env.ERROR_PASSWORD || 'secret_sauce',
  },
  visual: {
    username: process.env.VISUAL_USER || 'visual_user',
    password: process.env.VISUAL_PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;
