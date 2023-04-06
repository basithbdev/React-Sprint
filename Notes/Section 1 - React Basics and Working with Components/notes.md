# Section 1 - React Basics and Working with Components

## 1. What Are Components? And Why Is React All About Them?

React is a JS library for building UI.

Although you can build UI using HTML, CSS, and JS alone, React makes the process of building complex, interactive and reactive UI much simpler.

React is all about "Components". In React, all UI's are made using components.

#### What are components?

They are re-usable building blocks in the UI. They are a combination of HTML, CSS that is specified for styling the component and possibly some JS for logic.

#### Why components?

i) Re-usability: Don't repeat yourself.

ii) Separation of Concerns: Instead of having large file for HTML,CSS, and JS. We have small separate files with components (that have a specific function); this helps in keeping the code base maintainable and readable.

## 2. React Code Is Written In A "Declarative Way"!

#### How is a component built?

Components are built by combining HTML, and JS (and CSS).

## 3. Creating, Starting and Analyzing a React Project

index.js is the first file that'll run when the production server is deployed.

## 4. Introducing JSX

JSX is basically HTML code inside of JavaScript. JSX stands for JavaScript XML.

```javascript
function App() {
  return (
    // JSX
    <div className="App">
      <h2>Let's get started!</h2>
    </div>
  );
}

export default App;
```

## 5. How React Works

React follows a declarative approach in comparison to JS which uses an imperative approach. We give clear instructions as to what JS and the browser should do but having to write all these instructions become cumbersome.

Using React, we describe the desired end-state and React generates instructions (behind the scenes) to bring the desired end-state on to the screen.

React uses components. A component is basically just a JS function that returns JSX code.

## 6. Building our First Custom Component

In React, we build a component tree. The main component is the <App /> component. Other components are nested/inserted into <App />. Only the top most component in component tree i.e <App /> is rendered into a single HTML page.

#### ExpenseItem.js

```javascript
function ExpenseItem() {
  return (
    <div>
      <h2>Expense Tracker</h2>
    </div>
  );
}

export default ExpenseItem;
```

#### App.js

```javascript
import ExpenseItem from "./components/ExpenseItem";

function App() {
  return (
    <div className="App">
      <h2>Let's get started!</h2>
      <ExpenseItem />
    </div>
  );
}

export default App;
```

## 7. Writing More Complex JSX Code

There should only be one root element inside of a component (or) one root <div>

#### ExpenseItem.js

```javascript
function ExpenseItem() {
  return (
    // Start root div
    <div>
      <div>20th November 2022</div>
      <div>
        <h2>Udemy Courses</h2>
        <div>$10.99</div>
      </div>
    </div>
    // End root div
  );
}

export default ExpenseItem;
```

## 8. Adding Basic CSS Styling

Create a CSS file with your desired styles and import it into your JS file as shown:

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";
```

## 9. Outputting Dynamic Data & Working with Expressions in JSX

We can insert JS expressions inside the {} similar to {expenseTitle}. For example: {1+1}

```javascript
import "./ExpenseItem.css";

function ExpenseItem() {
  const expenseDate = new Date(2022, 10, 2);
  const expenseTitle = "Udemy Courses";
  const expenseAmount = 10.99;

  return (
    <div className="expense-item">
      <div>{expenseDate.toLocaleDateString()}</div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
```

## 10. Passing Data via "props"

Props stands for "properties" and we can set our own custom properties for our components.

React ensures that we get one parameter for every component that we use and the one parameter will be an object that receives all the attributes as properties.

#### App.js

```javascript
import ExpenseItem from "./components/ExpenseItem";

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

  return (
    <div className="App">
      <h2>Let's Get Started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      />
    </div>
  );
}

export default App;
```

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";

function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <div>{props.date.toLocaleDateString()}</div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
```

Here, props is the object that has been passed as a parameter to our <ExpenseItem/> component. We can access the attributes like "title", "amount", and "date" using props.

## 11. Adding "normal" JavaScript Logic to Components

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";

function ExpenseItem(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-item">
      <div>
        <div>{month}</div>
        <div>{year}</div>
        <div>{day}</div>
      </div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
```

## 12. Splitting Components Into Multiple Components

It is generally a good idea to keep your components small and focussed.

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
```

#### ExpenseDate.js

```javascript
import "./ExpenseDate.css";

function ExpenseDate(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
```

## 13. Assignment 1 - Time to Practice: React & Component Basics (Passing Data from One Component to Another)

#### App.js

```javascript
import Expenses from "./components/Expenses";

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

  return (
    <div className="App">
      <h2>Let's Get Started!</h2>
      <Expenses
        item={expenses} // passing the expenses array as 'item'
      />
    </div>
  );
}

export default App;
```

#### Expenses.js

```javascript
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";

function Expenses(props) {
  return (
    <div className="expenses">
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
    </div>
  );
}

export default Expenses;
```

## 14. The Concept of "Composition" ("Children Props")

Building components from smaller building blocks is called "Composition". Whenever you combine components, you are using composition.
Through composition, you can keep your components clean and specific and also avoid code duplication in your components to a certain extent.

An important part of this composition is {props.children} feature which allows you to create wrapper components which is a special type of component.

#### Card.js

```javascript
import "./Card.css";

function Card(props) {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
```

#### ExpenseItem.js

```javascript
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "./Card";

function ExpenseItem(props) {
  return (
    // <Card/> is a wrapper component
    <Card className="expense-item">
      {/* {props.children} refers to the content present from here */}
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* to here */}
    </Card>
  );
}

export default ExpenseItem;
```

#### Expenses.js

```javascript
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "./Card";

function Expenses(props) {
  console.log(props);
  return (
    // <Card/> is a wrapper component
    <Card className="expenses">
      {/* {props.children} refers to the content present from here */}

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
      {/* to here */}
    </Card>
  );
}

export default Expenses;
```

## 15. A Closer Look At JSX

An alternative to the JSX code written while building components would be the code that was written earlier. This code that was written without the use of JSX shows us how React renders components under the hood.

Let's just call the old way of writing code (read as building components) without JSX as "under the hood" code.

#### App.js

```javascript
import React from "react"; // earlier you had to import React wherever a component was used, it's not required when writing components with JSX.
import Expenses from "./components/Expenses";

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

  // a. building components without JSX (under the hood code)

  return React.createElement(
    "div",
    {},
    React.createElement("h2", {}, "Let's Get Started!"),
    React.createElement(Expenses, { item: expenses })
  );

  // b. building components with JSX

  // return (
  //   <div className="App">
  //     <h2>Let's Get Started!</h2>
  //     <Expenses
  //       item={expenses} // passing the expenses array as 'item'
  //     />
  //   </div>
  // );
}

export default App;
```

So, this is alternative to the JSX code using the React object

React.createElement() take multiple arguments:

i) The first argument is the element which should be created.

ii) The second argument is an object that configures the element, specifically an object which sets all the attributes of this element.

iii) The third argument is now the content between the opening and closing tags of the element

Actually it's not just a third argument, you can have an infinitely long list of arguments.

You could write your entire React app using the "under the hood" code technique which involves using React objects instead of JSX, but it'll be too hard to read and quickly understand.

This under-the-hood code gets created automatically when you use JSX.

## 16. An Alternative Function Syntax

Instead of normal function declaration, you could also use arrow functions to create components as shown below:

#### App.js

```javascript
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  // arrow function
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

  return (
    <div>
      <h2>Let's Get Started!</h2>
      <Expenses
        item={expenses} // passing the expenses array as 'item'
      />
    </div>
  );
};

export default App;
```

## 17. Quiz 1: Learning Check: React Basics, Components, Props & JSX

#### Question 1: Which kind of code do you write when using React.js?

Answer:

Declarative JS code. With React.js, you define the "goal" (i.e. what should be shown on the screen) and let React figure out how to get there.

#### Question 2: What is "JSX"?

Answer:

JSX ( JavaScript Syntax Extension and occasionally referred as JavaScript XML) is a React extension to the JavaScript language syntax which provides a way to structure component rendering using syntax familiar to many developers. It is similar in appearance to HTML.

React projects like the ones we create via "create-react-app" support JSX syntax. It gets compiled to standard JS code behind the scenes.

#### Question 3: Why is React all about "Components"?

Answer:

Every UI in the end is made up of multiple building blocks (i.e. components), hence it makes sense to think about user interfaces as a "combination of components".

"Components" are really just a way of thinking about user interfaces. React embraces that concept and gives you tools to build components that you can then combine.

#### Question 4: What does "declarative" mean?

Answer:

You define the desired outcome (e.g. a target UI) and let the library (React) figure out the steps.

You define the target "state" (UI) and React figures out which JS commands need to be executed to bring that result to life.

#### Question 5: What is a "React Component"?

Answer:

It's a JS function which typically returns HTML (read as JSX) code that should be displayed.

A component is just that: A JS function that typically returns some HTML (or, to be precise: JSX) code which will be shown on the screen when that component is used.

#### Question 6: How many custom React components must a React app have?

Answer:

It's totally up to you. You can have as many React components as you want / need.

#### Question 7: Which statement is correct?

Answer:

With React, you build a component tree with one root component that's mounted into a DOM node. That is, you build a component tree that has one root node.

#### Question 8: What does "component tree" mean?

Answer:

It means that you have a root node which then has more components nested beneath it.

You build a tree by nesting components into each other - just as you build a HTML tree when building a standard HTML document.

#### Question 9: How do you pass data between components?

Answer:

Via "custom HTML attributes" (better known as "props").

You build your own "HTML elements" in the end, hence you can also define your own attributes (called "props" in React's world)

#### Question 10: How can you output dynamic data in React components (i.e. in the returned JSX code)?

Answer:

You can use single curly braces (opening and closing) with any JS expression between them.

You can't put block statements (e.g. if statements) between those curly braces but you can output any result of any JS expression by using this special feature.
