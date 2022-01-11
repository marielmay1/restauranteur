import React, {useState, useContext} from "react";
import {FormGroup, FormFeedback, Label, Input} from "reactstrap";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CardSection from "./cardSection";
import AppContext from "./context";
import Cookies from "js-cookie";
import config from "./config"

function CheckoutForm() {
    const [data, setData] = useState({
        address: "",
        isValidAddress: null,
        isInvalidAddress: null,
        city: "",
        isValidCity: null,
        isInvalidCity: null,
        state: "",
        isValidState: null,
        isInvalidState: null,
        stripe_id: "",
    });
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const appContext = useContext(AppContext);

    const allValid = () => data.isValidAddress && data.isValidCity && data.isValidState

    async function submitOrder() {
        // does user have items in their cart
        if(appContext.cart.total === 0) {
            alert("You cannot complete an order with an empty card.")
            return
        }
        // is the form filled out correctly
        if(!allValid()) {
            setData({
                ...data,
                isInvalidState: isValid(data.state) ? null : true,
                isInvalidCity: isValid(data.city) ? null : true,
                isInvalidAddress: isValid(data.address) ? null : true
            })
            return
        }

        const cardElement = elements.getElement(CardElement);

        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get("token");
        const response = await fetch(`${config.api.host}/orders`, {
            method: "POST",
            headers: userToken && {Authorization: `Bearer ${userToken}`},
            body: JSON.stringify({
                amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
                dishes: appContext.cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                token: token.token.id,
            }),
        });

        if (!response.ok) {
            setError(response.statusText);
            return
        }
        appContext.setToast(false)
        appContext.setToast({
            header: 'Order Complete!',
            message: 'Your order is now complete.'
        })
        appContext.resetCart()
        await Router.push('/')
    }
    const isValid = (text) => text != null && text !== ''

    const onAddressChange = (e) => {
        const valid = isValid(e.target.value)
        if(valid) {
            setData({
                ...data,
                isValidAddress: true,
                isInvalidAddress: null,
                address: e.target.value
            })
        } else {
            setData({
                ...data,
                address: "",
                isValidAddress: null,
                isInvalidAddress: true
            })
        }
    }

    const onCityChange = (e) => {
        const valid = isValid(e.target.value)
        if(valid) {
            setData({
                ...data,
                isValidCity: true,
                isInvalidCity: null,
                city: e.target.value
            })
        } else {
            setData({
                ...data,
                isValidCity: null,
                isInvalidCity: true,
                city: ""
            })
        }
    }

    const onStateChange = (e) => {
        const valid = isValid(e.target.value)
        if(valid) {
            setData({
                ...data,
                isValidState: true,
                isInvalidState: null,
                state: e.target.value
            })
        } else {
            setData({
                ...data,
                isValidState: null,
                isInvalidState: true,
                city: ""
            })
        }
    }

    return (
        <div className="paper">
            <h5>Your information:</h5>
            <hr/>
            <FormGroup style={{display: "flex"}}>
                <div style={{flex: "0.90", marginRight: 10}}>
                    <Label>Address</Label>
                    <Input
                        name="address"
                        valid={data.isValidAddress}
                        invalid={data.isInvalidAddress}
                        onChange={onAddressChange}
                    />
                    {data.isInvalidAddress ? <FormFeedback>Address cannot be empty</FormFeedback> : ""}
                </div>
            </FormGroup>
            <FormGroup style={{display: "flex"}}>
                <div style={{flex: "0.65", marginRight: "6%"}}>
                    <Label>City</Label>
                    <Input
                        name="city"
                        valid={data.isValidCity}
                        invalid={data.isInvalidCity}
                        onChange={onCityChange}/>
                    {data.isInvalidCity ? <FormFeedback>City cannot be empty</FormFeedback> : ""}
                </div>
                <div style={{flex: "0.25", marginRight: 0}}>
                    <Label>State</Label>
                    <Input
                        name="state"
                        valid={data.isValidState}
                        invalid={data.isInvalidState}
                        onChange={onStateChange}/>
                    {data.isInvalidState ? <FormFeedback>State cannot be empty</FormFeedback> : ""}
                </div>
            </FormGroup>
            <CardSection data={data} stripeError={error} submitOrder={submitOrder}/>
            <style jsx global>
                {`
                  .paper {
                    border: 1px solid lightgray;
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                    height: 550px;
                    padding: 30px;
                    background: #fff;
                    border-radius: 6px;
                    margin-top: 90px;
                  }

                  .form-half {
                    flex: 0.5;
                  }

                  * {
                    box-sizing: border-box;
                  }

                  body,
                  html {
                    background-color: #f6f9fc;
                    font-size: 18px;
                    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                  }

                  h1 {
                    color: #32325d;
                    font-weight: 400;
                    line-height: 50px;
                    font-size: 40px;
                    margin: 20px 0;
                    padding: 0;
                  }

                  .Checkout {
                    margin: 0 auto;
                    max-width: 800px;
                    box-sizing: border-box;
                    padding: 0 5px;
                  }

                  label {
                    color: #6b7c93;
                    font-weight: 300;
                    letter-spacing: 0.025em;
                  }

                  button {
                    white-space: nowrap;
                    border: 0;
                    outline: 0;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                    0 1px 3px rgba(0, 0, 0, 0.08);
                    color: #fff;
                    border-radius: 4px;
                    font-size: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    background-color: #6772e5;
                    text-decoration: none;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                    margin-top: 10px;
                  }

                  form {
                    margin-bottom: 40px;
                    padding-bottom: 40px;
                    border-bottom: 3px solid #e6ebf1;
                  }

                  button:hover {
                    color: #fff;
                    cursor: pointer;
                    background-color: #7795f8;
                    transform: translateY(-1px);
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                    0 3px 6px rgba(0, 0, 0, 0.08);
                  }

                  input,
                  .StripeElement {
                    display: block;
                    background-color: #f8f9fa !important;
                    margin: 10px 0 20px 0;
                    max-width: 500px;
                    padding: 10px 14px;
                    font-size: 1em;
                    font-family: "Source Code Pro", monospace;
                    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                    border: 0;
                    outline: 0;
                    border-radius: 4px;
                    background: white;
                  }

                  input::placeholder {
                    color: #aab7c4;
                  }

                  input:focus,
                  .StripeElement--focus {
                    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                    rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                  }

                  .StripeElement.IdealBankElement,
                  .StripeElement.PaymentRequestButton {
                    padding: 0;
                  }
                `}
            </style>
        </div>
    );
}

export default CheckoutForm;
