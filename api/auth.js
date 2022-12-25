const express = require ('express'); 
const bcrypt = require('bcryptjs') ;
const router = express.Router(); 
const Users = require('../models/users')

router.post('/login', (req, res) => {
  console.log(req.body);
  Users.findOne({email:req.body.email}, (err, docs) => {
    if (!err) {
        if (docs) {
          bcrypt.compare(req.body.password, docs.password, function(err, result) {
            if (err) {
              console.log(err);
              res.render('login', {msg : "Terdapat kesalahan, silahkan login kembali!", auth : false})
            }
            else {
                if (result) {
                  res.render('home')
                }else{
                  res.render('login', {msg : "Password salah!", auth : false})
                }
            }
          });
        } else {
          res.render('login', {msg : "Akun salah!", auth : false})
        }
    } else {
        console.error(err);
    }
  })
})

router.post('/register', (req, res) => {
    Users.findOne({email:req.body.email}, async(err, docs) => {
        if (!err) {
            if (docs) {
              res.render('login', {msg : "Akun gagal dibuat karena sudah ter-registrasi!", auth : false})
            } else {
              let hashedPassword = await bcrypt.hash(req.body.password, 8);
              Users.create({
                email : req.body.email,
                password : hashedPassword,
                references : []
              }, (err, doc) =>{
                if (!err) {
                  console.log("Created new user.");
                  res.render('login', {msg : "Akun berhasil dibuat!", auth : true})
                } else {
                  console.log(err);
                }
              })
            }
        } else {
            console.error(err);
        }
      })
})


//create
router.post('/create',(req,res)=>{
  let data={
    title:req.body.title,
    summary:req.body.summary,
    date:req.body.date
  };
  try{
      const reference = Users.findOneAndUpdate(
        {email:req.body.email},
        {
          $push:{
            references:data,
          },
        },
        (err, doc) =>{
          if (!err) {
            console.log("Reference added for user with email "+req.body.email);
            res.render('home', {msg : "references updated!", auth : true})
          } else {
            console.log(err);
          }
        }
      );
  }catch(err){
    res.render('home', {msg : "gagal", auth : false})
  }
})

//delete
router.post('/delete',(req, res)=>{
  console.log("doing delete")
	try{
    const reference = Users.findOneAndUpdate(
      {email:req.body.email},
      {
        $pull:{
          references:{title:req.body.title},
        },
      },
      (err, doc) =>{
        if (!err) {
          console.log("deleting reference "+req.body.title);
          res.render('home', {msg : "references deleted!", auth : true})
        } else {
          console.log(err);
        }
      }
    );
}catch(err){
  console.log(err)
  res.render('home', {msg : "gagal", auth : false})
}

})

module.exports = router; 
