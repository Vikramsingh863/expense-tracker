import logo from './logo.svg';
import './App.css';
import {ExpenseForm} from './components/ExpenseForm';
import {ExpenseList} from './components/ExpenseList';
import {ExpenseSummary} from './components/ExpenseSummary';
import { ExpenseContext } from './contextAPI/expenseProvider.js';
import { UpdateForm } from './components/UpdateForm.jsx';
import { useContext } from 'react';
function App() {
   const { update, setUpdate } = useContext(ExpenseContext)
  
  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      {update.isTrue?<UpdateForm/>: <ExpenseForm />}
      <ExpenseList />
      <ExpenseSummary />
    </div>
 
  );
}

export default App;
