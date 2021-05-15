import React, { useState, useEffect } from "react";

function Login(props) {
    // if logged in, present join game buttons otherwise display login form
    // when join game button is pressed, display waiting for opponent pop up (how will we know when other player)
    return (
        <div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input onChange={props.handleInputChange} name="email" type="text" className="form-control" placeholder="username" />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input onChange={props.handleInputChange}  name="password" type="password" className="form-control" placeholder="password" />
                                    </div>
                                    <div className="form-group">
                                        <input onClick={props.handleFormSubmit} type="submit" value="Login" className="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Not Registered? Sign Up Here</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" onChange={props.handleInputChange} name="email" className="form-control" placeholder="username" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" onChange={props.handleInputChange}  name="password" className="form-control" placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <input onClick={props.handleFormSubmit} type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default Login;
