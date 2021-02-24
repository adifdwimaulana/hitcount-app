import React from 'react'

export default function Header(){
    return(
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
                <h1 className="logo mr-auto mb-0">
                    <a href="/"><img src={require('../../../assets/images/logo-hitcount.png')} />&nbsp;Hit Count App</a>
                </h1>

                <nav className="nav-menu d-none d-lg-block">
                    <ul>
                    <li className="active"><a href="/">Home</a></li>
                    <li><a href="#!">About</a></li>
                    <li><a href="#!">Services</a></li>
                    <li><a href="#!">Pricing</a></li>
                    <li><a href="#!">FAQ</a></li>
                    </ul>
                </nav>

                <a href="/login" className="get-started-btn scrollto">Get Started</a>
            </div>
        </header>
    )
}