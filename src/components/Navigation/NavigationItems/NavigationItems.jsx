import React from 'react'
import { useSelector } from 'react-redux'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>

      {isAuthenticated ? (
        <NavigationItem link='/orders'>Orders</NavigationItem>
      ) : null}

      {isAuthenticated ? (
        <NavigationItem link='/logout'>Logout</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Login</NavigationItem>
      )}
    </ul>
  )
}

export default NavigationItems
