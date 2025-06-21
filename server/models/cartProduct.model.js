import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartProduct = mongoose.model("CartProduct", cartProductSchema);

export default CartProduct;
