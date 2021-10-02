import React from "react";
import { Link } from 'react-router-dom';
import './Dashboard.css';
import title_logo from '../../images/title_logo.png';

class SideBar extends React.Component {
    render() { 
        return (
            <div>
                <div className="sidenav">
                    <div>
                    <Link 
                    style={{ textDecoration:'none', border:'none', color:'black'}}
                    to="/dashboard"><img alt="" style={{height:'20px',width:'100'}} src={title_logo}/>
                    </Link>
                    </div>
                    <div style={{marginTop:"20px"}}>
                    <Link 
                    style={{ textDecoration:'none', border:'none', color:'black'}}
                    to="/dashboard/profile">Profile</Link>
                    </div>
                    <div style={{marginTop:"10px"}}>
                    <Link 
                    style={{ textDecoration:'none', border:'none', color:'black'}}
                    to="/dashboard/menu">Menu</Link>
                    </div>
                    <div style={{marginTop:"10px"}}>
                    <Link 
                    style={{ textDecoration:'none', border:'none', color:'black'}}
                    to="/dashboard/orders">Orders</Link>
                    </div>
                </div>
            </div>

        //    <div>
        //        <div style={{ paddingLeft: '45%' }}>
        //             <div className="sidebarItem">
        //                 <Link style={{ borderLeft: '6px solid #5bc5a7',
        //                  color: '#5bc5a7', fontSize: '16px', 
        //                  fontWeight: 'bold', textDecoration: 'none',paddingLeft:'4px' }} 
        //                  to="/home/s/dashboard"> Dashboard
        //                  </Link>
        //             </div>
        //             <div className="sidebarItem">
        //                 <Link style={{ borderLeft: '6px solid #ff652f', 
        //                 color: '#ff652f', fontSize: '16px', fontWeight: 'bold', 
        //                 textDecoration: 'none',paddingLeft:'4px' }} to="/home/s/recentActivities">
        //                 Recent&nbsp;Activities</Link>
        //             </div>
        //             <div className="sidebarItem">
        //                 <Link style={{ borderLeft: '6px solid #5bc5a7', 
        //                 color:'#5bc5a7', fontSize: '16px', fontWeight: 'bold', 
        //                 textDecoration: 'none',paddingLeft:'4px' }} to="/home/s/allGroups">
        //                 All&nbsp;Groups</Link>
        //             </div>
        //             <br />
        //             <hr />
        //         </div>
        //         <div style={{ paddingLeft: '45%', fontSize:'11px' }}>
        //             <div className="sidebarHeading">
        //                 GROUPS
        //             </div>
        //         </div>
        //        </div>
        );
    }
}
 
export default SideBar;
