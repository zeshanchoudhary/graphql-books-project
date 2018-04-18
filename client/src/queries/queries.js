import { gql } from "apollo-boost";

<<<<<<< HEAD
=======
const getBooksQuery = gql`
query {
    books{
  id
        name
    }
}`


>>>>>>> f4c29aea1c68418869cae094ab4219e74a706243
const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`;

<<<<<<< HEAD
const getBooksQuery = gql`
    query {
        books{
        id
            name
        }
}`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`
 
export {
    getAuthorsQuery,
    getBooksQuery,
    addBookMutation
}
=======
export { getAuthorsQuery, getBooksQuery }
>>>>>>> f4c29aea1c68418869cae094ab4219e74a706243
