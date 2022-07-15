'use strict'

var product = require("../Models/product.model");
var invoice = require("../Models/invoice.model");

function createInvoice(req, res){
    var dt = new Date();
    var invoiceModel = new invoice();
    var params = req.body;   

    if(params.NIT && params.nameClient){

        invoiceModel.NIT = params.NIT;
        invoiceModel.nameClient = params.nameClient;
        invoiceModel.Today = dt;

        invoiceModel.save((err, invoiceSaved) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!invoiceSaved) return res.status(500).send({ mensaje: "No se pudo crear la factura" });
            return res.status(200).send({ mensaje: "Factura Creada" });
        })

    }else{
        return res.status(500).send({ mensaje: "Algunos campos estan vacios" });
    }
}

function addProduct(req, res) {
    var params = req.body; 

    if(params.idInvoice && params.idProduct){

        var idInvoice = params.idInvoice;
        var idProduct = params.idProduct;

        invoice.findOne({_id: idInvoice}).exec((err, invoiceFound)=>{
            console.log(idInvoice)
            if (err) return res.status(500).send({ mensaje: "Error en la peticion1" });
            if (!invoiceFound) return res.status(404).send({ mensaje: "La factura no existe" });
            var totalI = invoiceFound.Total;

            product.findOne({_id: idProduct}).exec((err, productFound)=>{
                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                if (!productFound) return res.status(404).send({ mensaje: "El producto no existe" });

                var name = productFound.NameProduct;
                var priceP = productFound.Price;
                var idP = productFound._id;

                totalI = totalI + priceP;

                invoice.findByIdAndUpdate(idInvoice, { $push: { Products:{

                    IdProduct: idP,
                    NameProduct: name,
                    price: priceP,
                    Total: totalI

                }}}, {new: true}, (err, invoiceUpdated)=>{

                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                    if (!invoiceUpdated) return res.status(500).send({mensaje: "No se pudo agregar el producto"});

                    return res.status(200).send({mensaje: "Producto Agregado"})
                })
            })
        })

    }else{
        return res.status(500).send({ mensaje: "Algunos campos estan vacios" });
    }
}

function readInvoice(req, res) {
    var idInvoice = req.params.idInvoice;

    invoice.findOne({_id: idInvoice}).exec((err, invoiceFound)=>{
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!invoiceFound) return res.status(404).send({ mensaje: "La factura no existe" });
        return res.status(200).send({ invoiceFound })
    })


}

module.exports = {
    createInvoice,
    addProduct,
    readInvoice
}