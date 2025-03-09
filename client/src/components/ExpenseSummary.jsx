import { useContext } from "react";
import { ExpenseContext } from "../contextAPI/expenseProvider";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components for the Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ExpenseSummary = () => {
    const { expenses } = useContext(ExpenseContext); 

    // Calculate summary data
    const summaryData = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    // Prepare data for the Bar chart
    const data = {
        labels: Object.keys(summaryData), // Categories as labels
        datasets: [{
            label: "Total Expenses",
            data: Object.values(summaryData), // Total amounts for each category
            backgroundColor: "#4F46E5", // Bar color
        }],
    };

    // Options for the Bar chart (optional)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            title: {
                display: true,
                text: 'Expense Summary', // Title of the chart
            },
        },
    };

    return <div className="bar-graph">
<Bar data={data} options={options} />
    </div> ;
};