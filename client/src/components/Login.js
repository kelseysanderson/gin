import React, { useState, useEffect } from "react";

function Login(props) {
    // if logged in, present join game buttons otherwise display login form
    // when join game button is pressed, display waiting for opponent pop up (how will we know when other player)
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center h-10">
                    <div className="col-12">
                        <h2 id="play-now-text">Play Online Now!</h2>
                        </div>
                </div>
                <div className="row justify-content-center h-50">
                    <div className="col-12 col-md-6 d-flex justify-content-around align-self-center">
                        <div className="card login-card">
                            <div className="card-header login-header">
                                <h3 className="white-text" id="sign-in-text">Sign In</h3>
                            </div>
                            <div className="card-body login-body">
                                <form>
                                    <div className="input-group form-group">
                                        <input onChange={props.handleInputChange} name="email" type="text" className="form-control " placeholder="username" />
                                    </div>
                                    <div className="input-group form-group">
                                        <input onChange={props.handleInputChange} name="password" type="password" className="form-control" placeholder="password" />
                                    </div>
                                    <div className="form-group">
                                        <input onClick={props.handleLoginSubmit} type="submit" value="Login" className="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-around align-self-center">
                    <div className="card login-card">
                        <div className="card-header login-header">
                            <h3 className="white-text">Not Registered?</h3>
                            <h3 className="white-text">Sign Up</h3>
                        </div>
                        <div className="card-body login-body">
                            <form>
                                <div className="input-group form-group">

                                    <input type="text" onChange={props.handleInputChange} name="email" className="form-control" placeholder="username" />
                                </div>
                                <div className="input-group form-group">

                                    <input type="password" onChange={props.handleInputChange} name="password" className="form-control" placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <input onClick={props.handleSignupSubmit} type="submit" value="Sign up" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default Login;
