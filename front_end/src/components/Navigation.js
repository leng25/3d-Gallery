/*Component for the navigation bar */
import React from "react";
import { Link } from "react-router-dom";
import HomeLogo from './Nav_Icons/HomeLogo.png'
import TrendingLogo from './Nav_Icons/TrendingLogo.png'
import NotiLogo from './Nav_Icons/NotificationsLogo.png'
import FriendLogo from './Nav_Icons/FriendsListLogo.png'
import SettingLogo from './Nav_Icons/SettingsLogo.png'




function Navigation() {
    return(
    <nav id="Navigation">
        <ul>
            <Link to="/Home"><li><img src={HomeLogo} /><h6 id="NavNames">Home</h6></li></Link>
            <Link to ="/Trending"><li><img src={TrendingLogo} /><h6 id="NavNames">Trending</h6></li></Link>
            <Link to ="/Noti"><li><img src={NotiLogo} /><h6 id="NavNames">Notify</h6></li></Link>
            <Link to ="/FriendsList"><li><img src={FriendLogo} /><h6 id="NavNames">Friends</h6></li></Link>
            <Link to ="/Settings"><li><img src={SettingLogo} /><h6 id="NavNames">Settings</h6></li></Link>
        </ul>
    </nav>
    )}

export default Navigation;