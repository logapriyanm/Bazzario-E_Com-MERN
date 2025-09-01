const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')


// Get Product

exports.getProducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success : true,
        count:products.length,
       products
    })
}

// Create Product

exports.newProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

// Get Single Product

exports.getSingleProduct = async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
       return  next(new ErrorHandler('Product not found',400));


          }
        res.status(201).json({
            success:true,
            product
        })
  
}


// Update Product

exports.updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        });
    }

    product = await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
}


// Delete Product

exports.deleteProduct = async(req,res,next)=>{
     let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        });
    }

await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
}