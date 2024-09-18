const ProductSchema = require('../Schemas/Products')



exports.AddProducts = (req,res)=>{

    const {name, price, discount, description, image, category, brand} = req.body


    ProductSchema.insertMany({name : name, price : price, discount : discount, description : description, image : image, category : category, brand : brand}).then((result)=>{

        if(result.length > 0){

            res.status(200).send({status : 200,message :"Product Added Successfuly:"})
        }
        else{

            res.status(400).send({status : 400,message :"Failed to Product Add|| Please Try Again:"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500,message :"Something went wrong|| Please Try Again:"})
    })
} 