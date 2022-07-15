'use strict'

var express = require("express");
var productControlador = require("../Controllers/product.controller");
var invoiceControlador = require("../Controllers/invoice.controller");


//RUTAS
var api = express.Router();
api.post('/createProduct',productControlador.createProduct);
api.get('/allProducts', productControlador.allProducts);
api.post('/createInvoice', invoiceControlador.createInvoice);
api.put('/addProduct', invoiceControlador.addProduct);
api.get('/readInvoice/:idInvoice', invoiceControlador.readInvoice);

module.exports = api;
