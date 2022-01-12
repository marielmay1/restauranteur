import {useContext, useState} from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApolloProvider, ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import config from "../components/config";

function MyApp(props) {
    console.log('STRAPI_API_HOST:', process.env.NEXT_PUBLIC_STRAPI_API_HOST)
    let {isAuthenticated, cart, resetCart, addItem, removeItem, user, setUser, toast, setToast} = useContext(AppContext)
    const [userState, setUserState] = useState({
        user, isAuthenticated
    });
    const [toastState, setToastState] = useState({
        toast
    });
    const [cartState, setCartState] = useState({cart});
    const {Component, pageProps} = props;

    setUser = (res) => {
        setUserState({
            cart,
            isAuthenticated: res?.user?.confirmed || false,
            user: res
        })
    };
    setToast = (message) => {
        setToastState({toast: message})
    }

    let newCart = null;

    addItem = (item) => {
        let {items} = cartState.cart;
        //check for item already in cart
        //if not in cart, add item if item is found increase quanity ++
        let foundItem = true;
        if (items.length > 0) {
            foundItem = items.find((i) => i.id === item.id);

            if (!foundItem) foundItem = false;
        } else {
            foundItem = false;
        }
        console.log(`Found Item value: ${JSON.stringify(foundItem)}`)
        if (!foundItem) {
            let temp = JSON.parse(JSON.stringify(item));
            temp.quantity = 1;
            newCart = {
                items: [...cartState.cart.items, temp],
                total: cartState.cart.total + item.price,
            }
            console.log(`Total items: ${JSON.stringify(newCart)}`)
        } else {
            console.log(`Total so far:  ${cartState.cart.total}`)
            newCart = {
                items: items.map((item) => {
                    if (item.id === foundItem.id) {
                        return Object.assign({}, item, {quantity: item.quantity + 1})
                    } else {
                        return item;
                    }
                }),
                total: cartState.cart.total + item.price,
            }
        }
        setCartState({cart: newCart});  // problem is this is not updated yet
        console.log(`state reset to cart:${JSON.stringify(cartState)}`)
    };
    removeItem = (item) => {
        let {items} = cartState.cart;
        //check for item already in cart
        const foundItem = items.find((i) => i.id === item.id);
        if (foundItem.quantity > 1) {
            var newCart = {
                items: items.map((item) => {
                    if (item.id === foundItem.id) {
                        return Object.assign({}, item, {quantity: item.quantity - 1})
                    } else {
                        return item;
                    }
                }),
                total: cartState.cart.total - item.price,
            }
            //console.log(`NewCart after remove: ${JSON.stringify(newCart)}`)
        } else { // only 1 in the cart so remove the whole item
            console.log(`Try remove item ${JSON.stringify(foundItem)}`)
            const index = items.findIndex((i) => i.id === foundItem.id);
            items.splice(index, 1);
            var newCart = {items: items, total: cartState.cart.total - item.price}
        }
        setCartState({cart: newCart});
    }
    resetCart = () => {
        setCartState({
            cart: {
                items: [],
                total: 0
            }
        })
    }
    const link = new HttpLink({uri: `${config.api.host}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link, cache});
    return (
        <AppContext.Provider value={{
            cart: cartState.cart,
            isAuthenticated: userState.isAuthenticated,
            user: userState.user,
            toast: toastState.toast,
            addItem,
            removeItem,
            setUser,
            setToast,
            resetCart
        }}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
            </Head>
            <Layout>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Layout>
        </AppContext.Provider>
    );
}

export default MyApp;
