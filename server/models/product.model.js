import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image : {
        type: Array,
        default : []
    },
    category :[ 
        {
        type : mongoose.Schema.ObjectId,
        ref : "category"
        }
    ],
    subCategory : [
        {
            type: mongoose.Schema.ObjectId,
            ref : "subCategory"
        }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        default : null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    public : {
        type : Object,
        default : true
    }
},{
    timestamps : true
})

// ✅ Correct Text Index with weight
productSchema.index(
  { name: "text", description: "text" },
  { weights: { name: 10, description: 5 } }
)

const ProductModel = mongoose.model('product',productSchema)

export default ProductModel;
