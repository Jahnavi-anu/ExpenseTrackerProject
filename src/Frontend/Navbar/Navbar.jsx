import './Navbar.css'
import LogIn from '../Register/LogIn';
import { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
const Navbar = ()=>{
    const [register , Setregister] = useState(false);
    const location = useLocation();

    useEffect(() => {
        Setregister(false);
    },[location]);

        return(
            <>
            <div className="navcontainer">
                <div className="LogoBar">
                    <div className="Logo">
                        <i className="fa-solid fa-sack-dollar dollar-icon"></i>
                    </div>
                    <div className="LogoTitle">
                        Expense Tracker
                    </div>
                </div>
                <div className="Navigations">
                    <ul>
                       <li><Link to="/" >Home</Link></li> 
                        <li><Link to="/analytics" >Analytics</Link></li> 
                         <li><Link to="/profile" >Profile</Link></li> 
                         <li onClick={()=>Setregister(true)} className='reg'>Register</li> 
                    </ul>
                </div>

                 
                { register ? 
                <div className="RegisterSection" onClick={() => Setregister(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                         <LogIn />
                    </div>
                     
                </div>: null}
            </div>
            </>
        );
};
export default Navbar;