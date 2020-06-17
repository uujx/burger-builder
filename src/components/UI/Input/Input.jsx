import React from 'react'
import styles from './Input.module.css'


const Input = (props) => {
  let input = null

  let classes = [styles.Input]
  if (props.touched && !props.valid) {
    classes.push(styles.Invalid)
  }

  switch (props.eleType) {
    case 'input':
      input = (
        <input
          className={classes.join(' ')}
          value={props.value}
          type={props.config.type}
          name={props.config.name}
          placeholder={props.config.placeholder}
          onChange={props.changed}
        />
      )
      break

    case 'select':
      input = (
        <select name={props.config.name} className={classes.join(' ')}>
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break

    default:
      input = <input />
      break
  }

  return (
    <div className={styles.Container}>
      <label></label>
      {input}
    </div>
  )
}

export default Input
