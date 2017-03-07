import React from 'react'
import { connect } from 'react-redux'

import { store } from '../index'

class Er extends React.Component {
//const Er = ({ dispatch }) => {

  // onFilter(){
  //   console.log('on Fileter')
  //   this.props.dispatch({
  //     type: 'FILTER',
  //     payload: 2
  //   })
  // }

  onFilter(){
    console.log('onFilter');
    store.dispatch({type: 'SET_FILTER' })
    //this.props.dispatch({type: 'SET_FILTER' })
  }

  render(){
    const style = {
      width: '300px'
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th><input onClick={this.onFilter.bind(this)} type='button' value='Filter' /></th><td><input placeholder='enter filter' style={style} /></td>
            </tr>
            <tr>
              <th><input type='button' value='Sort'/></th><td><input placeholder='enter sorter' style={style} /></td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    filterer: state.filterer,
    todos: state.todos
  }
}



// function mapDispatchToProps(dispatch) {
//   return {
//     onFilter: () => dispatch({
//       type: 'FILTER',
//       payload: 2
//     })
//   };
// }


//import VisibleTodoList from '../containers/VisibleTodoList'
connect(
  mapStateToProps
)(Er)

// connect(
//     mapStateToProps
// )(Er)

export default Er
