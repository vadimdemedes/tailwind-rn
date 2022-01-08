const emToPx = require('./em-to-px');

const remToPx = value => `${emToPx(value, 16)}px`;
module.exports = remToPx;
