'use strict'

/*
* get random id number between 100 and range
* */
export function getRandomId(range){
    return '' + Math.floor(Math.random() * Math.floor(range - 100) + 100);
}
