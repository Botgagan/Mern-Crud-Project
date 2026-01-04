import React, {  useState,useEffect } from 'react'
import { bookBaseUrl } from '../../axiosInstance.js'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Navbar from './Navbar.jsx';

const Home = () => {

    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: "",
        
    })
    const [booklist, setBookList] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const getAllBookList = async () => {
        try {
            const { data } = await bookBaseUrl.get("/booklists");
            setBookList(data.BookList);
            console.log('booklists', data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBookList();// it will show data when page refreshes in console.log
    }, [])// its main purpose is that getAllBooklist will be called automatically when a page refershes and automatically gets data from database.

    const handleChange = (event) => {
        const { name, value } = event.target;//It extracts the name attribute (e.g., "Author") and the current value (e.g., "J.K. Rowling")
        setBookForm((prev) => ({//...prev (The Spread Operator):Crucial Step: This takes all the existing data in bookForm and copies it into the new state.Without this: If you updated "Author", React would replace the entire object with just the Author, deleting "BookName", "SellingPrice", etc
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        try {
            if (!isUpdating) {

                if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.Author || !bookForm.SellingPrice) {
                    alert("All field's are required ");
                }

                const { data } = await bookBaseUrl.post("/addbook", bookForm);

                if (data.Success) {
                    alert(data.Message);
                    getAllBookList();
                    setBookForm({
                        BookName: "",
                        BookTitle: "",
                        Author: "",
                        SellingPrice: "",
                        PublishDate: ""
                    });
                }
            }   else {
                    const { data } = await bookBaseUrl.put("/updatebook", bookForm);
                    
                    if (data.Success) {
                        alert(data.Message);
                        getAllBookList();
                        setBookForm({
                            BookName: "",
                            BookTitle: "",
                            Author: "",
                            SellingPrice: "",
                            PublishDate: "",
                        });
                        setIsUpdating(false);
                    }
                
            }
            console.log(data);
        }
         catch (error) {
        console.log(error);
    }
    }

    const handleUpdate = async (data) => {
    setBookForm({
        BookName: data.BookName,
        BookTitle: data.BookTitle,
        Author: data.Author,
        SellingPrice: data.SellingPrice,
        PublishDate: data.PublishDate,
        _id:data._id,
    });
    setIsUpdating(true);
    
    }

    const handledelete = async (id) => {
    try {
        const { data } = await bookBaseUrl.post("/deletebook", { _id: id });

        if (data.Success) {
            alert(data.Message)
        }
        getAllBookList();
    }
    catch (error) {
        console.log(error.Message);
    }
    }


return (
    <>
    <Navbar />
    <div className='w-full px-5 min-h-[calc(100vh-60px)]'>
        <div className='w-full grid grid-cols-5 gap-3 my-4'>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor=''>Book Name</label>
                <input type='text' placeholder='Book Name' name='BookName' value={bookForm.BookName} onChange={handleChange} className='w-full border-gray-500 rounded-sm outline-1 outline-gray-200 border-2 h-8 px-2' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor=''>Book Title</label>
                <input type='text' placeholder='Book Title' name='BookTitle' value={bookForm.BookTitle} onChange={handleChange} className='w-full border-gray-500 rounded-sm outline-1 outline-gray-200 border-2 h-8 px-2' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor=''>Author</label>
                <input type='text' placeholder='Author' name='Author' value={bookForm.Author} onChange={handleChange} className='w-full border-gray-500 rounded-sm outline-1 outline-gray-200 border-2 h-8 px-2' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor=''>Selling Price </label>
                <input type='text' placeholder='Selling Price' name='SellingPrice' value={bookForm.SellingPrice} onChange={handleChange} className='w-full border-gray-500 rounded-sm outline-1 outline-gray-200 border-2 h-8 px-2' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor=''>Publish Date</label>
                <input type='date' placeholder='Publish Date' name='PublishDate' value={bookForm.PublishDate} onChange={handleChange} className='w-full border-gray-500 rounded-sm outline-1 outline-gray-200 border-2 h-8 px-2' />
            </div>
        </div>
        <div className='w-full flex justify-end'>
            <button onClick={handleSubmit} className='bg-gray-500 text-white h-9 w-22 rounded-sm cursor-pointer'>SUBMIT</button>
        </div>

        <div className='w-full mt-10'>
            <div className='w-full'>
                <table className='w-full bg-white divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Name</th>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Title</th>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Author</th>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Selling Price</th>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Publish Date</th>
                            <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {booklist.map((book, index) => {
                            return (
                                <tr className='hover:bg-gray-200' key={index}>
                                    <td className='px-6 py-3 whitespace-nowrap'>{book.BookName}</td>
                                    <td className='px-6 py-3 whitespace-nowrap'>{book.BookTitle}</td>
                                    <td className='px-6 py-3 whitespace-nowrap'>{book.Author}</td>
                                    <td className='px-6 py-3 whitespace-nowrap'>{book.SellingPrice}</td>
                                    <td className='px-6 py-3 whitespace-nowrap'>{new Date(book.PublishDate).toLocaleDateString()}</td>
                                    <td className='px-6 py-3 whitespace-nowrap flex gap-4'>
                                        <MdEdit onClick={() => handleUpdate(book)} className='text-blue-500 text-xl cursor-pointer hover:text-blue-700' />
                                        <MdDelete onClick={() => handledelete(book._id)} className='text-red-500 text-xl cursor-pointer hover:text-red-700' />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </div>
    </div>
    </>
)
}

export default Home
