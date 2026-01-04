import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Safety Check: Does the header exist?
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return res.status(401).json({ Message: "Authorization header missing", Success: false });
    }

    // 2. Extract Token safely
    const token = authHeader.split(" ")[1];

    // 3. Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach User & Proceed
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ Message: "Invalid or Expired Token", Success: false });
  }
}

export default authMiddleware;