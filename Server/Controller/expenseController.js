import {  validationResult } from "express-validator";
import Expense from "../Modals/expenseModal.js";
const getExpenses=async(req,res)=>{    
  const { month, category } = req.query;
  const startDate = new Date(`${month}-01T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);
  
  let filter = { date: { $gte: startDate, $lt: endDate } };
  
  // If a category is provided, add it to the filter
  if (category) {
    filter.category = category;
  }
  
  try {
    const expenses = await Expense.find(filter).sort("-date");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

const updateExpenses=async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!expense) return res.status(404).json({ error: "Expense not found",success:0 });
          res.json({expense, success:1});
        } catch (error) {
          res.status(500).json({ error: "Server error", success:0 });
        }
}
    


const deleteExpenses=async(req,res)=>{  
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json({ message: "Expense deleted successfully",success:1 });
      } catch (error) {
        res.status(500).json({ error: "Server error", success:0 });
      }
}
const insertExpenses=async (req,res)=>{    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
    try {
            req.body.date= new Date(req.body.date)
          const expense = new Expense(req.body);
          await expense.save();
          res.status(201).json(expense);
        } catch (error) {
          res.status(500).json({ error: "Server error" , error});
        }
      
}

let homeController ={
    getExpenses, 
    insertExpenses,
    deleteExpenses,
    updateExpenses
}
export default homeController;