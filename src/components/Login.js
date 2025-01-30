import React from 'react';

export default function Login() {
    return (
        <div className="Login">
            <h2 className="Login--disclaimer">
                <img className="Login--disclaimer-logo" src="./images/error.svg" />
                <h2 className="Login--disclaimer-text">
                    Proof of concept. Not meant for real life use. Data is deleted every day. Do not submit sensitive information.
                </h2>
            </h2>
            <div className="Login--btn-container">
                <img className="Login--btn-img" src="./images/user.png" />
                <button className="Login--btn">Guest mode</button>
            </div>

        </div>
    )
}