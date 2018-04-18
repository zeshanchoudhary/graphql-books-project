import React from "react";
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends React.Component {

  displayBooks(){
    const data = this.props.data;
    if(data.loading){
      return (<div>Loading books please wait....</div>)
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{ book.name }</li>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
