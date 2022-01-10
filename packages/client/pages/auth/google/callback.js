import React, { useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import Cookie from "js-cookie";
import AppContext from "../../../components/context";

function GoogleAuthCallback() {
    const router = useRouter();
    const location = router.asPath.replace(router.pathname, "");
    const appContext = useContext(AppContext);
    useEffect(() => {
        if (!location) {
            return
        }
        axios({
            method: 'GET',
            url: `http://localhost:1337/auth/google/callback?${location}`,
        })
            .then((res) => {
                Cookie.set("token", res.data.jwt);
                appContext.setUser(res.data.user);
                appContext.setToast({
                    header: 'Logged in Successfully',
                    message: `${res.data.user.username} has logged in successfully!`
                })
                Router.push("/");
            })

    }, [location])

    return (
        <div>

        </div>
    )
}

export default GoogleAuthCallback