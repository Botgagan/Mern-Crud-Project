import Book from "../models/book.model.js"

const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        // 1. Validation Fix: Check against 'undefined' so price can be 0
        if (!body.BookName || !body.BookTitle || !body.Author || body.SellingPrice === undefined) {
            return res.status(400).json({ Message: "All fields are required", Success: false });
        }

        // 2. THE MAIN FIX: Changed .insertOne() to .create()
        // Mongoose uses .create(), not .insertOne()
        const bookAdd = await Book.create(body);

        console.log("Book Created:", bookAdd);

        return res.status(201).json({
            Message: "Book added successfully!",
            Success: true,
            Data: bookAdd,
            _id: bookAdd._id 
        });

    } catch (error) {
        // This will print the real error to your terminal if it fails again
        console.log("Error Adding Book:", error.message);
        return res.status(500).json({ Message: error.message, Success: false });
    }
}

const handleBookListController = async (req,res) => {
   try {
    const booklist = await Book.find({});
    return res.status(200).json({ Message: "All books fetched successfully", Success:true,TotalCount:booklist.length,BookList:booklist})
   } catch (error) {
    return res.status(500).json({ Message : error.message, Success: false });
   }
}

const handleBookdeleteController = async (req,res) => {
  try {
    const body = req.body;
     const deleted = await Book.deleteOne({_id:body._id})
     console.log("deleted",deleted);
     return res.status(200).json({ Message : " book deleted successfully", Success: true});

  } catch (error) {
    return res.status(500).json({ Message : error.message, Success: false });
  }
}

const handleBookUpdateController = async (req,res) => {
  try {
    const body = req.body;
    const updated = await Book.updateOne({_id:body._id},{$set:body});
    console.log("updated",updated);
    return res.status(200).json({Message:"Book Updated successfully",Success:true})
  } catch (error) {
    return res.status(500).json({ Message : error.message, Success: false });
  }
}

export  {handleBookStoreController,handleBookListController,handleBookdeleteController,handleBookUpdateController};
