
const { default: mongoose } = require('mongoose');
const express = require('mongoose');


const reviewSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        minLength:10,
    }

})

reviewSchema.set('toJSON', {
    transform:(document,returnedDocument) =>{
        returnedDocument.id= document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

// create Schema  --> build strcture to store data
const bookSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    
    reviews:[reviewSchema]
}, 
{timestamps: true});
  // timestamps --> track when the book is added/updated

 bookSchema.set('toJSON',{
    transform:(document,returnedDocument) =>{
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id

    }
  })

// we use model to use database not by Schema
module.exports = mongoose.model('Book', bookSchema);

 // Book --> is collection in Singular but, Mongdb makes plural











 