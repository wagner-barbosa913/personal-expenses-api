class Expense {
    constructor() {
        this.expenses = [];
        this.nextId = 1;
    }

    getAll(category, date) {
        let filteredExpenses = this.expenses;

        if (category) {
            filteredExpenses = filteredExpenses.filter(exp => exp.category.toLowerCase() === category.toLowerCase());
        }

        if (date) {
            filteredExpenses = filteredExpenses.filter(exp => exp.date === date);
        }

        return filteredExpenses;
    }

    getById(id) {
        return this.expenses.find(exp => exp.id === id);
    }

    create(title, amount, category, date, description) {
        const newExpense = {
            id: `exp_${this.nextId++}`,
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date().toISOString()
        };
        this.expenses.push(newExpense);
        return newExpense;
    }

    update(id, title, amount, category, date, description) {
        const index = this.expenses.findIndex(exp => exp.id === id);

        if (index === -1) {
            return null;
        }

        this.expenses[index] = {
            ...this.expenses[index],
            title: title !== undefined ? title : this.expenses[index].title,
            amount: amount !== undefined ? amount : this.expenses[index].amount,
            category: category !== undefined ? category : this.expenses[index].category,
            date: date !== undefined ? date : this.expenses[index].date,
            description: description !== undefined ? description : this.expenses[index].description,
        };

        return this.expenses[index];
    }

    delete(id) {
        const index = this.expenses.findIndex(exp => exp.id === id);

        if (index === -1) {
            return null;
        }

        this.expenses.splice(index, 1);
        return true;
    }

    getTotal() {
        return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    }

    getSummaryByCategory() {
        const summary = {};
        this.expenses.forEach(exp => {
            summary[exp.category] = (summary[exp.category] || 0) + exp.amount;
        });
        return summary;
    }
}

module.exports = new Expense();
