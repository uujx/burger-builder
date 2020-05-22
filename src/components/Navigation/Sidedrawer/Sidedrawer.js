import React from "react"
import Logo from "../../UI/Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"
import classes from "./Sidedrawer.module.css"
import Aux from "../../../hoc/Aux/Aux"

const Sidedrawer = (props) => {

    const attachedClasses = [classes.Sidedrawer]
    if (props.show) {
        attachedClasses.push(classes.Open)
    } else {
        attachedClasses.push(classes.Close)
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.onCloseSideDrawer} />
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default Sidedrawer
