var express = require('express');
var router = express.Router();
const validator = require("fastest-validator");
const { Product } = require('../models');

const Date = new validator();

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    return res.json(products);
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    return res.json(product);
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    let product = await Product.findByPk(id);

    if (!product) {
        return res.json({message : 'data not found'})
    }

    await product.destroy();

    res.json({
        message : 'product delete'
    });
});

router.post('/', async (req, res)=> {
    const schema = {
        name: 'string',
        brand:  'string',
        descriptions: 'string|optional'
    }

    const validate = Date.validate(req.body, schema);

    if(validate.length) {
        res
        .status(400)
        .json(validate)
    }
    const pro = await Product.create(req.body);
    res.json(pro);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let pro = await Product.findByPk(id);
    if(!pro){
        return res.json ({message : 'product not found'});
    }

    const schema = {
        name: 'string|optional',
        brand:  'string|optional',
        descriptions: 'string|optional'
    }

    const validate = Date.validate(req.body, schema);

    if(validate.length) {
        res
        .status(400)
        .json(validate)
    }
    

    // update data 
    pro = await pro.update(req.body)

    res.json(pro);


});

module.exports = router