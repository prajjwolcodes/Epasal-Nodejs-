const Product = require("../../Model/productModel")
const fs = require("fs")

exports.createProduct = async (req, res) => {
    const allowedfileType = ["image/png", "image,jpg"]
    const userFileType = req.file.mimetype
    const filePath = req.file.path

    console.log(req.file);
    if (!allowedfileType.includes(userFileType)) {
        return res.status(400).json({
            message: "File Type not suppported"
        })
    }

    const { productName, productDescription, productQty, productPrice, productStatus } = req.body
    if (!productName || !productDescription || !productQty || !productPrice || !productStatus) {
        return res.status(400).json({
            message: "Please Provide all the details"
        })
    }
    console.log(req.user);

    await Product.create({
        productName,
        productDescription,
        productQty,
        productPrice,
        productStatus,
        productImage: "http://localhost:3000/" + filePath
    })

    res.status(200).json({
        message: "Product Succesfully Created"
    })
}

exports.getProduct = async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        product: products
    })
}

exports.getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.find({ _id: id })
        if (products.length == 0) {
            return res.status(400).json({
                message: "No such Products"
            })
        }

        res.status(200).json({
            product: products
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    const productExist = await Product.findById(id)

    const oldProductImage = productExist.productImage
    const lengthToCut = process.env.BACKEND_URL.length  //22
    const imageNameAfterCut = oldProductImage.slice(lengthToCut)
    console.log(imageNameAfterCut);

    fs.unlink(imageNameAfterCut, (err) => {
        if (err)
            console.log(err.message);
        else
            console.log(imageNameAfterCut + " Deleted");
    })
    await Product.findByIdAndDelete(id)


    res.status(200).json({
        message: "Product Succesfully Deleted"
    })
}

exports.editProduct = async (req, res) => {
    const { productName, productDescription, productQty, productPrice, productStatus } = req.body
    const id = req.params.id

    const productExist = await Product.findById(id)

    const oldProductImage = productExist.productImage
    const lengthToCut = process.env.BACKEND_URL.length  //22
    const imageNameAfterCut = oldProductImage.slice(lengthToCut)
    console.log(imageNameAfterCut);

    if (req.file && req.file.filename) {
        fs.unlink(imageNameAfterCut, (err) => {
            if (err)
                console.log(err.message);
            else
                console.log(imageNameAfterCut + " Deleted");
        })
    }

    await Product.findByIdAndUpdate(id, {
        productName,
        productDescription,
        productQty,
        productPrice,
        productStatus,
        productImage: (req.file && req.file.filename) ? process.env.BACKEND_URL + req.file.path : oldProductImage
    })

    res.status(200).json({
        message: "Product Succesfully Updated"
    })


}