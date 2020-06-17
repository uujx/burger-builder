import React from 'react'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.module.css'

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.onOpenSideDrawer}/>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
