import express from 'express'
import homeController from '../Controller/expenseController.js'
import { body } from "express-validator";
const validateData=(req,res, next)=>{
    [
        body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
        body("category").isIn(["Food", "Transport", "Entertainment", "Health", "Others"]).withMessage("Invalid category"),
        body("date").optional().isISO8601().withMessage("Invalid date format"),
        body("description").trim().notEmpty().withMessage("Description is required"),
 ]
 next()
}

const route = express.Router()
route.get('/expenses',homeController.getExpenses)
route.post('/expenses',validateData, homeController.insertExpenses)
route.put('/expenses/:id',validateData, homeController.updateExpenses)
route.delete('/expenses/:id',homeController.deleteExpenses)

export default route