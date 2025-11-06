const express = require('express');
const Expense = require('../models/ExpenseModel')
const router =  express.Router();
const {getExpense, postExpense} = require("./ExpenseController")

router.get('/',getExpense);
router.post('/',postExpense);


module.exports = router;