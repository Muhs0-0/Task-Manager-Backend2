import UserSchema from "../models/User.js"
import express from "express"

const UserRoutes = express.Router()

UserRoutes.post("/register", async(req,res) =>{
    try{

        const {name, email, Password} = req.body
        const newUser = new UserSchema({name, email, Password})
        const savedUser = await newUser.save()
        res.status(201).json({Message: "user created successfully", user: savedUser})
    }catch(err){
        res.status(400).json({message: "Error creating user"})
    }
})

UserRoutes.get("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }
    res.status(200).json(user); // or { name: user.name } if you want to limit data
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, Password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email doesn't exist" });
    }

    if (Password !== user.Password) {
      return res.status(401).json({ message: "wrong password" });
    }

    res.status(200).json({ message: "logged in", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default UserRoutes