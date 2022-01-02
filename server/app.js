//these lines for importing modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


//these lines are to avoid deprecating errors
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//create app.js
const app = express();

//allow cros origin requests
app.use(cors());

//connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://youssefkafa:123kafa123@libapp.u0dkt.mongodb.net/libApp-database?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'libApp-database' }).then(() => {
        console.log("Connected to Mongodb on Cloud")
    }).catch(err => {
        console.log(err)
    })

    
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}));

//Listening to port 4000
app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});