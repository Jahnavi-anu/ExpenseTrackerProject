
import { Link,useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import {AUTH_API} from '../../config.js'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = ()=>{
     const Navigate = useNavigate()
    const [ log, SetLog] = useState(false);

    const [ values , setValues] = useState({
        fullname:"",
        email:"",
        password:"",
    });
    
    const generateError = (err)=> toast.error(err,{
        position:"bottom-right",
    })


    const handleSubmit = async(e)=>{
      e.preventDefault();
      const url = log ? `${AUTH_API}/login` :`${AUTH_API}/register`
      try{
        const {data} = await axios.post(url,{
            ...values,
        },{
            withCredentials:true,
        })
        console.log(data);
         
    if(data.errors)
        {
                        const {email, password} = data.errors;
                        if(email) generateError(email);
                        else if(password) generateError(password);
         }else if(data.created){
                toast.success("Registration successful!", {
        position: "bottom-right",
      });
      Navigate("/");
             
            }
      }catch(err){
        console.log(err);
      }
    }
    

//     console.log("Janu")
    return(
        <>
        {log ?<h1>Login</h1>: <h1>Register</h1>}
    <div className="LoginContainer">
            
     <form onSubmit={handleSubmit}>

        {log ?(
           <>
           <div className="email">
                    <label htmlFor="">Email</label>
                    <input type="email"
                           name="email" 
                           className='einput'
                           onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} 
                            />
            </div>
                 
            <div className="pass">
                    <label htmlFor="">Password</label>
                    <input type="password"
                           name="password"
                           className='pinput'
                           onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} 
                           />
            </div>

            <button className='loginbtn'>Login</button>
             
        </>
            )
             :

            ( <>
                <div className="fullName">
                    <label htmlFor="">Full Name</label>
                    <input type="text"
                           name="fullname"
                     className='finput'
                     onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} 
                     />
            </div>
            <div className="email">
                    <label htmlFor="">Email</label>
                    <input type="email"
                           name="email"
                     className='einput'
                     onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} 
                      />
            </div>
            <div className="pass">
                    <label htmlFor="">Password</label>
                    <input type="password"
                           name="password"
                     className='pinput'
                     onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} 
                       />
            </div>

            <button className='registerbtn'>Register</button>
           
       <div className="loginnavigate">
             <p>Already have an account</p>
             <Link to="/LogIn" onClick={(e)=>{
                e.preventDefault();
                SetLog(true)
              }
                }>LogIn</Link>
       </div>
            </> 
           ) }
           </form>
           <ToastContainer />
        </div>
 
        </>
    )
}

export default LogIn;
