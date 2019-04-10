import Typography from 'typography'
import './fonts.css'
import '../assets/webfonts/PublicSans-Light.woff2'
import '../assets/webfonts/PublicSans-Light.woff'
import '../assets/webfonts/PublicSans-Light.ttf'

import '../assets/webfonts/PublicSans-Black.woff2'
import '../assets/webfonts/PublicSans-Black.woff'
import '../assets/webfonts/PublicSans-Black.ttf'

import '../assets/webfonts/PublicSans-Thin.woff2'
import '../assets/webfonts/PublicSans-Thin.woff'
import '../assets/webfonts/PublicSans-Thin.ttf'

import '../assets/webfonts/PublicSans-Bold.woff2'
import '../assets/webfonts/PublicSans-Bold.woff'
import '../assets/webfonts/PublicSans-Bold.ttf'

const backupFonts = [
  'Helvetica Neue',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif',
]

const typography = new Typography({
  baseFontSize: '20px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Public Sans bold'].concat(backupFonts),
  bodyFontFamily: ['Public Sans'].concat(backupFonts),
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    a: {
      color: '#056DD4',
    },
    'a:visited': {
      color: '#056DD4',
    },
  }),
})

export default typography
