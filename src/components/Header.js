//React Library
import { useContext, useState } from 'react';
//Icons
import { IoMdNotifications } from 'react-icons/io';
import { SiFacebook, SiFacebookgaming, SiMessenger } from 'react-icons/si';
import { CgMenuGridO } from 'react-icons/cg';
import { MdHome, MdOutlineOndemandVideo, MdOutlineStorefront, MdAccountCircle, MdGroups, MdOutlineSearch, MdMenu, MdSettings, MdHelp, MdDarkMode, MdFeedback } from 'react-icons/md';
import { GoSignOut } from 'react-icons/go';
//User-Components
import '../styles/Header.css'
import { myThemeContext } from '../utils/context/ThemeContext';
import { useAuth } from '../utils/context/AuthContext';

export default function Header() {

    //State Variables
    const { myState, myDispatch } = useContext(myThemeContext);
    const [isAccountMenuModalOpen, setIsAccountMenuModalOpen] = useState(false);
    //Context
    const { user, logout } = useAuth();
    //Menu Link Variables    
    const menuCenter = [{ name: 'Home', icon: <MdHome className="headerCenterIcons" /> }, { name: 'Watch', icon: <MdOutlineOndemandVideo className="headerCenterIcons" /> }, { name: 'Marketplace', icon: <MdOutlineStorefront className="headerCenterIcons" /> }, { name: 'People', icon: <MdGroups className="headerCenterIcons" /> }, { name: 'Gaming', icon: <SiFacebookgaming className="headerCenterIcons" /> }, { name: 'LeftBarMenu', icon: <MdMenu className="headerCenterIcons" /> }];
    const menuRight = [{ name: 'Menu', icon: <CgMenuGridO className="headerRightIcons" /> }, { name: 'Messenger', icon: <SiMessenger className="headerRightIcons" /> }, { name: 'Notifications', icon: <IoMdNotifications className="headerRightIcons" /> }, { name: 'Account', icon: <MdAccountCircle className="headerRightIcons" /> }];
    const menuAccount = [{ name: 'Settings & Privacy', icon: <MdSettings className="accountMenuIcon" /> }, { name: 'Help & Support', icon: <MdHelp className="accountMenuIcon" /> }, { name: 'Display & accessibility', icon: <MdDarkMode className="accountMenuIcon" /> }, { name: 'Give Feeback', icon: <MdFeedback className="accountMenuIcon" /> }, { name: 'Log Out', icon: <GoSignOut className="accountMenuIcon" /> }];

    return (
        <>
            <div className={`headerDiv flexDisplay  ${myState.headerStyle}`} >
                {/*Logo and Search Bar*/}
                <div className="headerLeftDiv flexDisplay">
                    <SiFacebook className="headerLogo" />
                    <input className={`headerSearch  ${myState.bodyStyle}`} placeholder="Search Facebook" />
                    <MdOutlineSearch className={`headerSearchIcon  ${myState.bodyStyle}`} />
                </div>
                {/*Header Center Icons*/}
                <div className="headerCenterDiv flexDisplay">
                    {
                        menuCenter.map((menu, index) => {
                            return <span key={index} className={"headerCenterIconDivOf"+menu.name} title={menu.name}>{menu.icon}</span>
                        })
                    }
                </div>
                {/*Header Right Icons*/}
                <div className="headerRightDiv flexDisplay">
                    {
                        menuRight.map((menu, index) => {
                            return <span
                                key={index}
                                onClick={() => { menu.name === 'Account' && setIsAccountMenuModalOpen(!isAccountMenuModalOpen);}}
                                className={"headerRightIconDivOf" + menu.name}
                                title={menu.name}>{menu.icon}
                            </span>
                        })
                    }
                </div>
                {/*More Opions Menu [DarkMode and Logout Buttons]*/}
                {
                    isAccountMenuModalOpen ?
                    <div className={`accountMenuDiv ${myState.postStyle}`} >
                        <div tabIndex="0" className="accountMenuSubDiv flexDisplay">
                            <MdAccountCircle className="accountMenuIcon" />
                            {user.displayName}
                        </div><hr /><br/>
                        {
                            menuAccount.map((item,index) => { 
                                return (
                                    <div tabIndex="0" key={"accountMenu" + index} className="accountMenuSubDiv flexDisplay"
                                        onClick={() => {
                                            item.name === 'Display & accessibility' &&
                                                myState.isDark ?
                                                myDispatch({ type: "LIGHTMODE" }) :
                                                myDispatch({ type: "DARKMODE" });
                                            item.name === 'Log Out' && logout();
                                        }}
                                        onKeyDown={(e) => {
                                            (e.key === 'Enter') &&
                                            item.name === 'Display & accessibility' &&
                                                myState.isDark ?
                                                myDispatch({ type: "LIGHTMODE" }) :
                                                myDispatch({ type: "DARKMODE" });
                                            item.name === 'Log Out' && logout();
                                        }}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                        <div className="footer">
                            <small>Privacy &bull; Terms &bull; Cookies
                                Advertising &bull; Ad choices <br />
                                Facebook &copy; 2022</small>
                        </div>
                    </div> : null
                }
            </div>
        </>
    );
}
