import React, { useEffect, useState } from 'react';
import { getBooksQuery,getBookQuery } from '../queries/queries.js'
//binding react and apollo
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
import BookDetails from './BookDetails.js';


const BookList = (props) => {

    const [selected, setSelected] = useState({selectedBook:null})

    
    return (<div className="book-list-container">
        
        <ol id="book-list">
            {props.data.loading === false ? (
                props.data.books.map(book => {
                    return (<li className='book-list' key={book.id} onClick={(e)=> setSelected({ selectedBook: book.id })}>{book.name}</li>)
                })
            ):(<p>Loading...</p>)}
            

        </ol>
        
        <BookDetails className='book-details' bookId={selected.selectedBook} />
    </div>
        
    )
}

export default graphql(getBooksQuery)(BookList);