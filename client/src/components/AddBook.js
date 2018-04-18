import React from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors(){
    const data = this.props.getAuthorsQuery;
    if(data.loading){
      return (<option disabled>Loading authors please wait....</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option name="author" value={author.id} key={author.id}>{ author.name }</option>
        );
      })
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addBookMutation({ // CALL THE MUTATION
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    }); 
  }

  render() {
    return(
        <form id="add-book" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Book name:</label>
            <input type="text" name="name"
             onChange={(e) => this.setState({ name: e.target.value})} />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre"
             onChange={(e) => this.setState({ genre: e.target.value})} />
          </div>

          <div className="field">
            <label>Author:</label>
            <select name="authorId"
            onChange={(e) => this.setState({ authorId: e.target.value})}>
              <option>Select an author</option>
              { this.displayAuthors() }
            </select>
          </div>
          <button value="submit" type="submit" onSubmit={this.handleSubmit}>Add</button>
        </form>
    )
  }
}

// Binding the query to the AddBook component
// Way if you want bind multiple queries to the component 
export default compose(
  graphql(addBookMutation, {name: "addBookMutation"}),
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
)(AddBook);
