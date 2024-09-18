const UserSchema = require('../Schemas/Users')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const OtpSchema = require('../Schemas/Otp')
const ProductSchema = require('../Schemas/Products')
const CartSchema = require('../Schemas/Cart')
const OrdersSchema = require('../Schemas/Order')
const moment = require('moment')




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      
      user: "rj22raider@gmail.com",
      pass: "dosk umtk refm oeom",
    }
  });
//all changes here

  const bootStrapStr_start =  `<html>
  <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  
  </head>
  <body>`
  
  
    const bootStrapStr_end =  `</body></html>`
  
  



exports.AddToCart = (req,res)=>{
 const {p_id, u_id} = req.body;

 CartSchema.insertMany({p_id : p_id, u_id : u_id , quantity : 1 , time : Number(new Date(Date.now()))}).then((r1)=>{
  if(r1.length > 0){
    res.status(200).send({status : 200,message :"Product Successfully Added into the card "})

  }
  else{

    res.status(500).send({status : 500,message :"Something went wrong || Try again"})

  }
 }).catch((err)=>{

  res.status(500).send({status : 500,message :"Something went wrong || Try again"})

 })

}




exports.GetMyCart = (req , res) =>{
  const {u_id} = req.query;

  CartSchema.find({u_id : u_id}).then((result) =>{
    res.status(200).send({status : 200, data : result, count : result.length })
  }).catch((err)=>{
     console.log(err)
    res.status(500).send({status : 500,message :"Something went wrong || Try again"})
  
   })
}







exports.getDetailedCartdata  = async (req,res)=>{

  const {u_id} = req.query;




  CartSchema.find({u_id  : u_id}).then(async(result)=>{



          for(let i  = 0 ; i < result.length ; i++)
          {
              let pd = await ProductSchema.findOne({_id :  result[i].p_id})
              result[i]._doc['p_data'] = pd

          }

   
      



      res.status(200).send({status : 200 ,  data :result, count : result.length })



      
  }).catch((err)=>{
      console.log(err)
      res.status(500).send({status : 500 ,  message  :   "Something Went Wrong || Try Again"})

  })
}









exports.getAllOrders  = (req,res)=>{
    const {u_id } = req.query
    OrdersSchema.find({u_id  : u_id}).then((result)=>{
        res.status(200).send({status  : 200 , data  : result})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500 , message : "Something Went Wrong While Process Your Order"  })

    })

}









exports.handleQunatity = (req,res)=>{
  const { cd_id , quan} = req.body

  if(quan  !== 0)
  {
      
      CartSchema.updateOne({_id : cd_id } , {$set: {quantity : quan}}).then((r1)=>{
          if(r1.modifiedCount == 1)
          {
              res.status(200).send({status : 200 ,  data : "Qunatity Updated" })

          }
          else
          {
              res.status(400).send({status : 400 ,  data : "Try Again" })

          }
      }).catch((err)=>{
          console.log(err)
          res.status(500).send({status : 500 ,  message  :   "Something Went Wrong || Try Again"})
  
      })
  }
  else
  {
      CartSchema.deleteOne({_id : cd_id } ).then((r1)=>{
          if(r1.deletedCount == 1)
          {
              res.status(200).send({status : 200 ,  data : "Item Removed" })

          }
          else
          {
              res.status(400).send({status : 400 ,  data : "Try Again" })

          }
      }).catch((err)=>{
          console.log(err)
          res.status(500).send({status : 500 ,  message  :   "Something Went Wrong || Try Again"})
  
      })
  }

}






exports.getForm = (req ,res)=>{

    res.send(

        `<form method='POST' action='/test'>
        <input placeholder="Enter your name" name='name' />
        <input placeholder="Enter your Email" name='email' />
        <input placeholder="Enter your mobile" name='mobile' />
        <input placeholder="Enter your password" type='password' name='password' />
        <button type='submit'> check </button>
        </form>
    `
        )
}


exports.showResult = (req,res) =>{
    UserSchema.insertMany({name: req.body.name , email :req.body.email , mobile : req.body.mobile , password : req.body.password}).then((result)=>{
        res.send("User Register Successfully Jaswant")
        //console.log(showResult)
    }).catch((err)=>{
        res.send("Something went Wrong Jaswant")
        //console.log(showResult)
    })
}



//otp verify code
exports.verifyOtpAndChangePassword = (req, res)=>{

    const{email, otp, new_pass}= req.body
  
    UserSchema.find({email : email}).then((r1)=>{
    if(r1.length > 0){
  
         OtpSchema.find({email : email}).then((r2)=>{
  
          if(r2.length > 0){
  
               
            if(r2[0].otp ==otp){
                
              let t = Number(new Date())
              let tmp =( t -Number(r2[0].time))/ 1000
  
              if(tmp > 30){
                res.status(403).send({status : 403,message :"Your Otp Has Exprired || Please resend your OTP:"})
  
              }
              else{
                
                bcrypt.genSalt(10, function(err, salt){
  
                  if(err){
                    res.status(500).send({status : 500,message :"Something went wrong :"})
  
                  }
                  else{
  
                    bcrypt.hash(new_pass, salt, function(err, hash){
  
                      if(err){
  
                        res.status(500).send({status : 500,message :"Something went wrong :"})
                      }
                      else{
  
                       UserSchema.updateOne({email : email}, {$set : {password : hash}}).then((r3)=>{
  
                            if(r3.modifiedCount == 1){
  
                              OtpSchema.deleteOne({email :email}).then((r4)=>{
                                 if(r4.deletedCount == 1){
                                   
  
  
  
                                  transporter.sendMail({
                                    from: '"Node-web 🥰👻" <rj22raider@gmail.com>', // sender address
                                    to: email, // list of receivers
                                    subject: " Password Changes", // Subject line
                                    text: "Hello " + r1[0].name, // plain text body
                                    html: `<h3>  Your Password Has Reset Just Now🥰🥰🥰🥰🥰  </h3>`, // html body
                                  }).then((m_res)=>{
                                    if(m_res.messageId)
                                    {
                                      res.status(200).send({status : 200,message :"Your Password Has Successfuly Reset :"})
                    
                                    }
                                    else{
                    
                                        res.status(400).send({status : 400, message : "Something went wrong 0"})
                    
                                    }
                    
                                  }).catch((err)=>{
                                    
                                    res.status(400).send({status : 400, message : "Something went wrong 00"})
                    
                                  })
  
                                  
                                 }
                                 else{
   
                                  res.status(500).send({status : 500,message :"Something went wrong :"})
                                 }
                                }).catch((err)=>{
  
                                  res.status(500).send({status : 500,message :"Something went wrong :"})
            
                                })
                            }
                            else{
  
                              res.status(400).send({status : 400,message :"Something went wrong :"})
                            }
  
                      
  
  
  
                      }).catch((err)=>{
  
                        res.status(500).send({status : 500,message :"Something went wrong :"})
  
                      })
                    }
                  })
                  }
                })
  
  
  
  
              }
  
            }
            else{
  
              res.status(400).send({status : 400,message :"Incorrect otp :"})
            }
  
  
  
  
  
  
          }
          else{
            res.status(400).send({status : 400,message :"Something went wrong :"})
   
          }
         }).catch((err)=>{
  
      res.status(500).send({status : 500,message :"Something went wrong :"})
    })
    }
    else{
      res.status(400).send({status : 400,message :"Yor are not register user :"})
    }
  
  
    }).catch((err)=>{
  
      res.status(500).send({status : 500,message :"Something went wrong :"})
    })
  }
  




// otp code is here
exports.sendOtp = (req,res)=>{
  
    const {email} = req.body;

   var otp = Math.floor(Math.random() * 87637).toString().padStart(6, 0)
   
   OtpSchema.deleteOne({email : email}).then((d1)=>{

    UserSchema.find({email : email}).then((r1)=>{

      if(r1.length > 0){
 
        OtpSchema.insertMany({time: Number(new Date()), email : r1[0].email, otp : otp}).then((r2)=>{
 
         if(r2.length > 0){
 
             //otp code
             transporter.sendMail({
                 from: '"Node-web 🥰👻" <rj22raider@gmail.com>', // sender address
                 to: email, // list of receivers
                 subject: " Password reset🥰🥰(Node web)", // Subject line
                 text: "Hello " + r1[0].name, // plain text body
                 html: `<h3> Your 6 DIgits OTP to Reset Your Password is : ${otp}  </h3>`, // html body
               }).then((m_res)=>{
                 if(m_res.messageId)
                 {
                     res.status(200).send({status : 200, message :"OTP Send successfully"})
 
                 }
                 else{
 
                     res.status(400).send({status : 400, message : "Something went wrong 0"})
 
                 }
 
               }).catch((err)=>{
                 
                 res.status(400).send({status : 400, message : "Something went wrong 00"})
 
               })
           
         }
         else{
 
             res.status(400).send({status : 400, message :" Something went wrong try again"})
         }
 
        }).catch((err)=>{
         res.status(500).send({status : 500,message :"Something went wrong 1:"})
 
        })
 
 
 
     }
      else{
 
         res.status(400).send({status : 400, message :" You are not register user"})
      }
 
 
 
    }).catch((err)=>{
 
     res.status(500).send({status : 500,message :"Something went wrong 2:"})
 
    })
 


   }).catch((err)=>{

    res.status(500).send({status : 500,message :"Something went wrong 1:"})
    
   })



}







//login part
exports.login= (req, res)=>{
    const {email, password}= req.body
    
    UserSchema.find({email : email}).then((r1)=>{
      if(r1.length > 0){
       
        bcrypt.compare(password, r1[0].password, function(err, status){
            if(err){
                res.status(500).send({status : 500,message :"Something went wrong:"})
    
            }
            else{
                  if(status == true){
                    res.status(200).send({status : 200,data :{ name :r1[0].name, email : r1[0].email, mobile : r1[0].mobile, u_id : r1[0]._id}, message :"Login successfuly"})
                  }
    
                  else{
                    res.status(400).send({status : 400,message :"Incorrect password"})
                  }
    
            }
        })
    
      } 
      else{
        res.status(400).send({status : 400,message :"You are not registered User"})
    
      }
        
    }).catch((err)=>{
        res.status(500).send({status : 500,message :"Something went wrong:"})
    
    
    })
    
    }

    ///for Registration Process
    
    
exports.addUser = (req,res)=>{
    
        const{ name,email, mobile, password }= req.body
    
        bcrypt.genSalt(10, function(err, salt){
    
    
     if(err){
        res.status(500).send({status : 500,message :"Something went wrong:"})
    
     }
     else{
        bcrypt.hash(password, salt, function(err, hash){
    
            if(err){
                res.status(500).send({status : 500,message :"Something went wrong:"})
            
             }
             else{
    
                UserSchema.insertMany({name: name , email :email , mobile : mobile , password : hash}).then((result)=>{
                    console.log(result)
                    if(result.length>0){
    
                        transporter.sendMail({
                            from: '"Node-web🥰 👻" <rj22raider@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: "Node web registration🥰🥰", // Subject line
                            text: "Hello " + name, // plain text body
                            html: "<h3> Your registratin is successfuly done </h3>", // html body
                          }).then((m_res)=>{
                            if(m_res.messageId)
                            {
                                res.status(200).send({status : 200,message :"user register successfully"})
    
                            }
                            else{
    
                                res.status(400).send({status : 400, message : "User registration failed|| Please try again:"})
    
                            }
    
                          }).catch((err)=>{
                            
                            res.status(400).send({status : 400, message : "User registration failed|| Please try again:"})
    
                          })
              
                        // res.status(200).send({status : 200,message :"user register successfully"})
                    }
                    else
                    {
                      res.status(400).send({status : 400, message : "User registration failed|| Please try again:"})
                    }
                  }).catch((err)=>{
                      console.log(err.name)
                      console.log(err.code)
                      console.log(err.message)
                      
                      if(err.code == 11000){
              
                          res.status(400).send({status:400, message: `User already exits with this ${err.message.split('{')[1].split(":")[0]}: ${err.message.split('{')[1].split(":")[1].replace(`"`," ").replace('}',' ')}`})
                      }
                      else if(err.name == 'ValidationError'){
              
                          res.status(400).send({status : 400, message : `${err.message.split(":")[1].trim().toUpperCase()} is Required for Registration`})
                      }
                      else{
              
                          res.status(500).send({status: 500 ,message: "something went wrong"})
                      }
                  })
    
    
             }
    
        })
    
     }
        })
    
       
    
    }




    ////Product Add 


exports.getAllProducts = (req, res)=>{
    ProductSchema.find({}).then((result)=>{
     if(result.length >0){
 
       res.status(200).send({status : 200, data : result })
     }
     else{
 
       res.status(200).send({status : 200, data : [] })
     }
    }).catch((err)=>{
     
     res.status(500).send({status : 500, message : "Something Went Wrong" })
 
    })
 
 }









 exports.PurchaseOrder = (req,res)=>{

  const {o_data , u_id ,u_name , total , email} = req.body;
  let ord_num  =  Number(Math.floor(Math.random() *  4567457 ).toString().padStart(6, '0'))

  OrdersSchema.insertMany({u_id  : u_id , o_data : o_data, ord_id : ord_num , time : new Date(Date.now())  , total : total}).then(async(result)=>{

      if(result.length > 0)
      {

          for(let i = 0 ; i < o_data.length ; i++)
          {
              try{
                  let st = await CartSchema.deleteOne({_id  : o_data[i]._id})
                  
              }catch(err)
              {
                  res.status(400).send({status : 400 , message : "Something Went Wrong While Process Your Order"  })
                  break

              }


          }

          var tem_str  =  ""

          for(let i  = 0  ; i < result.length ;  i++)
          {
                  tem_str += `<tr>
                  <th scope="row">${i+1}</th>
                  <td>${result[i].ord_id}</td>
                  <td>${result[i]._id}</td>
                  <td>${result[i].status == 0  ? "Pending"  :"Delivered"}</td>
                  <td>${result[i].total}</td>
                  <td>${moment(new Date(result[i].time)).format('MMMM Do YYYY, h:mm:ss a')}</td>
                 </td>
                 </tr>`
          }

       


          var demoStr = `
          ${bootStrapStr_start}
          <div className="container">
          <table class="table">
        <thead>
          <tr>
            <th scope="col">SR#</th>
            <th scope="col">Order Number</th>
            <th scope="col">Order ID</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Time</th>
          </tr>
          ${tem_str}
        </thead>
        <tbody>
         
      
        </tbody>
      </table>
      
      </div>
      ${bootStrapStr_end}
      `








          transporter.sendMail({
              from: '"Node-Web 👻" <webt5987@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Node Web Order Process", // Subject line
              text: "Hello " + u_name, // plain text body
              html: `<h3>Your Order has Successfully Proceesed With Order Number : ${ord_num} </h3>
                  <h1>Order Details</h1>
                  ${demoStr}
              `, // html body
            }).then((m_res)=>{
              if(m_res.messageId)
              {
                  res.status(200).send({status : 200 ,  message  :   "Order Generated  Successsfully"})
              }
              else
              {
                  res.status(400).send({status : 400 ,  message  :   "Order Not Generated   || Please Try Again || ):"})

              }

            }).catch((err)=>{
              res.status(400).send({status : 400 ,  message  :   "Order Not Generated || Please Try Again || ):"})

            })



      }else{
      res.status(400).send({status : 400 , message : "Something Went Wrong While Process Your Order"  })

      }
  }).catch((err)=>{
      console.log(err)
      res.status(500).send({status : 500 , message : "Something Went Wrong While Process Your Order"  })

  })




}


