import React from 'react';
import './index.css';

const Navbar = () => {

    return (

        <header id='navbar-container'>
            <div>
                <button>LOGIN</button>
                <button>JOIN</button>
                <button>SEARCH</button>
            </div>
            <ul>
                <li>
                    Switches
                </li>
                <li>
                    Services
                </li>
            </ul>

        </header>
    );
}

export default Navbar;