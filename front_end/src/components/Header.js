import React from "react";
import Navigation from "./Navigation";
import SecondLogo from './HomePage/Headeredit.png'
import DarkLogo from './HomePage/HeadereditDark.png'


function Header() {
    return(
        <section id="Header">
            
            <img src={SecondLogo} />
            <Navigation />

        </section>
    )
}

export default Header;