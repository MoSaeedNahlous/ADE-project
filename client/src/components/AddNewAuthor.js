import React, { useState } from 'react';
import { addAuthorMutation,getAuthorsQuery } from '../queries/queries.js'
import { graphql } from 'react-apollo'

const AddNewAuthor = (props) => {

    const [newAuthor, setNewAuthor] = useState({
        name:'',age:0
    })

   
    const OnChangeHandler = (e) => {
        setNewAuthor({...newAuthor,[e.target.name]:e.target.value})
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        props.addAuthorMutation({
            variables: {
                name: newAuthor.name,
                age: Number.parseInt(newAuthor.age)
            },refetchQueries:[{query:getAuthorsQuery}]
            
        });
        
        document.getElementById('AddAuthorForm').reset()
        

    }

    return (
        <div>
            <h3>Add New Author</h3>
            <form id="AddAuthorForm" onSubmit={SubmitHandler} >
                <label>Author Name:</label>
                <input type="text" name="name" required placeholder="Enter the Name" onChange={OnChangeHandler} />
                <br />
                <label>Author Age:</label>
                
                <input type="number" name="age" required placeholder="Enter the Age" onChange={OnChangeHandler}/>

                <br/>
                <button type="submit">Add Author</button>
            </form>
        </div>
    )
}

export default graphql(addAuthorMutation,{name:'addAuthorMutation'})(AddNewAuthor);
