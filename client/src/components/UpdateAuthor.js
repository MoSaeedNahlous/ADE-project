import React, { Fragment, useState } from 'react'
import { updateAuthorMutation,getAuthorsQuery } from '../queries/queries.js'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';


const UpdateAuthor =(props)=> {
    const [newAuthor, setNewAuthor] = useState({
    name:"",age:"",id:""
    })

    const OnChangeHandler = (e) => {
        setNewAuthor({...newAuthor,[e.target.name]:e.target.value})
    }

    
    const SubmitHandler = (e) => {

        e.preventDefault();

        console.log(newAuthor)

        props.updateAuthorMutation({
            variables: {
                name: newAuthor.name,
                age: Number.parseInt(newAuthor.age),
                id: newAuthor.id
            }
            
        });
        
        document.getElementById('updateAuthorForm').reset();
        
        
    }
    return (
        <div>
            <h3>Update Author</h3>
            
            <form id='updateAuthorForm' onSubmit={SubmitHandler} >
                <label>Author ID:</label>
                <input type="text" name="id" required placeholder="Enter the ID" onChange={OnChangeHandler}/>
                <br/>

                <label>Author Name:</label>
                <input type="text" name="name" required
                    placeholder="Enter the name" onChange={OnChangeHandler} />
                
                <br />

                <label>Author age:</label>

                <input type="number" name="age" required
                    placeholder="Enter the age" onChange={OnChangeHandler} />
                
                <br/>
                <button type="submit"> Update Author</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(updateAuthorMutation, { name:'updateAuthorMutation'}),
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' })
)(UpdateAuthor)
