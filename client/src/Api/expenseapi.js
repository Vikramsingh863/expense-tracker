import Swal from 'sweetalert2';
const URL = "http://localhost:8000"

const showToast = (message, error) => {
    Swal.fire({
        toast: true, // Enable toast mode
        position: 'top-end', // Position of the toast
        icon: error, // Icon type
        title: error, // Title of the toast
        text: message, // Error message
        showConfirmButton: false, // Hide the confirm button
        timer: 3000, // Duration in milliseconds before the toast disappears
        timerProgressBar: true, // Show a progress bar
    });
};
const deleteExpense = async (expenseId) => {
    try {
        const response = await fetch(`${URL}/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to delete expense");
        }

        showToast(data.message,'success')
        return data.success
    } catch (error) {
        console.error("Error:", error.message);
        showToast(error.message,'error')

    }
};

const updateExpense = async (expenseId, updatedData) => {
    const {category,description, date, amount } = updatedData

    try {
        const response = await fetch(`${URL}/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({category,description, date, amount}),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to update expense");
        }
        showToast(data.message,'success')
        return data.success
    } catch (error) {
        showToast(error.message,'error')
        console.error("Error:", error.message);
    }
};


export {deleteExpense, updateExpense}