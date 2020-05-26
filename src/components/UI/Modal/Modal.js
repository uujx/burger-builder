import React, { useEffect } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {

    useEffect(() => {
        console.log("[Modal] useEffect")
    })

    return (
        <>
            <Backdrop show={props.show} clicked={props.cancel}/>
            <div 
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? 1 : 0
                }}
                className={classes.Modal}
            >
                {props.children}
            </div>
        </>
    )
}

// re-render the modal only when the show props changes
const areEqual = (prevProps, nextProps) => {
    if (nextProps.show !== prevProps.show || nextProps.children !== prevProps.children) {
        return false
    } else {
        return true;
    }
}

export default React.memo(Modal, areEqual)
