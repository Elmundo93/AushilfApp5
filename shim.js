if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

global.process = require('process');
global.process.browser = true;

if (typeof btoa === 'undefined') global.btoa = str => Buffer.from(str, 'binary').toString('base64');
if (typeof atob === 'undefined') global.atob = b64Encoded => Buffer.from(b64Encoded, 'base64').toString('binary');