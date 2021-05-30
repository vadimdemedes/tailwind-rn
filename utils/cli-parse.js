const meow = require('meow');
const path = require('path');

const cli = meow(`
  Usage
    $ create-tailwind-rn

  Options
    --rem, -r        change rem size in pixel (default: 16)
    --outFile, -o    change the path of the output file (default: **executing-folder**/styles.json)
`, {
  flags: {
    rem: {
      type: 'number',
      alias: 'r',
      default: 16
    },
    outFile: {
      type: 'string',
      alias: 'o',
      default: process.cwd() + '/styles.json',
    }
  }
});

const flags = {...cli.flags}
if (flags.outFile.endsWith('/')) {
  flags.outFile += 'styles.json'
} else if (!flags.outFile.endsWith('.json')) {
  flags.outFile += '.json'
}
flags.outFile = path.resolve(process.cwd(), flags.outFile)

module.exports = flags
