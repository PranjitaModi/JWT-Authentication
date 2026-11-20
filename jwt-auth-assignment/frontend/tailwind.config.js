/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // --- color palette ---
      colors: {
        warm: '#FAF7F2',          // page background
        subtle: '#E8E2D9',        // card borders, dividers
        primary: {
          DEFAULT: '#0F766E',
          hover: '#115E59',
        },
        heading: '#1F2937',
        muted: '#6B7280',
        // role accents — teal, amber, rose (exact matches to Tailwind built-ins)
        // used as accent-user, accent-manager, accent-admin
        'accent-user':    '#0F766E',  // = teal-700
        'accent-manager': '#B45309',  // = amber-700
        'accent-admin':   '#BE123C',  // = rose-700
      },

      // --- typography ---
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      // --- shape ---
      borderRadius: {
        card:  '10px',
        input: '8px',
      },

      // --- transitions ---
      transitionDuration: {
        150: '150ms',
      },
    },
  },
  plugins: [],
}
