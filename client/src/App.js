import React from 'react';
import ApolloClient from 'apollo-boost'
import BookList from './components/BookList.js'
import {ApolloProvider} from 'react-apollo'
import AddNewBook from './components/AddNewBook.js';
import AddNewAuthor from './components/AddNewAuthor.js';
import UpdateBook from './components/UpdateBook.js';
import UpdateAuthor from './components/UpdateAuthor.js';


//Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="container">
        <h1 className="title">Reading List App</h1>
        <BookList />
        <h2 style={{textAlign:'center',borderBottom:'1px solid black'}}>Actions</h2>
        <div className="mini-container">
        <AddNewBook />
        <AddNewAuthor />
        <UpdateBook />
          <UpdateAuthor />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
