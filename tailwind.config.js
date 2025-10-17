/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        // Uncharted Brand Colors
        'deep-forest': '#2E5C3A',
        'warm-amber': '#D9885F',
        'ocean-sky': '#6AB7D6',
        'sandstone': '#F4E8D3',
        'gold-accent': '#F2C94C',
        
        // Extended palette for variations
        'deep-forest-light': '#4A7C5A',
        'deep-forest-dark': '#1E3D2A',
        'warm-amber-light': '#E5A67F',
        'warm-amber-dark': '#B86B3F',
        'ocean-sky-light': '#8BC7D6',
        'ocean-sky-dark': '#4A9BB6',
        'sandstone-light': '#F8F0E6',
        'sandstone-dark': '#E8D4B8',
        
        // Semantic colors
        primary: {
          50: '#F4E8D3',
          100: '#E8D4B8',
          500: '#2E5C3A',
          600: '#1E3D2A',
          700: '#0F1E15',
        },
        secondary: {
          50: '#F8F0E6',
          100: '#F4E8D3',
          500: '#D9885F',
          600: '#B86B3F',
          700: '#9A5A2F',
        },
        accent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#6AB7D6',
          600: '#4A9BB6',
          700: '#2A7B96',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '18px'],
        'sm': ['14px', '21px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '27px'],
        'xl': ['20px', '30px'],
        '2xl': ['22px', '33px'],
        '3xl': ['28px', '42px'],
        '4xl': ['32px', '48px'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}



