const { writeFileSync } = require('fs')
const { argv } = require('yargs')
const config = require('../config/config.json')
const package = require('../package.json')

const { channel } = argv

const { expo } = config

const newConfig = {
  expo: {
    ...expo,
    name: channel ? `[${channel}] ${expo.name}` : expo.name,
    version: package.version,
  },
}

writeFileSync('./app.json', JSON.stringify(newConfig, null, 4))
