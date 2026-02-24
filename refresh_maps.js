"use strict";
const generator = require('./service/a_aaa_map4db_generator');
console.log('Starting map generation!')
generator.generateAll().then(function (result) {
  console.log('THE END!', result)
})


