import Typography from 'typography'
import './fonts.css'

const font = [
  'Public Sans',
  'Helvetica Neue',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif',
]

const typography = new Typography({
  baseFontSize: '24px',
  baseLineHeight: 1.45,
  headerFontFamily: font,
  bodyFontFamily: font,
})

export default typography
