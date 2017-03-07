
import React from 'react'
import { connect } from 'react-redux'

//import { store } from '../index'
import TodoForm from '../components/TodoForm'

class EditTodo2 extends React.Component {

  onChange(e){
    console.log('change');
    console.log(e.target.value);
    //this.text = e.target.value
    //console.log(e);
    const newText = e.target.value;
    this.setState({text : newText});

  }
  onSubmit(e){
    e.preventDefault()
    console.log('submit');
  //  console.log(this.id, this.text, this.completed)
   console.log(this.id.value, this.text.value, this.completed.value)
    // store.dispatch({
    //   type: 'EDIT_TODO',
    //   action: {
    //     id: this.id.value,
    //     text: this.text.value,
    //     completed: this.completed.value
    //   }
    // })

  }

  render(){
    if (this.props.editReducer === 'none') { return (<div>not editing</div>) }
    const todo = this.props.todos.filter((x) => x.id === this.props.editReducer)[0]
    //const todo2 = this.props.todos[0]

    // const { id, text, completed } = todo
    //this.setState({text : text});
    //this.text = text

    return (
      <div>
        {/* <h3>EditTodo2</h3>
        <p>id - {id} </p>
          <form onSubmit={this.onSubmit.bind(this)} >
          <p>text - {text} <input type='text' value={text} onChange={this.onChange.bind(this)} ref={x => { this.text = x }} /></p>
        <p>completed - { completed ? "true" : "false"} <input value={completed} ref={x => { this.completed = x }} onChange={this.onChange.bind(this)} />
        <input ref={x => { this.id = x }} value={id} type='hidden' /></p>
        <p><input type='submit' /></p>
        </form> */}

        <TodoForm todo={todo}/>


      </div>
    )
  }

}

const mapStateToProps = (state) => {
  //const i = state.editReducer
  //console.log("i=" + i);
  //tt = state.find(x => x.id === i)

  return {
    todos: state.todos,
    editReducer: state.editReducer
  }
}

export default connect(mapStateToProps)(EditTodo2)
