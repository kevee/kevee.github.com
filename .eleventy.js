const { marked } = require('marked')
const fg = require('fast-glob')

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget('./src/sass/')
  eleventyConfig.addPassthroughCopy('./src/assets')

  eleventyConfig.addGlobalData('flipbook', () => {
    return fg
      .sync('./src/assets/images/animation/*.jpg')
      .map((file) => file.replace('./src/assets/images/animation/', ''))
  })

  eleventyConfig.addFilter('marked', (content) => {
    return marked.parse(content)
  })

  eleventyConfig.addFilter('markedInline', (content) => {
    return marked.parseInline(content)
  })

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
