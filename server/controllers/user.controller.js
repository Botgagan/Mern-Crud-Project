import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const handleSignUpUserController = async (req, res) => {//register logic

    const { firstName, lastName, email, password } = req.body;// user gave this info from frontend
    try {

        const saltCount = 10;
        const hashedPassword = await bcrypt.hash(password, saltCount);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            Message: "User registered successfully!",
            Success: true,
            Data: newUser,
            _id: newUser._id
        });

    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false });//500 means server error
    }
}

const handleSignInUserController = async (req, res) => {// login logic
 const { email, password } = req.body;// user gave this info from frontend

 try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(404).json({ Message: "User not found", Success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ Message: "Invalid password", Success: false });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({
        Message: "Login successful!",
        Success: true,
        Token: token,
        Data: user
    });

 } catch (error) {
     return res.status(500).json({ Message: error.message, Success: false });
 }
}

const handleGoogleLoginController = async (req, res) => {
    try {
        const { token } = req.body; // Frontend sends this token

        // 1. Verify the Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, 
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;

        // 2. Check if user already exists in our DB
        let user = await User.findOne({ email });

        if (user) {
            // User exists -> Log them in (Generate Our JWT)
            const myToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                Message: "Google Login Successful",
                Success: true,
                Token: myToken,
                Data: user
            });

        } else {
            // User does NOT exist -> Register them automatically
            // Note: We generate a random password because Google users don't have one
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            
            // NOTE: If you are hashing passwords in your model using "pre-save", this will still work fine.
            // If you are manually hashing in controllers, you might want to hash this `randomPassword` here.
            
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email: email,
                password: randomPassword, // Or hash it if needed
                // profileImage: picture // Optional: if your schema has this
            });

            const myToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(201).json({
                Message: "Google Signup Successful",
                Success: true,
                Token: myToken,
                Data: user
            });
        }

    } catch (error) {
        console.log("Google Auth Error:", error);
        return res.status(500).json({ Message: "Google Login Failed", Success: false });
    }
};

export { handleSignUpUserController,handleSignInUserController,handleGoogleLoginController };