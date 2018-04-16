import { gql } from "apollo-boost";

const getBooksQuery = gql`
query {
    books{
  id
        name
    }
}`


const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`;

export { getAuthorsQuery, getBooksQuery }