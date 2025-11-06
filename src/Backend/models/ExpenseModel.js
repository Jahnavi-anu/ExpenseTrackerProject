const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
         transtitle:{
            type:String,
            required:[true,"Please Enter the title..."]
         },
         amt:{
            type:Number,
            require:true
         },
         type:{
            type:String,
            enum:['income','expense'],
            required:true
         },
         category:{
            type:String
         },
         date:{
            type:Date,
            required:true,
            default:Date.now
         }

},
        {
            timestamps:true
        }
)

module.exports = mongoose.model("Expense",ExpenseSchema);