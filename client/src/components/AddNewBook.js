import React, { Fragment, useState } from 'react';
import { getAuthorsQuery,addBookMutation,getBooksQuery } from '../queries/queries'
//binding react and apollo
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';


const AddNewBook = (props) => {

    

    const [newBook, setNewBook] = useState({
    name:"",genre:"",authorId:[]
    })

    const OnChangeHandler = (e) => {
        setNewBook({...newBook,[e.target.name]:e.target.value})
    }

    //getting all authors from multi-select input
    const GetValues = () => {
        const selected = document.querySelectorAll('#selectAuthors option:checked');
        var values = Array.from(selected).map(el => el.value)
        setNewBook({...newBook,authorId:values})
    }

    

    
    const SubmitHandler = (e) => {

        e.preventDefault();

        props.addBookMutation({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId
            }, refetchQueries: [
               { query :getBooksQuery}
            ]
            
        });
        
        document.getElementById('addBookForm').reset();
        
        
    }

    

    return (
        <div>
            <h3>Add New Book</h3>
            <form id='addBookForm' onSubmit={SubmitHandler} >
                <label>Book Name:</label>

                <input type="text" name="name" required
                    placeholder="Enter the name" onChange={OnChangeHandler} />
                
                <br />

                <label>Book genre:</label>

                <input type="text" name="genre" required
                    placeholder="Enter the genre" onChange={OnChangeHandler} />
                
                <br />
                <label>Select Author(s):</label>
                <Fragment>
            <br/>
            <select id='selectAuthors' name="authorId" required onChange={GetValues} multiple={true} >
                {props.getAuthorsQuery.loading !== true && (
                    props.getAuthorsQuery.authors.map((author) => {
                        return (<option key={author.id}  value={author.id}>{author.name}</option>)
                    })
                )}
            </select>
        </Fragment>
                <br/>
                <button type="submit"> Add Book</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation,{name:'addBookMutation'})
)(AddNewBook);