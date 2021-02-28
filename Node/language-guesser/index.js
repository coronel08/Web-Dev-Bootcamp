// Can input a string in cli using command below. 
// node index.js "Querro comer comido de la escuela ahora"

const franc = require('franc')
const langs = require('langs')
const colors = require('colors')

const input = process.argv[2]
const langInput = franc(input)

if (langInput === "undefined"){
    console.log("Sorry Couldnt figure it out, try with more text. ")
} else {
    const language = langs.where('3',langInput)
    console.log(language.name.rainbow)
}
