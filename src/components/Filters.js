import React from 'react'
import { connect } from 'react-redux'
import { store } from '../index'
import { loadFilter, clearFilter, toggleOffFilter } from '../actions/index'

class Filters extends React.Component {

   render(){
     const { field, tcs, offfilter } = this.props

     const n = tcs.length

     const dist = [...new Set(tcs.map(x => x[field]))].sort()
     let x = dist.map(x => [x, tcs.filter((t) => t[field] === x).length])
     x = x.map(x => [(typeof x[0]==='undefined') ? '' : x[0], x[1] ])

     const style = {
       border: '1px solid black',
       padding: '10px',
     }

     const off = { color: 'red', }
     const on = { color: 'green', }

     const f = offfilter[field]
     const g = v => {
       if (typeof(f) === 'undefined'){ return false }
       return f.includes(v)
     }

     return (
       <div>
         <table style={style}>
           <tbody>
             <tr>
               <td><a href='#' onClick={
              e => {
              e.preventDefault()
              store.dispatch(clearFilter(field))
            }
          }>Clear</a> - <a href='#' onClick={
              e => {
              e.preventDefault()
              store.dispatch(loadFilter(field, dist))
            }
          }>Filter All</a></td>
          <td></td></tr>
             {x.map(y =>(<tr key={y[0]}><td>{y[0]}</td><td ><a style={(g(y[0])) ? off : on} onClick={
               e => {
                 e.preventDefault()
                 store.dispatch(toggleOffFilter(field, y[0]))
               }
             } href='#'>{y[1]}</a></td></tr>))}
             <tr>
               <td>total</td><td>{n}</td>
             </tr>
           </tbody>
         </table>
       </div>
     )
   }
}

const mapStateToProps = state => {
  return  {
    //tcss: [],
    //tcs: state.todos,
    //n: state.todos.length,
    offfilter: state.offfilter,
  }
}

export default connect(mapStateToProps)(Filters)
