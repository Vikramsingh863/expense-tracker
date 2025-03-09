import { useContext } from "react";
import { ExpenseContext } from "../contextAPI/expenseProvider";
import { updateExpense } from "../Api/expenseapi";
export const UpdateForm = () => { 
    const useExpenses = () => useContext(ExpenseContext);
    const { setExpenses, update, setUpdate, setCount } = useExpenses();
    const category = ["Food", "Transport", "Entertainment", "Health", "Others"];
    const URL = "http://localhost:8000";

    const handleSubmit = async (e) => {
        e.preventDefault();
       const success =await updateExpense(update.id,update)       
       if(success){
        setCount((prev)=>prev+1)
       }
    };

    const handleUpdateState = () => {
        setUpdate({ id: "", isTrue: false, category: "", date: "", amount: "", description: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdate((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
            <input 
                type="number" 
                name="amount" // Set the name attribute
                placeholder="Amount" 
                className="w-full p-2 mb-2 border" 
                required
                value={update.amount} // Bind the value to update.amount
                onChange={handleChange} 
            />
            <select 
                name="category" // Set the name attribute
                className="w-full p-2 mb-2 border" 
                required  
                value={update.category} // Bind the value to update.category
                onChange={handleChange}
            >
                <option value="">Select a category</option>
                {category.map((e) => (
                    <option key={e} value={e}>{e}</option>
                ))}
            </select>
            <input 
                type="date" 
                name="date" 
                className="w-full p-2 mb-2 border" 
                required
                value={update.date} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                className="w-full p-2 mb-2 border"
                value={update.description} 
                onChange={handleChange} 
            />
            <button type="submit" className=" p-2 w-1/3 m-3 rounded sumbitbtn">Update Expense</button>
            <button type="button" className="p-2 w-1/3 rounded sumbitbtn" onClick={handleUpdateState}>Cancel</button>
            
        </form>
    );
};