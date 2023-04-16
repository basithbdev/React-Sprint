import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = function (props) {

    const saveExpenseDataHandler = function (enteredExpenseData) {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };

        props.onDisplayExpenseData(expenseData);

    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
        </div>
    )
};

export default NewExpense;