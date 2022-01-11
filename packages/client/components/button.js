import React from 'react';
import {isEmpty} from 'lodash';
import cn from 'classnames';
import GoogleSVG from "./svg/google";
import {
    Container,
    Row,
    Button
} from "reactstrap";

function SocialButton(props) {
    const label = !isEmpty(props.label) && !props.children ? (<span>{props.label}</span>) : (props.children);
    return (
        <Container>
            <Row>
                <Button
                    className={cn(
                        props.primary && 'primary',
                        props.social === 'facebook' && 'primary',
                        props.social === 'github' && 'github',
                        props.social === 'google' && 'google',
                        props.social === 'twitter' && 'twitter'
                    )}
                >
                    {props.social === 'google' ? <GoogleSVG/> : ""}
                    {label}
                </Button>
                <style jsx>
                    {`
                      .github {
                        background: #000;
                        color: white;
                      }

                      .google {
                        border: 1px solid #d6d9dc;
                        color: #535a60;
                      }

                      .twitter {
                        background: #00aced;
                        color: #fff;
                      }
                    `}
                </style>
            </Row>
        </Container>
    );
}

export default SocialButton;

