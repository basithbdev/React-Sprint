# Section 2 - React States and Working with Events

## 1. Listening to Events & Working with Event Handlers

React has several event name props to facilitate events like clicking, etc. These props start with 'on' followed by the name of the event prop.

Remember that the event name starts with a capital letter.

For example: onClick()

Now, we are trying to change the name of the expense title on clicking a button. First off, let's create a button with an event handler prop.

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  const clickHandler = function () {
    console.log("Button has been clicked!");
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      {/* <button
        onClick={() => {
          console.log("Button has been clicked!");
        }}
      >
        Change Title
      </button> */}

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
```

#### Output:

![onClick()](<../Screenshots/Section 2 - React States and Working With Events/2.1.1.png> "onClick() function")

We can pass an inline function to the onClick event prop as shown, however it is not preferred if there are multiple lines of code inside the function. Also, to keep the JSX code clean, we abstain from inline functions.

Instead we declare the functions at top, and later call them inside the event handler prop.

**Note:**

When calling the function we do not use parenthesis i.e (), for example, it is onClick = {clickHandler} and not onClick = {clickHandler()}

Now, what is the difference?

onClick = {clickHandler()}; JS immediately executes the code associated with the clickHandler function when the JSX is parsed regardless if the action (in this case 'click') has been performed or not.

```javascript
<button onClick={clickHandler()}>Change Title</button>
```

![Adding () to function inside event handler prop](<../Screenshots/Section 2 - React States and Working With Events/2.1.2.png> "Adding () to function inside event handler prop")

With onClick = {clickHandler}; JS executes the clickHandler function only when the said event (in this case 'click') has been performed.

```javascript
<button onClick={clickHandler}>Change Title</button>
```

![Removing () from the function inside event handler prop](<../Screenshots/Section 2 - React States and Working With Events/2.1.1.png> "Removing () from the function inside event handler prop")

## 2. How Component Functions Are Executed

Now, let us continue trying to change the title of the expenses upon clicking a button.

Normally this code would make sense, since it appears to change the name of the title in the DOM.

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  let title = props.title;

  const clickHandler = function () {
    title = "Updated!";
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
```

#### Output:

![Execution of component functions](<../Screenshots/Section 2 - React States and Working With Events/2.2.1.png>)

Keep in mind that the clickHandler() is getting called and executed since 'title' is being logged on to the console. However, in the DOM, there does not appear to be any change in 'expense title' even after outputting the title in the JSX code.

This is simply because React doesn't work that way.

We have to know how React parses, considers, and renders JSX code on to the screen.

In React, we have components which nothing but functions that return JSX code. When there are multiple components present in multiple files, each component in the file is executed in the respective order that they are called until there are no more components left to call.

It all starts from the index.js and goes from there in the order of appearance of components.

i. index.js has the App component from App.js file

ii. App.js has the Expenses component from the Expenses.js file

iii. Expenses.js has the Card component from the Card.js file and it also has the ExpenseItem component from the ExpenseItem.js file

iv. Card.js doesn't call any component from other files, so it executes and renders the result on to the DOM.

v. ExpenseItem.js has the ExpenseDate component form the ExpenseDate.js file

vi.ExpenseDate.js doesn't call any component from other files and, finally when there are no more component code left to call in the JSX, it evaluates the overall result and translates that in to DOM instructions which renders something into the screen.

This is how React renders the content (JSX code) on to the screen.

React eventually renders all these components to the screen, however React does not repeat this again and again. The problem is that this happens only once when the application is initially rendered but thereafter it's done.

However, in the modern applications, sometimes we need to update what is rendered on the screen. In our case, changing the title of the expense when a button is clicked.

So, we need a way to tell React that something has changed and now a certain component has to be re-evaluated. To solve this problem, React introduces a special concept called _state_.

## 3. Working with "State"

Importing 'useState' object from the React library.

#### ExpenseItem.js

```javascript
import React, { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  let title = props.title;

  const clickHandler = function () {
    title = "Updated!";
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
```

The useState() function is a function that allows us to define values as states. Changes made to these values (i.e state) should result in the re-rendering of the component. This is a key difference in comparison to changing values using a regular variable.

useState is one of the most important React hooks. All React hooks can recognized since they start with 'use'.

All these hooks must be called only inside of the component functions. React hooks cannot be called outside of the component functions and they should not be called inside any nested functions.

useState() requires an initial value as shown below

```javascript
useState(props.title);
```

The useState() functions returns an array with exactly 2 values, the first element is the current state value and the second element is a function for updating the current state value.

We use destructuring to store these 2 values into separate variables

```javascript
const [title, setTitle] = useState(props.title);
```

_Remember to follow the convention used for naming the 2 variables while destructuring._

```javascript
import React, { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  const clickHandler = function () {
    setTitle("Updated");
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
```

![useState() in action](<../Screenshots/Section 2 - React States and Working With Events/2.3.1.png>)

Now, why is that the value has now changed on the screen?

This is because, on calling the state updating function setTitle(), it not only receives and assigns a new value to a variable (in this case 'title') but it also re-renders (execute again) the component function in which you have the state updating function.

```javascript
const clickHandler = function () {
  setTitle("Updated");
  console.log(title); // displays the old state value first and then later displays the new state value.
};
```

Also, on clicking the 'Change Title' button, the title changes and get re-rendered on to the screen but we can see that console.log() statements show the title before it was updated. The reason is that the state updating function does not change the value right away, but instead schedules this as state update.

So, in the very next line the new value isn't available yet, so we see the old value being logged on to the console even though we updated it before logging.

So, if you have data which might change and the changes made to the data must be reflected on the UI, then you need state because regular variables will not do the trick.

## 4. A Closer Look at the "useState" Hook

We are going to look at how 'state' in React works under the hood.

useState() registers a value as a state for the component in which it is being called. More specifically useState() registers a value as state for a specific component instance.

#### Expenses.js

```javascript
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

function Expenses(props) {
  // console.log(props);
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.item[0].title} // retrieving 'expenses' array from App.js as 'item' from props.
        amount={props.item[0].amount}
        date={props.item[0].date}
      />
      <ExpenseItem
        title={props.item[1].title}
        amount={props.item[1].amount}
        date={props.item[1].date}
      />
      <ExpenseItem
        title={props.item[2].title}
        amount={props.item[2].amount}
        date={props.item[2].date}
      />
      <ExpenseItem
        title={props.item[3].title}
        amount={props.item[3].amount}
        date={props.item[3].date}
      />
    </Card>
  );
}

export default Expenses;
```

ExpenseItem component is being used in Expense.js 4 times.

Every individual ExpenseItem component receives its own state which is detached/different form the other states.

This implies that the useState() function residing inside the ExpenseItem component is called 4 times individually by the 4 different ExpenseItem component inside Expenses component.

#### ExpenseItem.js

```javascript
import React, { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  const clickHandler = function () {
    setTitle("Updated");
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
```

Each ExpenseItem component receives it own state, this can be observed in the following image:

![Each ExpenseItem component has its own state](<../Screenshots/Section 2 - React States and Working With Events/2.4.1.png>)

Updating the title of the 1st ExpenseItem component does not update the other 3 ExpenseItem component. This is because, each of the ExpenseItem component has its own state. It's on a per component instance basis.

#### ExpenseItem.js

```javascript
function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);
  console.log("ExpenseItem is evaluated by React");

  const clickHandler = function () {
    setTitle("Updated");
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}
```

Four separate instances of the ExpenseItem component are being created. Hence, the output "ExpenseItem is evaluated by React" is displayed 4 times.

![Output displayed by 4 separate instances of the same component](<../Screenshots/Section 2 - React States and Working With Events/2.4.2.png>)

However, on changing the title of one of the four components, the output "ExpenseItem is evaluated by React" is displayed only once since only 1 specific component instance is being updated and therefore re-evaluated and the other instances are not affected by that state change.

**State is separated on a per component instance basis**

In ExpenseItem.js, why are we using const, even though the title is being updated by setTitle() present inside of the clickHandler() function?

```javascript
const [title, setTitle] = useState(props.title);
console.log("ExpenseItem is evaluated by React");

const clickHandler = function () {
  setTitle("Updated");
  // title = "";
  console.log(title);
};
```

Note, that we are not assigning a value to 'title' using '=' sign, that would indeed fail. Instead, we are calling a function that assigns the value or state to 'title'. This is not the same as assigning a value using the '=' operator. So it's absolutely fine to use 'const' here.

React keeps track of when we call useState() in a given component instance for the first time.

On calling useState() the first time, React takes the argument inside of useState() as the initial value, eg. useState(props.title)

But if the component is re-executed because of a state change, then React will not re-initialize the state. It'll detect that the state had already been initialized and now it'll grab the latest state and return that state.

So, the initial state value inside the useState() is only considered when the component is executed for the first time, for a given component instance.

(Know that state can be updated in many ways! We update our state upon user events (e.g. upon a click). That's very common but not required for state updates! You can update states for whatever reason you may have. State can be updated based on the http response we get or you could also update a state because a timer (set with setTimeout()) expired for example.)

## 5. Adding Form Inputs

Creating a form to get user inputs for adding expenses.

#### NewExpense.js

```javascript
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = function () {
  return (
    <div className="new-expense">
      <ExpenseForm />
    </div>
  );
};

export default NewExpense;
```

#### ExpenseForm.js

```javascript
import "./ExpenseForm.css";

const ExpenseForm = function () {
  return (
    <div className="expense-form">
      <form>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input type="number" min="0.01" step="0.01" />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input type="date" min="2022-01-01" max="2024-01-01" />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

#### App.js

```javascript
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
// import React from "react";

function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's Get Started!"),
  //   React.createElement(Expenses, { item: expenses })
  // );

  return (
    <div>
      <NewExpense />
      <Expenses
        item={expenses} // passing the expenses array as 'item'
      />
    </div>
  );
}

export default App;
```

## 6. Listening to User Input

To listen to user input, we add a prop like 'onChange' to the input element. We then point onChange to a function which then returns the value of the changed title.

#### ExpenseForm.js

```javascript
import "./ExpenseForm.css";

const ExpenseForm = function () {
  const titleChangeHandler = function (event) {
    console.log(event.target.value);
  };

  return (
    <div className="expense-form">
      <form>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input type="number" min="0.01" step="0.01" />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input type="date" min="2022-01-01" max="2024-01-01" />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

## 7. Working with Multiple States

You can have multiple states inside a component, and each state variables (setEnteredTitle, setEnteredAmount, setEnteredDate) function independently.

#### ExpenseForm.js

```javascript
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = function () {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = function (event) {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = function (event) {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = function (event) {
    setEnteredDate(event.target.value);
  };

  return (
    <div className="expense-form">
      <form>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2024-01-01"
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

## 8. Using One State Instead (And What's Better)

You can use one state instead of having multiple states. For example, enteredTitle, enteredAmount and enteredDate are all inside a single state.

You can use one state or multiple states based on your personal preference. You'll find multiple states being used in most of the React projects.

#### ExpenseForm.js

```javascript
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = function () {
  //   const [enteredTitle, setEnteredTitle] = useState("");
  //   const [enteredAmount, setEnteredAmount] = useState("");
  //   const [enteredDate, setEnteredDate] = useState("");

  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = function (event) {
    // setEnteredTitle(event.target.value);
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    });
  };

  const amountChangeHandler = function (event) {
    // setEnteredAmount(event.target.value);
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  };

  const dateChangeHandler = function (event) {
    // setEnteredDate(event.target.value);
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  };

  return (
    <div className="expense-form">
      <form>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2024-01-01"
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

Inside of the setUserInput object, if we only mention enteredTitle: event.target.value..  then key and value pairs for enteredAmount and enteredDate will be lost, i.e the date for enteredAmount and enteredDate will be lost.

```js
const titleChangeHandler = function(event){
  setUserInput({
    enteredTitle: event.target.value; // Data for enteredAmount and enteredDate will be lost.
  })
};
```

Why will the data for enteredAmount and enteredDate be lost?

This is because React replaces the old state for the new one so the object as a whole will be replaced and not just a particular that has undergone a change in its value. So in order to change the value for enteredTitle as well as keep the existing data for enteredAmount and enteredDate, we do the following:

```js
const titleChangeHandler = function(event){
  setUserInput({
    ...userInput,
    enteredTitle: event.target.value;
  })
};
```

So what we are doing above is that first by destructuring we take in all the userInput key-value pairs, and then we override the desired key-value pair (here, enteredTitle) and by doing this we ensure that the other values are not lost or thrown away but are a part of the new state.


## 9. Updating State That Depends On The Previous State

Now, the way we are using and updating a single state is not entirely correct. It would technically work, however it would fail in some niche scenarios and it's simply not a good practice to update your state like this.

#### ExpenseForm.js

```javascript
const [userInput, setUserInput] = useState({
  enteredTitle: "",
  enteredAmount: "",
  enteredDate: "",
});

const titleChangeHandler() = function(event){

// setEnteredTitle(event.target.value);

// 1st approach to calling setUserInput()
setUserInput({
  ...userInput,
  enteredTitle: event.target.value,
}); // not a good practice to update the state like this
};

const amountChangeHandler() = function(value){

// setEnteredAmount(event.target.value);

// 1st approach to calling setUserInput()
setUserInput({
  ...userInput,
  enteredAmount: event.target.value
})
};

const dateChangeHandler() = function(event){

// setEnteredTitle(event.target.value);

// 1st approach to calling setUserInput()
setUserInput({
    ...userInput,
    enteredDate: event.target.value,
});
};
```

So, why is this above method not a good practice? What's the problem?

Here, we depend on the previous state (i.e. userInput) for updating the state. Here, we depend on userInput because we need to copy the values 'enteredTitle', 'enteredAmount', and 'enteredDate', so that we don't lose them.

Hence, we depend on the previous state snapshot to copy the existing values ('enteredTitle', 'enteredAmount', and 'enteredDate') and then override one value with a new one.

**Important: whenever you update the state and you depend on the previous state, you should use an alternative form of this state updating function**

#### ExpenseForm.js

```javascript
const [userInput, setUserInput] = useState({
  enteredTitle: "",
  enteredAmount: "",
  enteredDate: "",
});

const titleChangeHandler = function (event) {
  // setEnteredTitle(event.target.value);

  // 1st approach to calling setUserInput()

  // setUserInput({
  //   ...userInput,
  //   enteredTitle: event.target.value,
  // });

  // 2nd and better approach to calling setUserInput()

  setUserInput((prevState) => {
    return { ...prevState, enteredTitle: event.target.value };
  });
};

const amountChangeHandler = function (event) {
  // setEnteredAmount(event.target.value);

  // 1st approach to calling setUserInput()

  // setUserInput({
  //   ...userInput,
  //   enteredAmount: event.target.value,
  // });

  // 2nd and better approach to calling setUserInput()

  setUserInput((prevState) => {
    return { ...prevState, enteredAmount: event.target.value };
  });
};

const dateChangeHandler = function (event) {
  // setEnteredDate(event.target.value);

  // 1st approach to calling setUserInput()

  // setUserInput({
  //   ...userInput,
  //   enteredDate: event.target.value,
  // });

  // 2nd and better approach to calling setUserInput()

  setUserInput((prevState) => {
    return {
      ...prevState,
      enteredDate: event.target.value,
    };
  });
};
```

Instead of calling the setUserInput() like that, we call and pass in a function to that setUserInput() function, for example an anonymous arrow function.

The function which is passed to setUserInput() function will automatically be executed by React and it will receive the previous state snapshot for that state for which you're calling the updating function.

In this case, the previous state snapshot is the object state here:

```javascript
const [userInput, setUserInput] = useState({
  enteredTitle: "",
  enteredAmount: "",
  enteredDate: "",
});
```

Then, we return the key-value pairs from the previous state and override the respective key associated with that function to 'event.target.value'

In many cases, both the approach will work fine, but remember that React schedules state updates and it doesn't perform them immediately.

So, if you schedule a lot of state updates at the same time, you could be depending on an outdated or incorrect state snapshot if you use the 1st approach.

If you use the 2nd approach, React will guarantee that the state snapshot that it gives you in this inner function will always be the latest state snapshot, keeping all scheduled state updates in mind.

So the 2nd approach is the safe way to ensure that you always operate on the latest state snapshot. If your state update depends on the previous state, use this function form

```javascript
setUserInput((prevState) => {
  return { ...prevState, enteredTitle: event.target.value };
});
```

A final look at ExpenseForm.js

#### ExpenseForm.js

```javascript
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = function () {
  //   const [enteredTitle, setEnteredTitle] = useState("");
  //   const [enteredAmount, setEnteredAmount] = useState("");
  //   const [enteredDate, setEnteredDate] = useState("");

  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = function (event) {
    // setEnteredTitle(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });

    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = function (event) {
    // setEnteredAmount(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });

    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: event.target.value };
    });
  };

  const dateChangeHandler = function (event) {
    // setEnteredDate(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });

    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredDate: event.target.value,
      };
    });
  };

  return (
    <div className="expense-form">
      <form>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2024-01-01"
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

This is a key concept and a valid alternative, however, I'll be using multiple state approach from here onwards.

## 10. Handling Form Submission

#### ExpenseForm.js

```javascript
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = function () {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  const titleChangeHandler = function (event) {
    setEnteredTitle(event.target.value);

    // // setUserInput({
    // //   ...userInput,
    // //   enteredTitle: event.target.value,
    // // });

    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const amountChangeHandler = function (event) {
    setEnteredAmount(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });

    // setUserInput((prevState) => {
    //   return { ...prevState, enteredAmount: event.target.value };
    // });
  };

  const dateChangeHandler = function (event) {
    setEnteredDate(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });

    // setUserInput((prevState) => {
    //   return {
    //     ...prevState,
    //     enteredDate: event.target.value,
    //   };
    // });
  };

  const formSubmitHandler = function (event) {
    event.preventDefault();

    const newExpenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    console.log(newExpenseData);
  };

  return (
    <div className="expense-form">
      <form onSubmit={formSubmitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input type="text" onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2024-01-01"
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

We add an onSubmit prop to the form element and not the button element. Button element inside form already has the attribute type="submit"

The onSubmit prop calls a function when the form is submitted i.e formSubmitHandler()

```javascript
const formSubmitHandler = function (event) {
  event.preventDefault();

  const newExpenseData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };

  console.log(newExpenseData);
};
```

The formSubmitHandler() function has access to an 'event' object.

What is event.preventDefault() ?

Now, by default a request is sent to the server every time the form is submitted. The server then sends the page again to the client which causes the page to reload. In order to prevent this default behavior, the preventDefault() method is used.

An object is then created (here, newExpenseDate) which stores the expense title, expense amount and expense date entered by the user and displays it.

#### Output

![Submitting the form using 'Add Expense' button](<../Screenshots/Section 2 - React States and Working With Events/2.10.1.png>)

## 11. Adding Two-Way Binding

We are now going to see how clear the user inputs once the form has been submitted using two-way binding. Two-way binding is a key concept in React.

Two-way binding simply means that for inputs we don't just listen to changes but we can also pass a new value back into the input, so that we can reset or change the input programmatically.

```javascript
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = function () {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  const titleChangeHandler = function (event) {
    setEnteredTitle(event.target.value);

    // // setUserInput({
    // //   ...userInput,
    // //   enteredTitle: event.target.value,
    // // });

    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const amountChangeHandler = function (event) {
    setEnteredAmount(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });

    // setUserInput((prevState) => {
    //   return { ...prevState, enteredAmount: event.target.value };
    // });
  };

  const dateChangeHandler = function (event) {
    setEnteredDate(event.target.value);

    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });

    // setUserInput((prevState) => {
    //   return {
    //     ...prevState,
    //     enteredDate: event.target.value,
    //   };
    // });
  };

  const formSubmitHandler = function (event) {
    event.preventDefault();

    const newExpenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    console.log(newExpenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <div className="expense-form">
      <form onSubmit={formSubmitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2022-01-01"
              max="2024-01-01"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
```

We bind the value attribute to a variable. eg. value={enteredTitle}

```javascript
<input
  type="number"
  min="0.01"
  step="0.01"
  value={enteredAmount}
  onChange={amountChangeHandler}
/>
```

Now, this is two-way binding because now we don't just listen to changes in the input to update the state but we also feed the state back into the input, so that when we change the state, we also change the input.

Now, when the form is submitted.. we can call the setEnteredTitle("") to set it back to an empty string. So, it overrides the input entered by the user after the form was submitted and clear the input.

```javascript
const formSubmitHandler = function (event) {
  event.preventDefault();

  const newExpenseData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };

  console.log(newExpenseData);

  setEnteredTitle("");
  setEnteredAmount("");
  setEnteredDate("");
};
```

#### Output

![Submitting the form using 'Add Expense' button](<../Screenshots/Section 2 - React States and Working With Events/2.11.1.png>)
