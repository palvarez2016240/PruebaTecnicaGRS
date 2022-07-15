'use strict'

var product = require("../Models/product.model");

function createProduct(req, res){
    var productModel = new product();
    var params = req.body;

    if(params.NameProduct && params.Price && params.Description){

        productModel.NameProduct  = params.NameProduct;
        productModel.Price = params.Price;
        productModel.Description = params.Description;
        
        product.findOne({NameProduct: params.NameProduct}).exec((err, productFound) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if (productFound) return res.status(404).send({ mensaje: "Este producto ya existe" });

            productModel.save((err, productSaved) => {
                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                if (!productSaved) return res.status(500).send({ mensaje: "No se pudo guardar el producto" });
                return res.status(200).send({ mensaje: "Producto Creado" });
            })
        })

    }else{
        return res.status(500).send({ mensaje: "Algunos campos estan vacios" });
    }
}

function allProducts(req, res) {
    product.find({}).exec((err, productFound)=>{
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (productFound.length == 0) return res.status(500).send({ mensaje: "No hay productos" });

        return res.status(200).send({productFound});
    }) 
}

module.exports = {
    createProduct,
    allProducts
}