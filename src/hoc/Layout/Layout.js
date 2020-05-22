import React, { useState } from "react"
import Aux from "../Aux/Aux"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer"
import classes from "./Layout.module.css"

function Layout(props) {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const onToggleSideDrawer = () => {
        setShowSideDrawer(prevState => !prevState)
    }

    return (
        <Aux>
            <Sidedrawer show={showSideDrawer} onCloseSideDrawer={onToggleSideDrawer} />
            <Toolbar onOpenSideDrawer={onToggleSideDrawer} />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    )
}

export default Layout
