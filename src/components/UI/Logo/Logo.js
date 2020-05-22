import React from 'react'
import burgerLogo from '../../../assets/images/logo.png'

import classes from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={classes.Container} style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger Logo" />
        </div>
    )
}

export default Logo
