import React, {useEffect, useState} from "react"
// import { Button, Toast, ToastBody } from 'reactstrap';
import {Toast, ToastContainer, Button} from 'react-bootstrap';

/**
 * <Toast isOpen={show} style={{backgroundColor: props.color || 'green' ,width:'280px',height:'150px'}}>
 *             <ToastBody >
 *                 <h6 style={{color:'white',display:'inline',marginRight:'20px'}}>{props.message}</h6>
 *                 <Button onClick={()=>{setShow(false)}}>X</Button>
 *             </ToastBody>
 *         </Toast>

 */
const ToastNew = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // console.log("use");
        setShow(props.show);
        let timeout = setTimeout(() => {
            setShow(false)
        }, 15000)

        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <ToastContainer position='top-center'>
            <Toast
                show={show}
                onClose={() => setShow(false)}
                style={{zIndex: '99'}}
                bg='info'
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.header}</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
export default ToastNew;