import { useState, useContext } from "react";
import { ExpenseContext } from "../contextAPI/expenseProvider";
export const ExpenseForm = () => { 
    const useExpenses = () => useContext(ExpenseContext);
    const { setExpenses } = useExpenses();
    const [form, setForm] = useState({ amount: "", category: "Food", date: "", description: "" });
    const category = ["Food", "Transport", "Entertainment", "Health", "Others"]
     const URL = "http://localhost:8000"
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch(`${URL}/expenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const newExpense = await res.json();
        setExpenses((prev) => [...prev, newExpense]);
    } catch (error) {
        console.error("Failed to add expense:", error);
        
    }
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
        <input type="number" placeholder="Amount" className="w-full p-2 mb-2 border" required
          onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <select className="w-full p-2 mb-2 border" name="" id="" required  onChange={(e) => setForm({ ...form, category: e.target.value })}>{category.map((e)=>{
            return(<option>{e}</option>)
        })}</select>
        <input type="date" className="w-full p-2 mb-2 border" required
          onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="text" placeholder="Description" className="w-full p-2 mb-2 border"
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit" className=" text-white p-2 w-full rounded sumbitbtn">Add Expense</button>
      </form>
    );
  };
  