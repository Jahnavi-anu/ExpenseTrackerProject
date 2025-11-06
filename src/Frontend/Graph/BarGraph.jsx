
import Analytics from "../Analytics/Analytics";
import {useMemo} from "react";
import React from "react";
import './BarGraph.css'


const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF6666', '#AA66CC'];

import{
    PieChart, Pie, Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const BarGraph = ({filteredData})=>{

   const spentdata = useMemo(()=>{
         const spentdata ={};
    filteredData.forEach((item)=>{
        if(item.type === "expense")
        {
            const category = (item.category)|| "Others";
            const amt = Number(item.amt) || 0;

             if (!spentdata[category]) {
                  spentdata[category] = 0;  
               }
                 spentdata[category] += amt; 
                 
            
        }   

   } )
       return Object.keys(spentdata).map((t)=>({
               category:t,
               Totalamt:spentdata[t],
       }));

   },[filteredData])

  console.log("data",spentdata);

  const montlyData = useMemo(()=>{
       const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

     const totals = months.map((month)=> ({
          name:month,
          income:0,
          expense:0,
     }))

     filteredData.forEach((t)=>{
        const date = new Date(t.date);
        const monthName = date.toLocaleString("default",{month:"short"});
        const monthObj = totals.find((m)=> m.name === monthName);
        if(monthObj){
            if(t.type === "income"){
                monthObj.income += Number(t.amt || 0);
            }else if(t.type === "expense"){
                monthObj.expense += Number(t.amt || 0);
            }
        }
     });
   
     return totals;

    }, [filteredData])


 const categorySummary = useMemo(()=>{
    const summary={};

    filteredData.forEach((t)=>{

            if(t.type === "expense"){
                const cat = t.category || "Other";
                const amt = Number(t.amt || 0);

                 if(!summary[cat])
            {
                summary[cat] = {total:0,count:0};
             }
           
                summary[cat].total += amt;
                summary[cat].count += 1;
            }

    })
     const totalSpent = Object.values(summary).reduce(
            (sum, cat) => sum+cat.total,0
        )
    return Object.keys(summary).map((cat)=>({
                    category:cat,
                    total:summary[cat].total,
                    count:summary[cat].count,
                    percentage:
                    totalSpent === 0 ? 0 : ((summary[cat].total / totalSpent)*100).toFixed(1), 
           }))
    
  },[filteredData]); 

    return(
    <>
             <div className="BarContainer">


                {/* section1 */}

                   <div className="BarSection">
                             
                             <div style={{width:"700px", height:300,backgroundColor:"#ffff",marginTop:"36px",padding:"20px",borderRadius:"5px"}}>

                                        <ResponsiveContainer>
                                            <BarChart data={montlyData} margin={{top:20, right:30, left:0, bottom:5}}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="income" fill="#4CAF50" name="Income" barSize={30}/>
                                                    <Bar dataKey="expense" fill="#F44336" name="Expense" barSize={30} />
                                            </BarChart>
                                        </ResponsiveContainer>
           
                            </div>
                             <div className="spendingSummary">
                                <h4>Spending Summary</h4>
                                <div className="Bar-Headers">
                                 
                                    <p>Category</p>
                                    <p>Total Spent</p>
                                    <p>Percentage</p>
                                    <p>Transaction Count</p>
                                   
                                </div>     
                                  <div className="Bar-Content">
                                        { categorySummary.map((item)=>(
                                     <div className="Bar-Row">
                                        <p>{item.category} </p>
                                        <p>{item.total} </p>
                                        <p>{item.percentage} </p>
                                        <p>{item.count} </p>
                                  </div>
                                     ))}
                                  </div>
                                   

                                            
                             </div>

        {/* Section1Close */}
                   </div>

                  <div className="PieSection">

                    <div className="Pie">

                        <div className="PieHeader">
                                <h2>Spending BreakDown</h2>
                        </div>
                        {/* {/* <div className="PieGraph"></div>  */}
                        <div className="PieWrapper">


                             <ResponsiveContainer width="195%" height={220} marginTop={30}>
                                <PieChart>
                              <Pie 
                                data={spentdata} 
                                dataKey="Totalamt"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                label={false}
                              >
                                {spentdata.map((entry, index) => (
                                        <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                              </PieChart> 
                             </ResponsiveContainer>
                  
                            <div className="PieContent">
                                    
                                    { categorySummary.map((item)=>(
                                    <div className="bardata">
                                        <p>{item.category} </p>
                                        {/* <p>{item.Totalamt} </p> */}
                                    </div>
                                ))
                            } 
                            </div>
                           

                        </div>
                        

                    </div>

                     <div className="PieSpendingSummary">
                             <h2>Spending Summary</h2>
                        <div className="PieHeaders">
                               <p>Category</p>
                               <p>Total Spent</p>
                               <p>Percentage</p>
                        </div>

                        <div className="PieSumcontent">
                              
                            { categorySummary.map((item)=>(
                            <div className="bardata">
                                <p>{item.category} </p>
                                <p>{item.total} </p>
                                 <p>{item.percentage} </p>
                            </div>
                        ))
                    } 
                        </div>
                        
                    </div>


                  </div>

                

        {/* ContainerBox */}
             </div>
              
       
     </>  
    )

}
export default BarGraph;