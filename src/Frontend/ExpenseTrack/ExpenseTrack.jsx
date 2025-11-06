
import './ExpenseTrack.css'
import Greendot from '../../assets/image.png'
import Reddot from '../../assets/rec.png'
import {observer}  from "mobx-react-lite";
const API_BASE = 'http://localhost:3000/api/Expense';
const ExpenseTrack = observer(({store, settransPop, transPop})=>{
     
   //   console.log(formstate);
   //   console.log(transPop);
   
      console.log(`Amount value ${store.NetBalance}`);
     const handleSubmit = async(formData)=>{
         //  event.preventDefault();
         //  const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries());
     if (!data.amt || !data.transtitle || !data.type) {
         console.log("Amount is empty!");
         return;
       }
          data.amt = Number(data.amt);
          data.date = new Date(data.date);
          try{
              await store.addExpense(data);
            settransPop(false);
          }catch(err){
            console.error('Error saving transcation',err);
          }
     }
    return(
          <>
         <div className="Expense">
            
             <div className="BalanceViewer">
                
                <h2>Total Balance</h2>
                
                <div className="BalanceDisplay">
                    <h1>₹{Math.abs(store.NetBalance)}</h1> 
                </div>

               <div className="income-expense">
                     <div className="income">
                        <img src={Greendot} alt="dot icon" className="dotIcon" />
                           <p>Income: ₹{store.Income} </p>
                     </div>
                     <div className="expense">
                        <img src={Reddot} alt="dot icon" className="dotIcon" />
                           <p>Expense: ₹{store.Expense} </p>
                     </div>
               </div>

             </div>
             <div className="addtrans">

                <button className="transaddbtn" onClick={settransPop}> + Add Transcation</button>
               
               {transPop ? <div className="transacCont">
                      <div className="HeadTrans">
                        
                         <h1>Add Transcation</h1>
                         <i className="fa-solid fa-xmark popcross" onClick={() => settransPop(prev => !prev)}></i>
                         
                      </div>
                       
                         <form action={handleSubmit}>
                              <div className="transContainer">
                                          <label htmlFor="">Transcation Title</label>
                                          <input type="text" name="transtitle" className='inputtext'/>
                                          <label htmlFor="">Amount</label>
                                          <input type="text" name="amt" className='inputtext' />
                                          <label htmlFor="">Type</label>
                                            <div className="typeselection">
                                                    <label>
                                          <input 
                                                 className='inputtype'
                                                 type="radio" 
                                                 name="type"
                                                 value="income"    
                                                    />
                                               Income     
                                                    </label>
                                                    <label>
                                          <input type="radio" 
                                                 name="type"
                                                 value="expense"
                                                   className='inputtype'
                                                    />
                                               Expense    
                                                    </label>
                                            </div>
                                          <div className="CategorySelect">
                                                  <label htmlFor="">Category</label>
                                                  <select  id="" className='inputcategory' name="category">
                                                  <option value="Food"> Food</option>
                                                  <option value="Travel"> Travel</option>
                                                  <option value="Bill"> Bill</option>
                                                   <option value="Shopping">Shopping</option>
                                             </select>
                                             <label htmlFor="Date">Date</label>
                                             <input type="date" className='Datafield' name="date" />
                                           </div>
                          <div className="VerifySection">
                               <button type="button" className='Canceltrans' onClick={()=> settransPop(prev => !prev)}>Cancel</button>
                                <button type="submit" className='Addtrans'>Add</button>
                          </div>
                              </div>
                          
                         </form>
                </div>:null}

             </div>

                <div className="Transcation-List">
                      {
                         store.formState.map((data)=>(
                           
                            <div className='transBars'>
                                        
                                      <div className="Transtitle">
                                          <div className='Transtitle-sec1'> 

                                            {data.type ==="expense"? <img src={Reddot} alt="dot icon" className="dotIcon" />
                                            : <img src={Greendot} alt="dot icon" className="dotIcon" />}
                                              <h3>{data.transtitle}</h3>
                                              </div>
                                              <h3>{data.type === "income"? `+₹${data.amt}`:`-₹${data.amt}`}</h3>
                                          
                                        </div>       
                            </div>  
                         ))
                      }  
                   </div>
         </div>
          </>
    )
})
export default ExpenseTrack;
 
