import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
//import VisibleTodoList from '../containers/VisibleTodoList'
import Clear from '../components/Clear'
//import Statistics from './Statistics'
import EditTodo from '../containers/EditTodo'
import EditTodo2 from '../containers/EditTodo2'
import TC from './TC'
//import HelloWorld from './HelloWorld'

import Er from './Er'
// import FlavorForm from './FlavorForm'
// import OptionForm from './OptionForm'
import TcView from './TcView'

// import TextForm from './TextForm'
import { store } from '../index'
import { clearAllFilter } from '../actions/index'

import { toggleSort } from '../actions/index'



//import store from '../index'
// const resetLocalStorage = () => {
//   console.log("here")
//   console.log(store)
// }
// const style = {
//   style: 'vertical-align:top',
// }
const flds1 = ['pbc','dob','ric','calc_type','status','tags']
//const flds = ['tags','tc','text','crd','completed','ssn','pbc','dob','ric','calc_type','status','doe','dotm']

const App = () => (
  <div>
    <AddTodo />
    {/* <VisibleTodoList /> */}
    <Footer />
    <Clear />

    <EditTodo />

    <EditTodo2 />

    <Er />

    {/* <FlavorForm init={{ value: 'bar', options: ['','bar','foo','baz']}}/>
    <OptionForm init={{ value: 'barc', options: ['','barc','fooc','bazc'], label: "foo"}}/>
    <OptionForm init={{ value: 'true', options: ['true','false']}}/> */}

    <table className='statistics'>
      <tbody>
        <tr>
          <td><input type='button' value='Clear filters'onClick={() => store.dispatch(clearAllFilter()) } /></td>
        </tr>
      </tbody>

    </table>

    <TcView flds={flds1}/>
    {/* <TcView flds={flds}/> */}

    {/* <TextForm text='the text' />
    <TextForm text='more  x text' />
    <TextForm text='the a third' />
    <TextForm text='more fourth' /> */}

    <TC
      toggleSort={ fld => store.dispatch(toggleSort(fld))}
    />

    {/* <HelloWorld name='joe'/>
    <HelloWorld />
    <HelloWorld name='Joe!' button_value='bar'/> */}




  </div>
)




export default App
