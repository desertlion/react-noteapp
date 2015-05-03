'use strict';

var chalk = require('chalk');

var Testing = {};

Testing.greet = function ( name ){
    console.log(chalk.blue.bgWhite('Hello ' + name));
}

Testing.greet2 = function(){
    console.log(chalk.red.bgWhite('Hi, How are you'));
}

module.exports = Testing;
