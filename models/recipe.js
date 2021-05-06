const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipe: {
        type: String,
        required: false
    },
    ingredients: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('Recipe', recipeSchema)