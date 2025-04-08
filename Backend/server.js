import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors"
import jwt from "jsonwebtoken"


import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import Issue from "./models/issue.model.js";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json()); 



const jwt_key = process.env.JWT_KEY


const PORT = process.env.PORT || 3000;
const jwt_secret = process.env.JWT_SECRET;



app.get("/", async (req, res) => {
    return res.send("hello this is express server");
});



app.get("/get-dummy-data", async (req, res) => {
    return res.status(201).json({success: true, data: "this is dummy data"});
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    try {
        // **Check if user exists in database**
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // **Compare provided password with stored hashed password**
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


        const token = jwt.sign({ name: user.name, email: user.email }, jwt_secret, { expiresIn: '1h' });

        return res.status(200).json({ success: true, message: "Login successful", data: user , token});

    } catch (error) {
        console.error("Error in login: ", error.message);
        return res.status(500).json({ success: false, message: "Error in login" });
    }
});



app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields", data: null});
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" , data: null});
        }

        // **Hash password before saving**
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ success: true, message: "Registeration successful", data: newUser});
    } catch (error) {
        console.error("Error in registering user: ", error.message);
        return res.status(500).json({ success: false, message: "Error in registering user", data: null });
    }
});


app.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(' ')[1];
    try {
      const { email } = jwt.verify(token, jwt_secret);
      const user = await User.findOne({ email });

      res.status(200).json(user);
    } catch (err) {
      res.sendStatus(403);
    }
  });



app.post('/report-issues', async (req, res) => {


    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(' ')[1];
    try {
        const { email } = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ email });
        const { title, description, category, address, location } = req.body;

        const issue = new Issue({
          title,
          description,
          category,
          address,
          location,
          userId: user.id
        });
      
        await issue.save()
        const data = { user, issue }
        return res.status(201).json({ success: true, message: "Registeration successful", data: data});

    
    } catch (error) {
        console.log("Error in adding issue report to DB\n", error.message);
        return res.status(500).json({ success: false, message: "Error in reporting issue", data: null }); 
    }


});




app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});