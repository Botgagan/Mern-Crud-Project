import express from "express";
import {handleBookListController,handleBookStoreController,handleBookdeleteController,handleBookUpdateController} from "../controllers/book.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/addbook",authMiddleware,handleBookStoreController);// add the book
router.get("/booklists",authMiddleware,handleBookListController);// lists all the books in frontend
router.post("/deletebook",authMiddleware,handleBookdeleteController);// delete the book
router.put("/updatebook",authMiddleware,handleBookUpdateController)// update the book

export default router;// this name we changed from router to bookRouter in index.js