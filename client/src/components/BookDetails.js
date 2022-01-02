import React from 'react'
import { getBookQuery } from '../queries/queries.js'
import { graphql } from 'react-apollo'

const BookDetails = (props) => {
 const {book} = props.data
    if (book) {
        return (
            <div className='book-details'>
                <h4>Book's Name:</h4>
                <h2 style={{textAlign:'center'}}>{book.name}</h2>
                <h4>Book's Genre:</h4>
                <h3 style={{textAlign:'center'}}>{book.genre}</h3>
                <h4>Authors:</h4>
                <h3>{book.author.map(auth => {
                    return <li>{auth.name}</li>
                })}</h3>
            </div>
        )
    } else {
    return (
        <div>
            <p>Select a Book from the list..</p>
        </div>
        )
    }
}

export default graphql(getBookQuery,{options: (props) => {
    return {
        variables: {
            id:props.bookId
        }
    }} 
})(BookDetails)
