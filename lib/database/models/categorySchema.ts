import { Schema, models,model} from "mongoose";

export interface Icategory extends Document{
    _id:String,
    name:String
}

const CategorySchema=new Schema({
    name:{
        type:String,
        unique:true,
        requrired:true
    }
})

const Category=models.Category || model('Category', CategorySchema)

export default Category