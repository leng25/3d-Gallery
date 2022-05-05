/* Component that sets the routes for each page */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../index.css'
import App from "../App";
import Login from "./Login";
import Home from "./Home"
import HomePage from './HomePage/HomePage';
import Settings from './Settings';
import CreateAccount from "./CreateAccount";
import FriendsList from "./FriendsList";
import Trending from "./Trending";
import Noti from "./Notifications";

function Display() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/block" element={<App/>} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Settings' element={<Settings />} />
                <Route path='/CreateAccount' element={<CreateAccount />} />
                <Route path='/FriendsList' element={<FriendsList />} />
                <Route path='/Trending' element={<Trending />} />
                <Route path='/Noti' element={<Noti />} />
            </Routes>
        </Router>
    )
}

export default Display;