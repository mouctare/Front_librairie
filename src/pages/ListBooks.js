import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Book from './Book';

export default function ListBooks() {

const [books, setBooks] = useState([])

useEffect(() =>{
    loadBooks();
}, [])

const loadBooks = async () =>{
    const result = await axios.get("http://localhost:8080/allBooks")
    setBooks(result.data);

    console.log(result.data);
}



    return (
            <div className="row center">
            {books.map((book) => (
                <Book key={book.bookId} book={book} />
            ))}
        </div>   )
}
