import Typography from 'typography'

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
