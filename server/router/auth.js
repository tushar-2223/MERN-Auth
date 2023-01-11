const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User = require('../model/userSchema');

const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get('/', (req, res) => {
  res.send('MERN Auth Project Backend Port No : 5000');
});

// main Auth logic using promises
// register is one tipe of auth api to creat middleware of application

// router.post('/register',(req,res) => {
//     // get all data
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "fill the proper details" });
//     }

//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email alredy Exist" });
//         }

//         // here key and value both are same so we writen only one value
//         const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword })

//         user.save().then(() => {
//             res.status(201).json({ message: "user register successfuly" });
//         }).catch((err) => res.status(500).json({ error: "failed to register" }));

//     }).catch(err => { console.log(err); });

//     // res.json({ message: req.body });
// })


// === Using Async-Await register auth/validation==

router.post('/register', async (req, res) => {
  // get all data
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: 'fill the proper details' });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: 'Email alredy Exist' });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    
    //bcript password middleware here before save ./model/userschema//

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: 'user register successfuly' });
    } else {
      res.status(500).json({ error: 'failed to register' });
    }
  } catch (err) {
    console.log(err);
  }

  // res.json({ message: req.body });
});

// login auth/validation
router.post("/signin", async (req, res) => {
  // fetch data
  console.log(req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "filled the proper data" })
    }

    const userLogin = await User.findOne({ email: email })

    // console.log(userLogin); //get all data

    if (userLogin) {
      // bcrypt pass check
      //has and compare in bcrypt
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // Generate a uniqe JWT Token for signin
      const token = await userLogin.generateAuthToken();
      // console.log(token); //debug token

      //== stored our jwt token in cookie
      res.cookie("jwtoken", token, {
        // optional
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      })

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.json({ message: "user signin successfully" })
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }

  } catch (err) {
    console.log(err);
  }

});

// about us page
router.get('/about',authenticate, (req, res) => {
  // console.log("hello my about")
  res.send(req.rootUser);
});


// get user data for contact us page API
router.get('/getdata',authenticate, (req, res) => {
  // console.log("hello my getdata")
  res.send(req.rootUser);
})

//contact page
router.post('/contact',authenticate, async (req, res) => {

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("filled the proper contact form");
      return res.status(422).json({ error: 'fill the proper details' });
  }
  
  try {
      
    const userContact = await User.findOne({ _id: req.userID });//userID fetch in authentication middleware //user is there or not

    if (userContact) {
      
      const userMessage = await userContact.addMessage(name, email, phone, message);

      await userContact.save();

      res.status(201).json({ message: "user contact succesffully" });
    }

  } catch (error) {
    console.log(error);
  }
})

// logout page

// get user data for contact us page API
router.get('/logout', (req, res) => {
  // console.log("hello this is logout");
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send('User Logout')
})


module.exports = router;