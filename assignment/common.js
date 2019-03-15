'use strict'

/*
* get random id number between 100 and range
* */
module.exports = {
    getRandomId: function(range){
        return '' + Math.floor(Math.random() * Math.floor(range - 100) + 100);
    }
}
