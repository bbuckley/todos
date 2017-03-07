
import React from 'react'
import { connect } from 'react-redux'
import { store } from '../index'
//import { toggleSort } from '../actions/index'

import { samples } from '../reducers/samples'

import { offfilter_filter } from '../reducers/offfilter'
import { delTodo, editingField, editField, unedit } from '../actions/index'

import Statistics from './Statistics'
import Filters from './Filters'


//import { sort_date_field, sort_text_field } from './sort'

import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB63Tv78BGvNIsdccQHkPZv9T6n5ZPq__8",
    authDomain: "testerbkb.firebaseapp.com",
    databaseURL: "https://testerbkb.firebaseio.com",
    storageBucket: "testerbkb.appspot.com",
    messagingSenderId: "464556173301"
  };
firebase.initializeApp(config);

class TC extends React.Component {

  constructor(){
    super()
    this.state = {
      tcs: [],
      tc: {},
    }

    this.addSample = this.addSample.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.edit_field == null) return

      const { id, field } = nextProps.edit_field

      console.log('receving new props: ', this.props.edit_field, nextProps.edit_field);
      const i = this.state.tcs.findIndex(v => v.id === id)
      if(i !== -1){
        this.value = this.state.tcs[i][field]

      }
      console.log(i, this.state.tcs.length, id, field);

 }

  onRowClick(t){
    if(t === undefined){ return }
    if(t.id !== this.state.tc.id){
      // const {id, text, crd, completed, status, ssn, dotm, pbc, ric, calc_type, dob, doe, tags} = t
      // this.state.tc = {
      //        id, text, crd, completed, status, ssn, dotm, pbc, ric, calc_type, dob, doe, tags
      // }

    }
  }

  onChange(e) {
    //console.log(e.target.name, e.target.value);
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState({tc: change});


    const value = e.target.value
    this.value = value

    //console.log({ tc: this.state.tc, name: e.target.name, value: e.target.value, state: this.state });
    //this.state.tc[e.target.name] = e.target.value;
    //console.log({ tc: this.state.tc, name: e.target.name, value: e.target.value });

    //this.setState(tc: e.target.value)
  }

  onSubmit(e){
    e.preventDefault()
    const { id, field } = this.props.edit_field
    store.dispatch(editField(id, field, this.state.tc[field]))
    store.dispatch(unedit())
    //console.log({id , field,  value: this.state.tc[field]});
  }


  // static foo(){
  //   return 'foo!'
  // }

  componentWillMount(){
    const ref = firebase.database().ref('tcs')
    ref.on('value', snapshot => {
      const o = snapshot.val()
      let tcs =  Object.keys(o).map(k => { const v = o[k]; v.id = k; return v})
      this.setState({tcs})
    })
  }

  addSample(n=1){
    const tcs =  samples(n)
    const ref = firebase.database().ref('tcs')
    for (let i = 0; i < tcs.length; i++) {
      ref.push(tcs[i])
    }
  }

  //static flds = ['pbc','calc_type','ssn','dob','doe','status','tags']


  render(){
    const { offfilter, edit_field, filters } = this.props

    const flds = ['id','pbc','calc_type','ssn','dob','doe','status','tags']
    const total_tcs = this.state['tcs']
    let tcs = this.state['tcs']
    //let { tcs } = this.props

    const n = tcs.length
    tcs = offfilter_filter(offfilter,tcs)
    const m = tcs.length

    // let field_type = 'text'
    // if(['crd','dob','doe','dotm','dot','bcd'].includes(field)){ field_type = 'date'}
    // let sort = (a,b) => sort_text_field(a, b, field, r)
    // if(field_type === 'date'){ sort = (a,b) => sort_date_field(a, b, field, r) }
    // tcs = tcs.sort(sort)

    const link = fld => {
      return (<a href='#' onClick={ e => {
        e.preventDefault()
        this.props.toggleSort(fld)
      }}>{fld}</a>)
    }

    const hd = flds.map(fld => {
      return (<td key={fld}>{link(fld)}</td>)
    })

    const head1 = (<td></td>)
    const head2 = id => (
      <td key={id}>
        <input type='button' value='Clone' onClick={ e => { e.preventDefault();console.log('clone '+id) }}/>
        <input type='button' value='Hide' onClick={ e => { e.preventDefault();console.log('hide '+id) }}/>
        <input type='button' value='Delete' onClick={ e => { e.preventDefault(); store.dispatch(delTodo(id)) }}/>
      </td>
    )

    const rows = tcs.map(tc => {
      const id = tc.id
      //return (<tr key={id}>{head2(id)}{flds.map(fld => { return (<td key={fld}>{tc[fld]}</td>)})}</tr>)

      return (<tr onClick={
        e => {
          //this.onRowClick(tc)
          console.log('row ' + tc)
        }} key={id}>{head2(id)}{flds.map(fld => {
        const is = e => {
          console.log('is',tc.id, fld, tc[fld])
        }
        const no = e => {
          console.log('no',tc.id, fld, tc[fld])
          store.dispatch(editingField(tc.id, fld))
        }

        const cancel = e => {
          e.preventDefault()
          store.dispatch(unedit())
        }

        let b = false
        if(edit_field !== null){
          b = (tc['id']===edit_field.id && (fld === edit_field.field))
        }

        let placeholder = ''
        if(fld==='tc'){ placeholder='#####'}
        if(['dob','doe','crd','dotm'].includes(fld)){ placeholder='mm/dd/yyyy'}

        if(b){
          return (<td key={fld} onClick={is}>
            {tc[fld]}
            <form onSubmit={cancel}>
              <input type='submit' value='Cancel'  />
            </form>

            <form onSubmit={this.onSubmit}>
              {/* <input placeholder={placeholder} autoFocus='true' name={fld} value={this.state.tc[fld]} onChange={this.onChange} /> */}
              {/* <input placeholder={placeholder} autoFocus='true' name={fld} value={this.state.tc[fld]} onChange={this.onChange} /> */}
              {/* <input placeholder={placeholder} autoFocus='true' name={fld} value={this.state.tc[fld]} onChange={this.onChange} /> */}
              <input placeholder={placeholder} autoFocus='true' name={fld} value={this.value} onChange={this.onChange} />
              <input type='submit' />
            </form>

          </td>)
        }else{
          return (<td key={fld} onClick={no}>{tc[fld]}</td>)
        }
      })}</tr>)
    })

    const filter_link =
      <div>
        <a href='#' onClick={ e => {e.preventDefault(); store.dispatch({ type: 'TOGGLE_EXPAND'})}}>filters</a> {m} of {n}
      </div>

    const head_and_row =
    <tbody>
      <tr>{head1}{hd}</tr>
      <tr>
        <td>{filter_link}</td>
        {/* <td><Filters field='pbc' tcs={total_tcs} /></td> */}
        {/* <td><Filters field='calc_type' tcs={total_tcs} /></td> */}
        {flds.map(fld => {
          if(['id','ssn','dob','doe'].includes(fld)){ return <td></td>}
          return <td><Filters field={fld} tcs={total_tcs} /></td>})}

      </tr>
      {rows}
    </tbody>

    const hasFilter = fld => {
      if(Array.isArray(offfilter[fld])){
        console.log({fld, length: offfilter[fld].length});
        return offfilter[fld].length > 0
      }
      return false
    }
    const yn = fld => (hasFilter(fld) ? 'yes' : 'no')

    const head_and_row2 =
    <tbody>
      <tr>{head1}{hd}</tr>
      <tr>
        <td>{filter_link}</td>
        {/* <td>{yn('pbc')}</td> */}
        {/* <td>{yn('calc_type')}</td> */}
        {flds.map(fld => { return <td>{yn(fld)}</td>})}

      </tr>
      {rows}
    </tbody>

    if(filters){
      return (
        <div>This is TC {m} of {n}
          <table>
              {head_and_row}
          </table>
          <button onClick={() => {
            this.addSample()
          }} >Add Tc</button>
          <button onClick={() => {
            this.addSample(20)
          }} >Add 20 Tc</button>
        </div>
      )
    } else
      return (
        <div>This is TC {m} of {n}
          <table>
              {head_and_row2}
          </table>
          <button onClick={() => {
            this.addSample()
          }} >Add Tc</button>
          <button onClick={() => {
            this.addSample(20)
          }} >Add 20 Tc</button>
        </div>

    )
  }
}



// const mapStateToProps = (state) => {
//   const tc = state.todos.find(x => x.id === state.editReducer)
//   console.log({tc});
//   return {
//     tc
//   }
// }
// export default connect(mapStateToProps)(TC)


const mapStateToProps = (state) => {
  return  {
    //tcs: state.tcs,
    offfilter: state.offfilter,
    edit_field: state.edit_field,
    filters: state.filters,
  }
}

export default connect(mapStateToProps)(TC)


//export default TC
