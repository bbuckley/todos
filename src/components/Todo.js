import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text, crd, ssn }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {/* <input type='button' value='clone' /> */}
    {text} / {crd} / {ssn}


    {/* <table>
    <tbody>
      <tr><th></th><td><input value={text} /></td></tr>
      <tr><th></th><td><input type='checkbox' />Certed</td></tr>
    </tbody>
    </table> */}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
