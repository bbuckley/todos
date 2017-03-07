
import React from 'react'
import { store } from '../index'
import { editTodo, delTodo } from '../actions'

class TodoForm extends React.Component {

  constructor(props){
    super(props)
    const { id, ssn, text, completed, crd, notes } = this.props.todo
    this.state  = { id, ssn, text, completed, crd, notes }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const { id, ssn='', text, completed, crd = '', notes = ''} = nextProps.todo
    this.setState({ id, ssn, text, completed, crd, notes })
  }

  onChange(e){
    this.setState({
      ssn: this.ssn.value,
      text: this.text.value,
      completed: this.completed.value,
      crd: this.crd.value,
      notes: this.notes.value,
    })
  }

  onSubmit(e){
    e.preventDefault()
    const completed = 'true' === this.state.completed
    const { id, ssn, text, crd, notes } = this.state
    console.log('i am here');
    store.dispatch(editTodo( { id, ssn, text, completed, crd, notes } ))
    store.dispatch({ type: 'CLEAR_EDIT'})
  }

  onDelete(e){
    e.preventDefault()
    console.log(this.state.id);
    store.dispatch(delTodo(this.state.id))
    console.log('del');
  }

  render(){
    const { id, ssn, text, completed, crd } = this.props.todo

    //const flds = ['dob','doe','domt']

    return (
      <div>
        <h3>TodoForm</h3>
         {id} - {text} - {completed ? 'true' : 'false'} - {crd} - {ssn}<br/>

        <form onSubmit={this.onSubmit.bind(this)}>
          <table >
            <tbody >
              <tr><th>task</th><td><input placeholder='enter task' onChange={this.onChange}  value={this.state.text} ref={(i) => { this.text = i; }}/></td></tr>
              <tr><th>ssn</th><td><input placeholder='###-##-####' onChange={this.onChange} value={this.state.ssn} ref={(i) => { this.ssn = i; }}/></td></tr>
              <tr><th>completed</th><td><input placeholder='true/false'  onChange={this.onChange} value={this.state.completed} ref={(i) => { this.completed = i; }}/></td></tr>
              <tr><th>crd</th><td><input placeholder='m/d/yyyy'  onChange={this.onChange} value={this.state.crd} ref={(i) => { this.crd = i; }}/></td></tr>




            </tbody>
          </table>

          <table>
            <tbody>
              <tr><th>notes</th><td><textarea placeholder='write notes here' onChange={this.onChange} value={this.state.notes} ref={(i) => { this.notes = i; }}/></td></tr>
            </tbody>
          </table>


          {/* <p>task <input placeholder='enter task' onChange={this.onChange}  value={this.state.text} ref={(i) => { this.text = i; }}/></p>
          <p>ssn <input placeholder='###-##-####' onChange={this.onChange} value={this.state.ssn} ref={(i) => { this.ssn = i; }}/></p> */}
          {/* <p>completed <input placeholder='true/false' onChange={this.onChange.bind(this)} value={this.state.completed} ref={(i) => { this.completed = i; }} /></p> */}
          {/* <p>completed <input type="checkbox" checked={this.state.completed } onChange={this.onChange.bind(this)} ref={(i) => { this.completed = i; }} /></p> */}
          {/* <p>crd <input placeholder='m/d/yyyy' onChange={this.onChange.bind(this)} value={this.state.crd} ref={(i) => { this.crd = i; }}/></p> */}

          <input onChange={this.onChange.bind(this)} value={id} type='hidden' />
          <input type='submit' value='submit'/>
          <input type='button' value='delete' onClick={this.onDelete} />



        </form>
      </div>
    )
  }
}

export default TodoForm
