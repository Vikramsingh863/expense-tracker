import { useState, useEffect, createContext, useContext } from "react";
import Swal from 'sweetalert2'
export const ExpenseContext = createContext(); 

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [update, setUpdate] = useState({id:'', isTrue:false, category:'', date:'', amount:'', description:''});
    const [count, setCount] = useState(1);

    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
    
    const [category, setCategory] = useState("")
    const URL = "http://localhost:8000"
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`${URL}/expenses?month=${month}&category=${category}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
    
                const data = await res.json();
                setExpenses(data);
            } catch (error) {
                Swal.fire({
                    toast: true, // Enable toast mode
                    position: 'top-end', // Position of the toast
                    icon: 'error', // Icon type
                    title: 'Error', // Title of the toast
                    text: `Failed to fetch expenses data `,
                    showConfirmButton: false, // Hide the confirm button
                    timer: 3000, // Duration in milliseconds before the toast disappears
                    timerProgressBar: true, // Show a progress bar
                });            }
        };  fetchExpenses();
    }, [month, category, count]);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses, month, setMonth, update, setUpdate,category, setCategory, count, setCount  }}>
            {children}
        </ExpenseContext.Provider>
    );
};


