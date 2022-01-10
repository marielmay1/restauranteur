import React, {useContext} from "react";
import {Row, Col} from "reactstrap";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import Cart from "../components/cart";

function Checkout() {
    const {isAuthenticated} = useContext(AppContext);
    const stripePromise = loadStripe(
        'pk_test_51K4doTEsYJ1Hg2wHU92ZhPNARSY8bNBw8dvdt6RcSgVO865z2l8hNy0Xu2oQDNnNFpo0ZPAVSHznXrR3BQkDiwQO00ssTLSIHa'
    );

    return (
        <div>
            <h1 className="text-center">Checkout</h1>
            <Row>
                <Col style={{paddingRight: 0}} sm={{size: 3, order: 1, offset: 2}}>
                    <Cart isAuthenticated={isAuthenticated}/>
                </Col>
                <Col style={{paddingLeft: 5}} sm={{size: 6, order: 2}}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </Col>
            </Row>
        </div>
    );
}

export default Checkout;
