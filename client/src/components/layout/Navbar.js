import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar sticky-top navbar-toggleable-md navbar-inverse bg-primary">
                <button className="navbar-toggler navbar-toggler-right"
                        type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand" href="#">We Pick Heroes</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    <span className='navbar-text'>Test</span>
                </div>
            </nav>
        )
    }
}

export default Navbar
