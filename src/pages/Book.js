import React from 'react'
import { Link } from 'react-router-dom';

export default function Book({book}) {


    
  return (
    <div className={"container"}>
     <div className={"py-4"}>
        <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">ISBN</th>
                <th scope="col">Titre</th>
                <th scope="col">Publisher</th>
                <th scope="col">Sujet</th>
                <th scope="col">Tag</th>
                 <th scope="col">Actions</th> 
                </tr>
            </thead>
            <tbody>
            
        
                        <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td>{book.name}</td>
                        <td>{book.publisher}</td>
                        <td>{book.subject}</td>
                        <td>{book?.tag}</td>
                        <td></td>
                        <td><Link className={"btn btn-primary mx-2"}  exact =" true" to={`/emprunter/${book.id}`}>emprunter</Link></td>
                        </tr>
                
                
            </tbody>
        </table>

    </div> 
</div> )
}
