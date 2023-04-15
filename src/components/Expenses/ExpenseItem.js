import React, { useState } from 'react';

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = function(props){
    const [title, setTitle] = useState(props.title);
    // const expenseDate = new Date(2021, 2, 28);
    // const expenseTitle = "Car Insurance";
    // const expenseAmount = 294.97;

    const clickHandler = function () {
        setTitle("Updated!");
        console.log(title);
    };

    return (
        <Card className="expense-item">
            {/* <div>{expenseDate.toISOString()}</div> */}
            <ExpenseDate date={props.date} />

            <div className="expense-item__description">
                {/* <h2>{expenseTitle}</h2> */}
                <h2>{title}</h2>
                {/* <div className="expense-item__price">${expenseAmount}</div> */}
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onClick={clickHandler}>Change Title</button>
        </Card>
    );
}


export default ExpenseItem;