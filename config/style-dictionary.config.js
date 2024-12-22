// config/style-dictionary.config.js (or .mjs)
import StyleDictionary from 'style-dictionary';

// Register the CSS variables transform
StyleDictionary.registerTransform({
  name: 'css/variables',
  type: 'value',
  // matcher: (token) => {
  //   return token.attributes?.category === 'color';
  // },
  transform: (token) => {
    return `${token.value}`;
  }
});

const config = {
  source: ['src/styles/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['css/variables'],
      buildPath: 'src/styles/ui/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          showFileHeader: false
        }
      }]
    }
  }
};

export default config;