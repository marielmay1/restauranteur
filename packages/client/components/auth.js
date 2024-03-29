import {useEffect} from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import config from "./config"

//register a new user
export const registerUser = (username, email, password) => {
    //prevent function from being ran on the server
    if (typeof window === "undefined") {
        return;
    }
    return new Promise((resolve, reject) => {
        axios
            .post(`${config.api.host}/auth/local/register`, {username, email, password})
            .then((res) => {
                //set token response from Strapi for server validation
                Cookie.set("token", res.data.jwt);

                //resolve the promise to set loading to false in SignUp form
                resolve(res);
                //redirect back to home page for restaurant selection
                Router.push("/");
            })
            .catch((error) => {
                //reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

export const login = (identifier, password) => {
    //prevent function from being ran on the server
    if (typeof window === "undefined") {
        return;
    }

    return new Promise((resolve, reject) => {
        axios
            .post(`${config.api.host}/auth/local/`, {identifier, password})
            .then((res) => {
                //set token response from Strapi for server validation
                Cookie.set("token", res.data.jwt);

                //resolve the promise to set loading to false in SignUp form
                resolve(res);
                //redirect back to home page for restaurance selection
                Router.push("/");
            })
            .catch((error) => {
                //reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

export const logout = () => {
    console.log("logging out...")
    //remove token and user cookie
    Cookie.remove("token");
    delete window.__user;
    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now());
    //redirect to the home page
    Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
    const Wrapper = (props) => {
        const syncLogout = (event) => {
            if (event.key === "logout") {
                Router.push("/login");
            }
        };

        useEffect(() => {
            window.addEventListener("storage", syncLogout);

            return () => {
                window.removeEventListener("storage", syncLogout);
                window.localStorage.removeItem("logout");
            };
        }, []);

        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        Wrapper.getInitialProps = Component.getInitialProps;
    }

    return Wrapper;
};
