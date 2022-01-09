import React from 'react';

function FormDivider() {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="or-container">
                    <hr className="or-hr"/>
                    <div className="or-div">OR</div>
                </div>
            </div>
            <style jsx>
                {`
                  .or-hr {
                    margin-bottom: 0;
                    position: relative;
                    top: 19px;
                    height: 0;
                    border: 0;
                    border-top: 2px solid #e4e6e8;
                  }

                  .or-div {
                    display: inline-block;
                    position: relative;
                    padding: 10px;
                    background-color: #FFF;
                    font-size: 13px;
                  }

                  .or-container {
                    text-align: center;
                    margin: 0;
                    margin-bottom: 10px;
                    clear: both;
                    color: #6a737c;
                    font-variant: small-caps;
                  }
                `}
            </style>
        </div>
    );
}

FormDivider.propTypes = {};

export default FormDivider;