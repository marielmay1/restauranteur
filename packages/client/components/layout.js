import React, {useContext} from "react";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
    Container,
    Nav,
    NavItem,
    Dropdown
} from "react-bootstrap";
import AppContext from "./context";
import Toast from "./toast";
import {logout} from "./auth";

const Layout = (props) => {
    const title = "Restauranteur";
    const {user, setUser, toast, setToast} = useContext(AppContext);
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
                <script src="https://js.stripe.com/v3"/>
            </Head>
            <header>
                <style jsx>
                    {`
                      a {
                        color: white;
                      }

                      h5 {
                        color: white;
                        padding-top: 11px;
                      }
                    `}
                </style>
                <Nav className="navbar navbar-dark bg-dark">
                    <NavItem>
                        <Link href="/">
                            <a style={{marginLeft: "10px"}} className="navbar-brand">Home</a>
                        </Link>
                    </NavItem>
                    <NavItem className="ml-auto">
                        {user ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    {user.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            logout();
                                            setUser(null);
                                            setToast(false);
                                        }}
                                    >Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">Anonymous</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => Router.push("/register")}> Sign Up
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => Router.push("/login")}> Sign In
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </NavItem>
                </Nav>
            </header>
            <div>
                {toast ? <Toast
                    header={toast.header}
                    message={toast.message}
                    show={toast}
                /> : ""}
            </div>
            <Container>{props.children}</Container>
        </div>
    );
};

export default Layout;