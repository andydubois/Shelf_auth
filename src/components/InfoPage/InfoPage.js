import React, {Component} from 'react';
import {connect} from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state = {
    description: '',
    image_url: ''
  }

componentDidMount() {
  this.getItems();
}

getItems() {
  this.props.dispatch({
    type: 'FETCH_ITEMS'
  })
}

handleChange = (event, property)=>{
  this.setState({
    ...this.state,
    [property]: event.target.value
  })
}

handleSubmit = ()=>{
  this.props.dispatch({
    type: 'ADD_ITEM',
    payload: this.state
  })
}

  render() {

  console.log('item is:', this.props.store);
  console.log(this.state)
    let itemsList = this.props.store.items.map((item) => {
      return (
        <tr>
          <td><img src={item.image_url}/></td>
          <td>{item.description}</td>
          <td><button>Delete</button></td>
        </tr>
      )
    })

    return (
      <div>
        <input type="text" placeholder="item description" onChange={(event)=>{this.handleChange(event, 'description')}}/>
        <input type="url" placeholder="image url" onChange={(event)=>{this.handleChange(event, 'image_url')}}/>
        <button onClick = {this.handleClick}>Add Item</button>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {itemsList}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
})

export default connect(mapStateToProps)(InfoPage);
