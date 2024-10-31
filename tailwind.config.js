/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        marketsans: 'GmarketSans',
        korail: 'KORAIL',
        mono: 'Iosevka SS04 Web',
      },
      colors: {
        h: {
          'red': 'rgb(var(--color-red) / <alpha-value>)',
          'green': 'rgb(var(--color-green) / <alpha-value>)',
          'yellow': 'rgb(var(--color-yellow) / <alpha-value>)',
          'blue': 'rgb(var(--color-blue) / <alpha-value>)',
          'purple': 'rgb(var(--color-purple) / <alpha-value>)',
          'cyan': 'rgb(var(--color-cyan) / <alpha-value>)',
          'white': 'rgb(var(--color-white) / <alpha-value>)',
          'black': 'rgb(var(--color-black) / <alpha-value>)',

          'primary': 'rgb(var(--color-primary) / <alpha-value>)',
          'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        }
      },
      backgroundColor: {
        h: {
          'default': 'rgb(var(--color-background) / <alpha-value>)',
          'tone': 'rgb(var(--color-text) / <alpha-value>)',
        },
      },
      textColor: {
        h: {
          'default': 'rgb(var(--color-text) / <alpha-value>)',
        },
      },
      animation: {
        rainbowShadow: 'rainbowShadow 1s steps(2) infinite',
      },
      keyframes: {
        rainbowShadow: {
          '0%, 100%': {
            filter: 'drop-shadow(8px 0 #b3565d)',
          },
          '16%': {
            filter: 'drop-shadow(8px 0 #b79962)',
          },
          '33%': {
            filter: 'drop-shadow(8px 0 #799c60)',
          },
          '50%': {
            filter: 'drop-shadow(8px 0 #4d8cbf)',
          },
          '66%': {
            filter: 'drop-shadow(8px 0 #9e60b0)',
          },
          '83%': {
            filter: 'drop-shadow(8px 0 #202329)',
          },
        },
      },
    },
  },
  plugins: [],
}
