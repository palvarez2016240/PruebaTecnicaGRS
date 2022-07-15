'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var invoiceSchema = Schema({
    Today: Date,
    NIT: Number,
    NameClient: String,
    Products: [{
        IdProduct: {type: Schema.Types.ObjectId, ref: 'product'},
        NameProduct: String,
        price: Number
    }],
    Total: Number
});

module.exports = mongoose.model('invoice', invoiceSchema);