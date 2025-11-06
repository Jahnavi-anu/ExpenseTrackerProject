const Expense = require("../models/ExpenseModel");
const getExpense =async(req,res)=>{
        try{
             const expenses = await Expense.find({});
             res.status(200).json(expenses);
        }catch(error){
             res.status(400).json({message:error.message});
        }
    }  
    const postExpense = async(req,res)=>{
        try
        {
             const expensetrack = await Expense.create(req.body);
             res.status(200).json(expensetrack);
    
        }catch(error){
               res.status(500).json({message:error.message})
        }
    }
    module.exports={
        getExpense,
        postExpense
    }