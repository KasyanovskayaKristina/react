const withFonts = require('next-fonts')
const withImages = require('next-images')

module.exports = withImages(
  withFonts({
    webpack(config) {
      return config
    },
  }),
)
