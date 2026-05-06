
const expenseModel = require('../model/expense');

class ExpenseController {
    
    getAll(req, res) {
    const { category, date } = req.query;
    const expenses = expenseModel.getAll(category, date);

    // Mapeia cada despesa para adicionar os links individuais
    const expensesWithLinks = expenses.map(expense => ({
        ...expense,
        links: [
            {
                rel: "self",
                method: "GET",
                href: `http://localhost:3000/expenses/${expense.id}`
            }
        ]
    }));

    return res.status(200).json(expensesWithLinks);
}
    getById(req, res) {
        const { id } = req.params;
        const expense = expenseModel.getById(id);

        
        if (!expense) {
            return res.status(404).json({ 
                error: "Despesa não encontrada",
                message: `Não foi possível localizar uma despesa com o ID: ${id}`
            });
        }
         
        
    const expenseWithLinks = {
        ...expense,
        links: [
            {
                rel: "self",
                method: "GET",
                href: `http://localhost:3000/expenses/${expense.id}`
            },
            {
                rel: "update",
                method: "PUT",
                href: `http://localhost:3000/expenses/${expense.id}`
            },
            {
                rel: "delete",
                method: "DELETE",
                href: `http://localhost:3000/expenses/${expense.id}`
            }
        ]
    };

        return res.status(200).json(expenseWithLinks);
    }

    create(req, res) {
        const { title, amount, category, date, description } = req.body;
        
       
        if (!title || !amount) {
            return res.status(400).json({ error: "Título e valor são obrigatórios" });
        }

        const newExpense = expenseModel.create(title, amount, category, date, description);
        
        
        return res.status(201).json(newExpense);
    }

    update(req, res) {
        const { id } = req.params;
        const { title, amount, category, date, description } = req.body;
        
        const updatedExpense = expenseModel.update(id, title, amount, category, date, description);

        if (!updatedExpense) {
            return res.status(404).json({ error: "Despesa não encontrada para atualização" });
        }

        return res.status(200).json(updatedExpense);
    }

    delete(req, res) {
        const { id } = req.params;
        const success = expenseModel.delete(id);

        if (!success) {
            return res.status(404).json({ error: "Despesa não encontrada para exclusão" });
        }

        
        return res.status(204).send();
    }

    getTotal(req, res) {
        const total = expenseModel.getTotal();
        return res.status(200).json({ total });
    }

    getSummaryByCategory(req, res) {
        const summary = expenseModel.getSummaryByCategory();
        return res.status(200).json(summary);
    }
}

module.exports = new ExpenseController();