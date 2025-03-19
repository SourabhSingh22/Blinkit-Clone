import { request, response } from "express";
import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async(request, response) => {
    try {

        const {name, image, category} = request.body
        if(!name && !image && !category){
            return response.status(400).json({
                message : "Provide name, image, category",
                error : true,
                success : false
            })
        }

        const payload = {
            name, 
            image,
            category
        }

        const createSubCategory = new SubCategoryModel(payload)

        const save = await createSubCategory.save();

        return response.json({
            message : "Sub Category Created",
            data : save,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getSubCategoryController = async(request, response) => {
    try {
        const data = await SubCategoryModel.find().sort({createAt : -1})

        return response.json({
            message : "Sub Category data",
            data : data,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}