const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const fetchUser=require("../middleware/fetchuser")
var jwt = require("jsonwebtoken");
const JWT_secret = "AMber is a noob coder ";
//*****ROUTE1**********Create a user using POST "/api/auth/createuser".No login needed
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }), //VALIDATIONS
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 8 }),
   
  ],
  async (req, res) => {
    // if there are errors then  return bad request and those errors
    const galtiya = validationResult(req);
    if (!galtiya.isEmpty())
      return res.status(400).json({ galtiya: galtiya.array() });
    //Check whether user with the same id already exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            error: "Sorry user with the same email id already exists ! ",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }); //.then((user) => res.json(user));
      const data = {
        // db mai unique default id
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_secret);
      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//*****ROUTE2**********Create a user using POST "/api/auth/login".No login needed

router.post(
  "/login",

  [
    //VALIDATIONS
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are errors then  return bad request and those errors
    const galtiya = validationResult(req);
    if (!galtiya.isEmpty())
      return res.status(400).json({ galtiya: galtiya.array() });

    //Destructuring to get email and password from req
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        
        return res
          .status(400)
          .json({ error: "PLeae enter correct credentials ! " });
      }
      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        console.log("bad")
        return res
          .status(400)
          .json({ error: "Please enter correct credentials ! " });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_secret);
      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//*****ROUTE3********** Get logged in user details.Login Required.

router.post("/getuser",fetchUser,async(req,res)=>{


  try {
   userID=req.user.id;
    const user=await User.findById(userID).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error");
  }
  
})


module.exports = router;
