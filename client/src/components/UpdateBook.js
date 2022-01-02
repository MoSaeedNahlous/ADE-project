import React, { Fragment, useState } from 'react'
import { updateBookMutation,getAuthorsQuery } from '../queries/queries.js'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';


const UpdateBook=(props)=> {
    const [newBook, setNewBook] = useState({
    name:"",genre:"",authorId:[],id:""
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

        console.log(newBook)

        props.updateBookMutation({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId,
                id:newBook.id
            }
            
        });
        
        document.getElementById('updateBookForm').reset();
        
        
    }
    return (
        <div>
            <h3>Update Book</h3>
            <form id='updateBookForm' onSubmit={SubmitHandler} >
                <label>Book ID:</label>
                <input type="text" name="id" required placeholder="Enter the ID" onChange={OnChangeHandler}/>
                <br/>

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
                <button type="submit"> Update Book</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(updateBookMutation, { name:'updateBookMutation'}),
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' })
)(UpdateBook)
