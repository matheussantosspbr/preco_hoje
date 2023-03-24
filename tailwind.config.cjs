/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors:{
        gray:{
          '900' : '#0B0F13',
          '900-0.70': 'rgba(0, 0, 0, 0.50)'
        },
        cyan:{
          '500': '#00B8EB '
        },
      },
      boxShadow: {
        'lg-top': '  0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'center': '  0 0px 10px 7px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'center-md': '  0 0px 10px 1px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'lg-inner': ' inset 0 20px 30px 0 rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
        'left': '  -5px 0 30px 20px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      backgroundImage:{
        galaxy: "url('/fundo_cabecalho.avif')",
      },
      backgroundSize: {
        'size-25': '25rem',
      },
      height:{
        '108': '28rem'
      },
      strokeWidth: {
        '5': '5px',
      },
      screens: {
        '2xl':{ 'max' : '1550px'},
        'xl': {'max': '1300px'},
        'lg': {'max': '950px'},
        'xmd': {'max': '768px'},
        'md': {'max': '550px'},
        'sm': {'max': '450px'},
        'xs': {'max': '375px'},

      },
      textShadow: {
        'default': '0 2px 0 #000',
        'md': '0 2px 2px #000',
        'h2': '5px 5px 5px #000',
        'h1': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
     }
      
    },
  },
  plugins: [
    require('tailwindcss-textshadow')],
}
