const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetchUser=require("../middleware/fetchuser")
//*****ROUTE1**********Get a user's notes.using GET "/api/notes/getnotes". login needed
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
  try {
    const notes=await Notes.find({user: req.user.id})
    res.json(notes);
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error");
  }
  
})
//*****ROUTE2**********Create notes.using Post "/api/notes/createnotes". login needed
router.post('/createnotes',[
     body("title", "Enter a valid Title").isLength({ min: 3 }), //VALIDATIONS
     body("description", "Enter a valid description").isLength({ min: 5 }),
   ],fetchUser,async (req,res)=>{
  try {
    const { title, description,tag } = req.body;
    const galtiya = validationResult(req);
    if (!galtiya.isEmpty())
      return res.status(400).json({ galtiya: galtiya.array() });

   const notee=new Notes({
      title,description,tag,user:req.user.id
   })
   const savedNote=await notee.save()
   res.json(savedNote)
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error");
  }
  
})
module.exports=router