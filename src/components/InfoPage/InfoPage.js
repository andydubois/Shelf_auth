import React, {Component} from 'react';
import {connect} from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

componentDidMount() {
  this.getItems();
}

getItems() {
  this.props.dispatch({
    type: 'FETCH_ITEMS'
  })
}

  render() {

  console.log('item is:', this.props.store.itemsReducer);
  
    return (
      <div>
        <p>
          Shelf Page
    </p>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
})

export default connect(mapStateToProps)(InfoPage);
