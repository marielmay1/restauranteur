import React from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import cn from 'classnames';

function Button(props) {
    const buttonProps = Object.assign({}, props);
    const propsToDelete = ['primary', 'social'];

    propsToDelete.map(value => delete buttonProps[value]);

    const label =
        !isEmpty(props.label) && !props.children ? (
            <span>{props.label}</span>
        ) : (
            props.children
        );

    return (
        <div>
            <button
                className={cn(
                    'button',
                    props.primary && 'primary',
                    props.social === 'facebook' && 'primary',
                    props.social === 'github' && 'github',
                    props.social === 'google' && 'google',
                    props.social === 'twitter' && 'twitter'
                )}
                type={props.type || 'button'}
                {...buttonProps}
            >
                {label}
            </button>
            <style jsx>
                {`
                  .button {
                    height: 30px;
                    min-width: 150px;
                    position: relative;
                    border-radius: 3px;
                    margin-right: 18px;
                    line-height: 30px !important;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 14px !important;
                    -webkit-font-smoothing: antialiased;
                    /* > i {
                      margin-right: 13px;
                      font-weight: 600;
                      padding-top: 1px;
                    } */
                  }

                  .button, span {
                    line -height: 30px;
                    font-size: 18px;
                  }

                  .button:focus {
                    outline: 0;
                  }

                  .button:disabled {
                    cursor: not-allowed;
                  }

                  .button:hover::after {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    border-radius: 3px;
                    content: '';
                    opacity: 0.1;
                    background: #FFFFFF;
                  }

                  .primary {
                    background: linear-gradient(315deg, #0097F6 0%, #005EEA 100%);
                    color: white;
                  }

                  .primary:active {
                    box -shadow: inset 1px 1px 3px rgba(0, 0, 0, .15);
                  }

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
        </div>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.any,
    label: PropTypes.string,
    primary: PropTypes.bool,
    type: PropTypes.string,
};

export default Button;