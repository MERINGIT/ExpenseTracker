const express = require('express');
const { expense } = require('../models'); // Import the Expense model
const router = express.Router();

class ExpenseRouter {
  constructor() {
    router.post('/', this.createExpense);
    router.get('/:id', this.getExpenseById);
    router.put('/:id', this.updateExpense);
    router.delete('/:id', this.deleteExpense);
    router.get('/user/:userId', this.getExpensesByUserId);
  }

  async createExpense(req, res) {
    try {
      const { text, amount, userId } = req.body;
      
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
  
      // Create the expense with userId
      const newExpense = await expense.create({ text, amount, userId });
      
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExpenseById(req, res) {
    try {
        console.log("hi here");
      const { id } = req.params;
      const foundExpense = await expense.findByPk(id);
      if (!foundExpense) return res.status(404).json({ error: 'Expense not found' });
      res.json(foundExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { text, amount } = req.body;
      
      const expenseToUpdate = await expense.findByPk(id);
      if (!expenseToUpdate) return res.status(404).json({ error: 'Expense not found' });
      
      await expenseToUpdate.update({ text, amount });
      res.json(expenseToUpdate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const id = parseInt(req.params.id);
      const expenseToDelete = await expense.findByPk(id);
      if (!expenseToDelete) return res.status(404).json({ error: 'Expense not found' });
      
      await expenseToDelete.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExpensesByUserId(req, res) {
    try {
    console.log("hi");
      const userId = parseInt(req.params.userId);
      const expenses = await expense.findAll({ where: { userId: userId } });
      if (!expenses.length) return res.status(404).json({ error: 'No expenses found for this user' });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

new ExpenseRouter(); // Instantiate the router class
module.exports = router;
