const express = require('express');
const Expense = require('./controller/expense');
const app = express();
const PORT = 3000;


app.use(express.json());
app.get('/', (req, res) => {
 res.send('API de Despesas Pessoais');
});
app.get('/expenses/summary/total', (req, res) => Expense.getTotal(req, res));

app.get('/expenses/summary/category', (req, res) => Expense.getSummaryByCategory(req, res));

app.get('/expenses', (req, res) => Expense.getAll(req, res));

app.get('/expenses/:id', (req, res) => Expense.getById(req, res));

app.post('/expenses', (req, res) => Expense.create(req, res));

app.put('/expenses/:id', (req, res) => Expense.update(req, res));

app.delete('/expenses/:id', (req, res) => Expense.delete(req, res));

app.listen(PORT, () => {
console.info(`Servidor rodando na porta ${PORT}`);
});