import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`;

// const AddBookMutation = gql`
// 	mutation addBook($name: ) {
// 		books{
//       id
// 			name
// 		}
// 	}`

class AddBook extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      genre: '',
      author: ''
    }
  }

  displayAuthors(){
    const data = this.props.data;
    if(data.loading){
      return (<option disabled>Loading authors please wait....</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option name="author" key={author.id}>{ author.name }</option>
        );
      })
    }
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Book");
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
            <label>Author::</label>
            <select name="author" 
            onChange={(e) => this.setState({ author: e.target.value})}>
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
export default graphql(getAuthorsQuery)(AddBook);
