import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true, 
        min: 0 // Prevents negative expenses
    },
    category: { 
        type: String, 
        required: true, 
        enum: ["Food", "Transport", "Entertainment", "Health", "Others"] // Example categories
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    description: { 
        type: String, 
        trim: true 
    }
}, { timestamps: true }); 

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
