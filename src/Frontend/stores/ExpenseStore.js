import {makeAutoObservable,runInAction } from "mobx"
import axios from "axios";
import {EXPENSE_API} from "../../config"

 const API_BASE = EXPENSE_API

 class ExpenseStore{

    //observable state...
    formState=[];
    loading=false;
    // transPop=false;
    error=null;

    constructor(){
      makeAutoObservable(this,{},{autoBind:true});
    }


    //action
    async fetchTransactions(){
        this.loading = true;
        this.error = null;
        try{
          const res = await axios.get(API_BASE);
          runInAction(()=>{
            this.formState = res.data || [];
            this.loading=false;
          })
        }catch(err){
          runInAction(()=>{
            this.error = err.message || "Fetch failed";
            this.loading = false;
          })
        }
    }

  //action 

  async addExpense(data){
    this.loading = true;
    this.error = null;
    try{
         const res = await axios.post(API_BASE,data,{
          headers:{"Content-Type":"application/json"},
         });
         runInAction(()=>{
          this.formState= [res.data , ...this.formState];
          this.loading=false;
         });
         return res.data;
    }catch(err){
         runInAction(()=>{
          this.error = err.message || "Create failed";
          this.loading = false;
         });
         throw err;
    }

  }

    get Income() {
    return this.formState
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amt || 0), 0);
  }

    get Expense() {
    return this.formState
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amt || 0), 0);
  }

  get NetBalance() {
    return this.Income - this.Expense;
  }


  get spendingByCategory(){
       return  this.formState.reduce((acc,t)=>{
                if(t.type === "expense"){
                        const cat = t.category || "Other";
                      acc[cat] = (acc[cat] || 0)+Number(t.amt || 0);
                }
                return acc;
          },{});
  }


      get spendingData(){
        return Object.keys(this.spendingByCategory).map(key => ({
                  name:key,
                  value:this.spendingByCategory[key],
        }));
      }



 }



 const expenseStore = new ExpenseStore();
 export default expenseStore;