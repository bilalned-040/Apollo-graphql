const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const movieSchema = require('./schema/schema');
const resolvers = require('./resolver/resolver');
const cors = require('cors');


mongoose.connect(('mongodb+srv://admin:neduni@cluster0.zy4eu.mongodb.net/moviemaker?retryWrites=true&w=majority'),{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then(()=> console.log("Mongodb connected"))
.catch((err) => console.log("Error",err));

app.use(cors())

//Setting graphql
app.use('/graphql',graphqlHTTP({
    schema:movieSchema,
    graphiql:true,
    rootValue:resolvers
}))

app.get('/',(req,res)=>{
    res.send("backend running")
})

app.listen(4000,()=>{
    console.log("server on port 4000")
})