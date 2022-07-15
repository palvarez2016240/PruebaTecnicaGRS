'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = Schema({
    NameProduct: String,
    Price: String,
    Description: String
});

module.exports = mongoose.model('product', productSchema);