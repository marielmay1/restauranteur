import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

function SocialLink({provider}) {
    return (
        <div>
            <a href={`http://localhost:1337/connect/${provider}`} className="link">
                <Button type="button" social={provider}>
                    <i className={`fab fa-${provider}`}/>
                    {provider}
                </Button>
            </a>
            <style jsx>
                {`
                  .link, button {
                    margin-bottom: 5px;
                  }
                `}
            </style>
        </div>
    );
}

SocialLink.propTypes = {
    provider: PropTypes.string.isRequired,
};

export default SocialLink;