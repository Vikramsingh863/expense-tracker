import { ExpenseContext } from "../contextAPI/expenseProvider";
import { useContext, useState } from "react";
import { deleteExpense } from "../Api/expenseapi";
import { Transition } from "@headlessui/react";

export const ExpenseList = () => {
    const useExpenses = () => useContext(ExpenseContext);
    const { expenses, setUpdate, setMonth, setCategory,setCount } = useExpenses();
    const [hoveredRow, setHoveredRow] = useState(null);
    const category = ["Food", "Transport", "Entertainment", "Health", "Others"];
    const months = [
        { name: "January", number: 1 },
        { name: "February", number: 2 },
        { name: "March", number: 3 },
        { name: "April", number: 4 },
        { name: "May", number: 5 },
        { name: "June", number: 6 },
        { name: "July", number: 7 },
        { name: "August", number: 8 },
        { name: "September", number: 9 },
        { name: "October", number: 10 },
        { name: "November", number: 11 },
        { name: "December", number: 12 }
      ];
            
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    // Calculate the index of the first and last expense for the current page
    const indexOfLastExpense = currentPage * itemsPerPage;
    const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    //formating date
    const dateFormate = (date) => {
        const today = new Date(date);
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 
        const year = today.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    //render update component on state change
    const handleEdit = (exp) => {
        setUpdate((prev) => ({ ...prev, id: exp._id, isTrue: true, category: exp.category, date: dateFormate(exp.date), description: exp.description, amount: exp.amount }));
    };

    //Handle delete expenses
    const handleDelete = async(id) => {
       const result=await deleteExpense(id);
       if(result){
        setCount((prev)=>prev+1)
       }
    };

    // Pagination controls
    const totalPages = Math.ceil(expenses.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //handle month change
    const handleMonthChange=(e)=>{
        const selectedDate = new Date(e.target.value);
                const formattedMonth = selectedDate.toISOString().slice(0, 7);
                setMonth(formattedMonth);
    }
    return (
        <div className="p-6 bg-white shadow-lg rounded-md relative">
            <div className="p-4 bg-gray-100 rounded-md shadow-md flex items-center gap-4">
    {/* Category Filter */}
    <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="category">
            Category
        </label>
        <select
            id="category"
            name="category"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">All</option>
            {category.map((e) => (
                <option key={e} value={e}>{e}</option>
            ))}
        </select>
    </div>

    {/* Month & Year Picker */}
    <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="month-year">
            Select Month & Year
        </label>
        <input
            id="month-year"
            type="month"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {handleMonthChange(e)
                
            }}
            required
        />
    </div>
</div>

            <table className="w-full border-collapse border border-gray-200 rounded-md">
                <thead className="bg-black text-white rounded-md">
                    <tr>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExpenses.map((exp) => (
                        <tr
                            key={exp._id}
                            className={`border-b transition-all duration-200 ${hoveredRow === exp._id ? 'scale-105 bg-gray-100 shadow-md' : ''
                                }`}
                            onMouseEnter={() => setHoveredRow(exp._id)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="p-3">{exp.category}</td>
                            <td className="p-3">₹{exp.amount}</td>
                            <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                            <td className="p-3 text-center">
                                <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:underline mr-4">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:underline">
                                    Delete
                                </button>
                            </td>

                            {/* Tooltip using Headless UI */}
                            <Transition
                                show={hoveredRow === exp._id && exp.description}
                                enter="transition-opacity duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div
                                    className="absolute z-50 bg-gray-800 text-white text-sm p-2 rounded-md shadow-md w-max top-1/4 left-1/2 -translate-x-1/2 mt-2"
                                >
                                    Description: {exp.description}
                                </div>
                            </Transition>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};