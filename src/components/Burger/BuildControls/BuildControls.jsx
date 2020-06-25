import React from 'react'
import { useSelector } from 'react-redux'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' }
]

const BuildControls = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          add={() => props.addIngredient(ctrl.type)}
          remove={() => props.removeIngredient(ctrl.type)}
          disable={props.disableInfo[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={props.order}
        disabled={!props.purchasable}>
        {isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
      </button>
    </div>
  )
}

export default BuildControls
