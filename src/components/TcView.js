
import React from 'react'
import { connect } from 'react-redux'
import { store } from '../index'
import { toggleSort, delTodo, editingField, editField, unedit, addClone, addOffFilter } from '../actions/index'
import { sort_date_field, sort_text_field } from './sort'
import TextForm from './TextForm'
//import Tdd from './Tdd'
import Tags from './Tags'
import { offfilter_filter } from '../reducers/offfilter'
import Statistics from './Statistics'

class TcView extends React.Component {

  constructor(){
    super()
    this.state = {
      // text: "the text",
      // crd: "the crd",
      // completed: "the completed",
      // ssn: "the ssn",
    }


    this.onSubmit = this.onSubmit.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onChange(e) {
    //console.log(e.target.name, e.target.value);
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  onSubmit(e){
    e.preventDefault()
    const field = this.props.edit_field.field
    store.dispatch(editField(this.state.id, field, this.state[field]))
    store.dispatch(unedit())
  }

  onFldClick(t, fld){
    store.dispatch(editingField(t.id, fld))
  }

  onRowClick(t){
    if(t === undefined){ return }
    if(t.id !== this.state.id){
      const {tc, id, text, crd, completed, status, ssn, dotm, pbc, ric, calc_type, dob, doe, tags} = t
      this.state = {
             tc, id, text, crd, completed, status, ssn, dotm, pbc, ric, calc_type, dob, doe, tags
      }
    }
  }

  componentWillMount(){
    if(this.props.edit_field !== null){
      const  i = this.props.todos.findIndex(({id}) => id === this.props.edit_field.id)
      const t = this.props.todos[i]
      this.onRowClick(t)
    }

  }

  render() {
    let todos = this.props.todos
    const n = todos.length
    todos = offfilter_filter(this.props.offfilter,todos)


    if(this.props.tags.length > 0){
    const tt = this.props.tags
    const skip = t => !(typeof(t.tags)==='undefined' || t.tags === null || t.tags.trim() === '')
    todos = todos.filter(skip).filter(x => {
      let match = false
      x.tags.split(/\s+/).forEach(a => {
        if(tt.includes(a)){ match = true }
      })
      return match
    })
    }

    const m = this.props.sorter
    const r = (m[0] === '!')
    const field = (r  ? m.substr(1) : m)

    const convertUnicode = (input) => {
      return input.replace(/\\u(\w{4,4})/g,function(a,b) {
        var charcode = parseInt(b,16);
        return String.fromCharCode(charcode);
      });
    }

    const symbol = (current, m) => {
      const r = (m[0] === '!')
      const field = (r  ? m.substr(1) : m)
      if(current !== field){ return '' }
      return r ? convertUnicode('\u2191') : convertUnicode('\u2193')
    }

    let field_type = 'text'
    if(['crd','dob','doe','dotm','dot','bcd'].includes(field)){ field_type = 'date'}
    let sort = (a,b) => sort_text_field(a, b, field, r)
    if(field_type === 'date'){ sort = (a,b) => sort_date_field(a, b, field, r) }
    let todos1 = todos.sort(sort)


    //this.state.text = fm['text']

    const a = this.props.filterer
    //Object.keys(a).forEach(
    //    k => {
    //      console.log(f, a[f]) //a is map, f is 'crd', 'ssn', etc.
    //      todos1 = todos1.filter((tc) => (tc[k] || '').match(new RegExp(a[k])) !== null)
    //    }
    //)

    const nf = todos1.length

    const style = {
      border: '1px solid black',
      padding: '10px',
    }
    const rowstyle = {
      border: '1px solid black',
      padding: '8px',
    }
    const rowstyleedit = {
      border: '1px solid black',
      padding: '8px',
      background: 'yellow'
    }

    const { flds } = this.props

    const items = flds.map(fld => {
      if(['dob','crd','doe'].includes(fld)){
        return (<td key={fld}></td>)
      }else{
        // return (<td key={fld}><Statistics field={fld}/></td>)
        return (<td key={fld}>xxx</td>)
      }
    })

    return (
      <div>
        <Tags />
        <p>TC {n} [{n} - {n-nf} = {nf} unfiltered]</p>

        <table style={style}>
          <tbody>
            <tr><th></th></tr>
            <tr>
            <th><a href='#' onClick={ (e) => {
              e.preventDefault()
              store.dispatch(unedit())
            }}>unedit</a></th>

            {flds.map(fld => (
              <th key={fld} style={style}><a href='#' onClick={ (e) => {
                e.preventDefault()
                store.dispatch(toggleSort(fld))
              }}>{fld}</a>{symbol(fld,m)}
             </th>
            ))}
            </tr>

            <tr>
              <th>filter</th>
              {items}
            </tr>

            { todos1.map((t) => {
              if(t.id === this.props.editReducer){
                return (
                <tr key={t.id} style={rowstyleedit} onClick={this.onClickRow} >
                  <td>
                      <input type='button' value='Edit' onClick={e =>
                        store.dispatch({ type: 'CLEAR_EDIT'})
                      }/>
                      <input type='button' value='Clone' onClick={ e => alert('foo ' + t.id ) } />
                      <input type='button' value='Delete' />
                  </td>

                  <td style={rowstyleedit}><input value={t.text} /> <TextForm text={t.text} /></td>
                  <td style={rowstyle}>{t.crd}</td>
                  <td style={rowstyle}>{t.completed}</td>
                  <td style={rowstyle}>{t.ssn}</td>
                </tr>
                )
              }else{
                // return <tr key={t.id} style={style} key={t.id} onClick={(e) => {store.dispatch(setEdit(t.id))}} >

                //let b

                return <tr key={t.id} style={style} onClick={e => this.onRowClick(t)}>
                <td>
                    <input type='button' value='Clone' onClick={ e => { e.preventDefault(); store.dispatch(addClone(t.id)) }} />
                    <input type='button' value='Hide' onClick={ e => { e.preventDefault();store.dispatch(addOffFilter('id',t.id)) }}/>
                    <input type='button' value='Delete' onClick={ e => { store.dispatch(delTodo(t.id)) }}/>
                </td>

                {flds.map(fld => {
                  let b = false
                  const key = t['id'] + fld
                  if(this.props.edit_field !== null){
                    b = (t['id']===this.props.edit_field.id && (fld === this.props.edit_field.field))
                  }

                  if(!b) { return (
                  <td key={key} style={rowstyle} onClick={e => this.onFldClick(t, fld)}>
                    {t[fld]}
                  </td>
                  )} else {

                    let placeholder = ''
                    if(fld==='tc'){ placeholder='#####'}
                    if(['dob','doe','crd','dotm'].includes(fld)){ placeholder='mm/dd/yyyy'}

                    return (
                    <td key={key} onClick={e => this.onFldClick(t, fld)}>

                      <form onSubmit={this.onSubmit}>
                        <input placeholder={placeholder} autoFocus='true' name={fld} value={this.state[fld]} onChange={this.onChange.bind(this)} />
                        <input type='submit' />
                      </form>


                      <form onSubmit={e => {
                        e.preventDefault()
                        store.dispatch(unedit())
                      }}><input type='submit' value='Cancel'  />
                      </form>

                    {t[fld]}
                    </td>
                    )
                }
              })}

                {/* {console.log(t, t.doe, t.agedoe)} */}
                {/* <td style={rowstyle} >{t.agedoe()}</td> */}
              </tr>
            }
            })}
          </tbody>
        </table>

      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return  {
    todos: state.todos,
    editReducer: state.editReducer,
    filterer: state.filterer,
    offfilter: state.offfilter,
    sorter: state.sorter,
    edit_field: state.edit_field,
    tags: state.tags,
  }
}

export default connect(mapStateToProps)(TcView)
