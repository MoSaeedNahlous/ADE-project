import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
{
    authors{
        name
        age
        id
    }
}
`
const getBooksQuery = gql`
{
    books{
        name
        id  
    }
}
`
const addBookMutation = gql`

mutation($name:String!,$genre:String!,$authorId:[ID]!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
    }

}`

const addAuthorMutation = gql`
mutation($name:String!,$age:Int!){
    addAuthor(name:$name,age:$age){
        name
        age
    }
}
`
const updateBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:[ID]!,$id:ID!){
    updateBook(name:$name,genre:$genre,authorId:$authorId,id:$id){
        name
        genre
    }
}
`

const updateAuthorMutation = gql`
mutation($name:String!,$age:Int!,$id:ID!){
    updateAuthor(name:$name,age:$age,id:$id){
        name
        age
    }
}
`

const getBookQuery = gql`

query($id:ID!){
    book(id:$id){
        name
        id
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`



export {
    getBooksQuery,
    getAuthorsQuery,
    addBookMutation,
    addAuthorMutation,
    updateBookMutation,
    updateAuthorMutation,
    getBookQuery
};