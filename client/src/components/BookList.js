import React from "react";
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from "./BookDetails";

class BookList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }

  displayBooks(){
    const data = this.props.data;
    if(data.loading){
      return (<div>Loading books please wait....</div>)
    } else {
      return data.books.map(book => {
        return (
          <li onClick={(e) => {this.setState({ selected: book.id})}} key={book.id}>{ book.name }</li>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
          <BookDetails bookId={this.state.selected} />
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
