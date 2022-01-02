const graphql = require('graphql');
const Book = require('../models/book')
const Author = require('../models/author');

//Destructuring graphQl
const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
    GraphQLNonNull } = graphql;
        

//declaring Book Type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: new GraphQLList(AuthorType),
            //when the user request authors the resolve function will execute
            resolve(parent, args) {
                //gets a list of documents that match _id: parent.authorId in Author Book
                return Author.find({_id: parent.authorId })
            }
        }
        
    })
});

//declaring Author Type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            //when the user request authors the resolve function will execute
            resolve(parent, args) {
                //gets a list of documents that match authorId:parent.id in Book Table
                return Book.find({authorId:parent.id})
            }
        }
    })
});

//RootQuery contains all the possible entry points into GraphQL API(or we can simply say that it has all the possible queries)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Get Book by ID query
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Finds a single document by its id field in Book table.
                return Book.findById(args.id)
            }
        },
        //Get Author by ID query
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Finds a single document by its id field in Author table.
                return Author.findById(args.id)
            }
        },
        //Get all Books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //gets a list of documents from Book Table
                return Book.find()
            }
        },
        //Get all Authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //gets a list of documents from Book Table
                return Author.find()
            }
        }
    }
});

//Any Query will effect the data in some way will be named mutation query
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add a new Author
        addAuthor: {
            type: AuthorType,
            args: {
                //name and age must have a NON-NULL value
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            //on Execute the resolve function will resolve XD
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                //Saves this document by inserting a new document into the Author Table
                return author.save();
            }
        },
        //Add a new Book
        addBook: {
            type: BookType,
            args: {
                 //name,genre and authorId must have a NON-NULL value
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLList(GraphQLID)) }
            }, resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                //Saves this document by inserting a new document into the Book Table
                return book.save()
            }
        },
        //Delete Book by name
        deleteBook: {
            type: BookType,
            args: {
                 //name must have a NON-NULL value
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                //finds the given document, deletes it
                return Book.findOneAndDelete({ name: args.name });
            }
        },
        //Delete Author by name
        deleteAuthor: {
            type: AuthorType,
            args: {
                //name must have a NON-NULL value
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                //finds the given document, deletes it
                return Author.findOneAndDelete({ name: args.name });
            }
        },
        //update Book by ID
        updateBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new  GraphQLNonNull(GraphQLList(GraphQLID)) },
            }, resolve(parent, args) {
                
                    return Book.findOneAndUpdate({ _id: args.id },
                    {
                        $set: {name:args.name,genre:args.genre,authorId:args.authorId}
                    },
                    { new: true })
                
               

               
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            }, resolve(parent, args) {
                    return Author.findOneAndUpdate({ _id: args.id },
                    {
                        $set: {name:args.name,age:args.age}
                    },
                    { new: true })

            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});