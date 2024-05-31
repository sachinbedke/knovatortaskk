const asyncHandler = require("express-async-handler");
const uploadCart = require("./utils/upload");
const Cart = require("./modal/Cart");

// Add cart item
exports.addCart = asyncHandler(async (req, res) => {
    uploadCart(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "Unable to upload file" });
        }

        const { name, price, desc } = req.body;
        console.log(req.files);
        const image = req.files.image ? req.files.image[0].filename : null

        if (!name || !price || !desc) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await Cart.create({ name, price, desc, image });
        res.status(201).json({ message: "Cart item created successfully" });
    });
});

// Get all cart items
exports.getCarts = asyncHandler(async (req, res) => {
    const result = await Cart.find();
    res.status(200).json({ message: "Fetch success", result });
});
