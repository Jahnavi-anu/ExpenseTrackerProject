
import ExpenseTrack from "./Frontend/ExpenseTrack/ExpenseTrack.jsx";
import Graph from "./Frontend/Graph/Graph.jsx"
import Navbar from "./Frontend/Navbar/Navbar.jsx"
// import { useEffect } from "react";
import {useCookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import expenseStore from "./Frontend/stores/ExpenseStore.js";
import {observer}  from "mobx-react-lite";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const API_BASE = 'http://localhost:3000/api/Expense';

import { useState,useEffect } from "react";
const Home = observer(()=>{
   const navigate = useNavigate();
  const [cookies , setCookie, removeCookie] = useCookies([]);
  useEffect(()=>{
      const VerifyUser = async()=>
      {
         if(!cookies.jwt){
            navigate('/login');
         }else{
              const {data} = await axios.post("http://localhost:3000",{}
               ,{withCredentials:true}) 
               if(!data.status){
             removeCookie('jwt');
             navigate('/login')
        }else{
         toast(`Hi ${data.user} `,{theme:"dark"});
        }  
        }
        
    }
        
         VerifyUser(); 
    
  },[cookies,navigate,removeCookie])
     const [transPop , settransPop] = useState(false);
     const { Expense, Income, NetBalance,  formState ,spendingData } = expenseStore;
console.log("Home fine");
  useEffect(()=>{
       expenseStore.fetchTransactions();
        
      },[])

  function transChange()
  {
     settransPop(prev => !prev);
  }
    return(
        <>
        <div className="nav-section">
                 <Navbar Expense={Expense}
                         Income={Income}
                         NetBalance={NetBalance}
                  />
        </div>
        <div className="MainContentSec">
                 <ExpenseTrack settransPop={transChange} 
                                transPop={transPop} 
                                formstate={formState} 
                                 store={expenseStore}
                                  />
                 <Graph    spendingData={spendingData} />
        </div>
       <ToastContainer />
       </>  
    )
})
export default Home;