
import { useMemo, useState } from 'react';
import expenseStore from '../stores/ExpenseStore';
import BarGraph from '../Graph/BarGraph'
import './Analytics.css'

const Analytics = ()=>{
    const {formState} = expenseStore;

    const [selectedMonth, setSelectedMonth] = useState("Filter By Month");
    const [selectedCategory, setSelectedCategory] = useState("Category");

  const filteredData = useMemo(()=>{
    return formState.filter((item)=>{
        const date = new Date(item.date);
        const month = date.toLocaleString("default",{month:"short"});

         const matchMonth  = 
         selectedMonth === "Filter By Month" || month === selectedMonth;
         const matchCategory =
          selectedCategory === "Category" || item.category === selectedCategory;

     return matchMonth && matchCategory;

    });
  },[formState,selectedMonth,selectedCategory]);
console.log(filteredData);
  const totalIncome = filteredData
       .filter((t)=> t.type === "income")
       .reduce((sum,t)=> sum + Number(t.amt || 0),0)
 const totalExpense = filteredData
        .filter((t)=>t.type === "expense")
        .reduce((sum,t) => sum + Number(t.amt || 0),0);

  const netBalance = totalIncome-totalExpense;


  const reset=()=>{
    setSelectedMonth("Filter By Month");
    setSelectedCategory("Category");
  }
    return(
        <>
            <h1>Analytics DashBoard</h1> 
            
            <div className="AnalyticsDashBoard">
                    <div className="Filters">
                         <select  className='monthcat'
                                  name="MonthFilter" id=""
                                  value={selectedMonth}
                                  onChange={(e)=> setSelectedMonth(e.target.value)}
                         >
                            <option>Filter By Month</option>
                                        <option value="Jan">Jan</option>
                                        <option value="Feb">Feb</option>
                                        <option value="Mar">Mar</option>
                                        <option value="Apr">Apr</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="Aug">Aug</option>
                                        <option value="Sep">Sep</option>
                                        <option value="Oct">Oct</option>
                                        <option value="Nov">Nov</option>
                                        <option value="Dec">Dec</option>
                         </select>
                         <select   className='Spentcat'
                                   value={selectedCategory}
                                   onChange={(e)=> setSelectedCategory(e.target.value)}
                                   name="CategoryFilter" id="" >
                                        <option value="Category">Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Bill">Bill</option>
                                        <option value="Shopping">Shopping</option>
                                        
                                        
                         </select>
                         <button onClick={()=>reset()} className='reset'>Reset Filter</button>
                    </div>

            <div className="Totals">
                      <div className="sec1">
                             <div className="Totalincome">
                         <h3>Total Income</h3>
                           <h2>₹{totalIncome}</h2> 
                          </div>
                          <div className="Totalexpense">
                            <h3>Total Expense</h3>
                              <h2>₹{totalExpense}</h2>            
                          </div>
                      </div>
                    <div className="sec2">
                          <div className="Netbalance">
                            <h3>Net Balance</h3> 
                            <h2>₹{netBalance}</h2> 
                              
                        </div>
                      </div>
                    

              </div>


            <div className="Graphs">

                <div className="BarGraph">
                     <BarGraph filteredData={filteredData}  />
                </div>
                
            </div>
            

            </div>
       </>
    )
}
export default Analytics;