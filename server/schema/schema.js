const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID // sirve para que el id puede ser String o int
} = graphql;


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parentValue, args){
        return Author.findById(parentValue.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parentValue, args){
        // find() encuentra todos los libros con ese id.
        return Book.find({authorId: parentValue.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args){
          return Book.findById(args.id);
      }
    },
    // Another RootQuery
    author: {
      type: AuthorType,
      args: { id:  { type: GraphQLID } },
      resolve(parentValue, args){
        return Author.findById(args.id);
      }
    },
    // Another RootQuery => books
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args){
        return Book.find({}); // esto devuelve todos
      }
    },
    // Another RootQuery => authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parentValue, args){
        return Author.find({});
      }
    }
  }
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // addAuthor Mutation
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save(); // Guardamos el author
      }
    },
    // addBook Mutation
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save(); // Guardamos el author
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery, // root query
  mutation: Mutation
})
