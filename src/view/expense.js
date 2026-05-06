const ExpenseController = require('../controller/expense');

class Expense {
    constructor() {
    }

    getAll(req, res) {
        const { category, date } = req.query;
        const expenses = ExpenseController.getAll(category, date);
        res.json(expenses);
    }

    getById(req, res) {
        const { id } = req.params;
        const expense = ExpenseController.getById(id);

        if (!expense) {
            return res.status(404).json({ error: 'Despesa não encontrada' });
        }

        res.json(expense);
    }

    create(req, res) {
        const { title, amount, category, date, description } = req.body;

        try {
            const newExpense = ExpenseController.create(title, amount, category, date, description);
            res.status(201).json(newExpense);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    update(req, res) {
        const { id } = req.params;
        const { title, amount, category, date, description } = req.body;

        try {
            const updatedExpense = ExpenseController.update(id, title, amount, category, date, description);
            if (!updatedExpense) {
                return res.status(404).json({ error: 'Despesa não encontrada' });
            }

            res.json(updatedExpense);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    delete(req, res) {
        const { id } = req.params;
        const result = ExpenseController.delete(id);
        if (!result) {
            return res.status(404).json({ error: 'Despesa não encontrada' });
        }

        res.status(204).send();
    }

    getTotal(req, res) {
        const total = ExpenseController.getTotal();
        res.json({ total });
    }

    getSummaryByCategory(req, res) {
        const summary = ExpenseController.getSummaryByCategory();
        res.json(summary);
    }
}

module.exports = new Expense();
