import React from 'react'

const HelloWorld = ({name, button_value, onClick}) => {

  const xxx = (name, button_value) => console.log(name + ' ' + button_value)

  return (
 <div>
   <p>{`Hi ${name}`}
     <input type='button' value={button_value} onClick={e => xxx(name,button_value)}/>
   </p>
 </div>
)};

HelloWorld.propTypes = {
  name: React.PropTypes.string.isRequired,
  button_value: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

HelloWorld.defaultProps = {
  name: 'Brian B',
  button_value: 'foo',
  onClick: (e) => console.log('hello ' + e.target.value)
}

export default HelloWorld
