import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    BookName:{ type:String, required:true },
    BookTitle:{ type:String, required:true },
    Author:{ type:String, required:true },
    SellingPrice:{ type:String, required:true },
    PublishDate:{ type:String },
},
   { timestamps : true } // it will create two fields automatically(mongodb magic) which will show the created date and time and modified date and time of the book.

);

// here Books is the name of the collection which will be as books in lowercase
// here it is getting stored in name Book so in controllers we will use like Book.find() or Book.deleteOne()
const Book = mongoose.model("Books",bookSchema);

export default Book;