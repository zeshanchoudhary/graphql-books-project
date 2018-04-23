import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`;

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

const getBookQuery = gql`
  query getBookQuery($id: ID){
      book(id: $id){
        id
        name
        genre
        author {
          id
          name
          age
          books {
            name
            id
          }
        }
      }
  }
`
 
export {
    getAuthorsQuery,
    getBooksQuery,
    addBookMutation,
    getBookQuery,
}
