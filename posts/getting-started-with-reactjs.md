---
title: "Getting Started with ReactJS"
date: "2022-10-17"
image: getting-started-reactjs.jpg
excerpt: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. 
isFeatured: false
---

# Tutorial: Intro to React

This tutorial doesn’t assume any existing React knowledge.

## [](#before-we-start-the-tutorial)Before We Start the Tutorial

We will build a small game during this tutorial. **You might be tempted to skip it because you’re not building games — but give it a chance.** The techniques you’ll learn in the tutorial are fundamental to building any React app, and mastering it will give you a deep understanding of React.

> **Tip**
>
> This tutorial is designed for people who prefer to **learn by doing**. If you prefer learning concepts from the ground up, check out our [step-by-step guide](/docs/hello-world.html). You might find this tutorial and the guide complementary to each other.

The tutorial is divided into several sections:

- [Setup for the Tutorial](#setup-for-the-tutorial) will give you **a starting point** to follow the tutorial.
- [Overview](#overview) will teach you **the fundamentals** of React: components, props, and state.
- [Completing the Game](#completing-the-game) will teach you **the most common techniques** in React development.
- [Adding Time Travel](#adding-time-travel) will give you **a deeper insight** into the unique strengths of React.

You don’t have to complete all of the sections at once to get the value out of this tutorial. Try to get as far as you can — even if it’s one or two sections.

### [](#what-are-we-building)What Are We Building?

In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React.

You can see what we’ll be building here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax.

We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.

You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.

### [](#prerequisites)Prerequisites

We’ll assume that you have some familiarity with HTML and JavaScript, but you should be able to follow along even if you’re coming from a different programming language. We’ll also assume that you’re familiar with programming concepts like functions, objects, arrays, and to a lesser extent, classes.

If you need to review JavaScript, we recommend reading [this guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Note that we’re also using some features from ES6 — a recent version of JavaScript. In this tutorial, we’re using [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements. You can use the [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA) to check what ES6 code compiles to.

## [](#setup-for-the-tutorial)Setup for the Tutorial

There are two ways to complete this tutorial: you can either write the code in your browser, or you can set up a local development environment on your computer.

### [](#setup-option-1-write-code-in-the-browser)Setup Option 1: Write Code in the Browser

This is the quickest way to get started!

First, open this **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** in a new tab. The new tab should display an empty tic-tac-toe game board and React code. We will be editing the React code in this tutorial.

You can now skip the second setup option, and go to the [Overview](#overview) section to get an overview of React.

## [](#overview)Overview

Now that you’re set up, let’s get an overview of React!

### [](#what-is-react)What Is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

React has a few different kinds of components, but we’ll start with `React.Component` subclasses:

```jsx
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

We’ll get to the funny XML-like tags soon. We use components to tell React what we want to see on the screen. When our data changes, React will efficiently update and re-render our components.

Here, ShoppingList is a **React component class**, or **React component type**. A component takes in parameters, called `props` (short for “properties”), and returns a hierarchy of views to display via the `render` method.

The `render` method returns a _description_ of what you want to see on the screen. React takes the description and displays the result. In particular, `render` returns a **React element**, which is a lightweight description of what to render. Most React developers use a special syntax called “JSX” which makes these structures easier to write. The `<div />` syntax is transformed at build time to `React.createElement('div')`. The example above is equivalent to:

```jsx
return React.createElement(
  "div",
  { className: "shopping-list" },
  React.createElement("h1" /* ... h1 children ... */),
  React.createElement("ul" /* ... ul children ... */)
);
```

[See full expanded version.](https://babeljs.io/repl/#?presets=react&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA)

If you’re curious, `createElement()` is described in more detail in the [API reference](/docs/react-api.html#createelement), but we won’t be using it in this tutorial. Instead, we will keep using JSX.

JSX comes with the full power of JavaScript. You can put _any_ JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.

The `ShoppingList` component above only renders built-in DOM components like `<div />` and `<li />`. But you can compose and render custom React components too. For example, we can now refer to the whole shopping list by writing `<ShoppingList />`. Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.

### [](#inspecting-the-starter-code)Inspecting the Starter Code

If you’re going to work on the tutorial **in your browser,** open this code in a new tab: **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. If you’re going to work on the tutorial **locally,** instead open `src/index.js` in your project folder (you have already touched this file during the [setup](#setup-option-2-local-development-environment)).

This Starter Code is the base of what we’re building. We’ve provided the CSS styling so that you only need to focus on learning React and programming the tic-tac-toe game.

By inspecting the code, you’ll notice that we have three React components:

- Square
- Board
- Game

The Square component renders a single `<button>` and the Board renders 9 squares. The Game component renders a board with placeholder values which we’ll modify later. There are currently no interactive components.

### [](#passing-data-through-props)Passing Data Through Props

To get our feet wet, let’s try passing some data from our Board component to our Square component.

We strongly recommend typing code by hand as you’re working through the tutorial and not using copy/paste. This will help you develop muscle memory and a stronger understanding.

In Board’s `renderSquare` method, change the code to pass a prop called `value` to the Square:

```jsx
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Change Square’s `render` method to show that value by replacing `{/* TODO */}` with `{this.props.value}`:

```jsx
class Square extends React.Component {
  render() {
    return <button className="square">{this.props.value} </button>;
  }
}
```

Before:

![Tictac empty](tictac-empty.png)

After: You should see a number in each square in the rendered output.

![Tictac numbers](tictac-numbers.png)

**[View the full code at this point](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Congratulations! You’ve just “passed a prop” from a parent Board component to a child Square component. Passing props is how information flows in React apps, from parents to children.

### [](#making-an-interactive-component)Making an Interactive Component

Let’s fill the Square component with an “X” when we click it. First, change the button tag that is returned from the Square component’s `render()` function to this:

```jsx
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={function () {
          console.log("click");
        }}
      >
        {" "}
        {this.props.value}
      </button>
    );
  }
}
```

If you click on a Square now, you should see ‘click’ in your browser’s devtools console.

> **Note**
>
> To save typing and avoid the [confusing behavior of `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), we will use the [arrow function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for event handlers here and further below:
>
> ```jsx
> class Square extends React.Component {
>   render() {
>     return (
>       <button className="square" onClick={() => console.log("click")}>
>         {" "}
>         {this.props.value}
>       </button>
>     );
>   }
> }
> ```
>
> Notice how with `onClick={() => console.log('click')}`, we’re passing _a function_ as the `onClick` prop. React will only call this function after a click. Forgetting `() =>` and writing `onClick={console.log('click')}` is a common mistake, and would fire every time the component re-renders.

As a next step, we want the Square component to “remember” that it got clicked, and fill it with an “X” mark. To “remember” things, components use **state**.

React components can have state by setting `this.state` in their constructors. `this.state` should be considered as private to a React component that it’s defined in. Let’s store the current value of the Square in `this.state`, and change it when the Square is clicked.

First, we’ll add a constructor to the class to initialize the state:

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }
  render() {
    return (
      <button className="square" onClick={() => console.log("click")}>
        {this.props.value}
      </button>
    );
  }
}
```

> **Note**
>
> In [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), you need to always call `super` when defining the constructor of a subclass. All React component classes that have a `constructor` should start with a `super(props)` call.

Now we’ll change the Square’s `render` method to display the current state’s value when clicked:

- Replace `this.props.value` with `this.state.value` inside the `<button>` tag.
- Replace the `onClick={...}` event handler with `onClick={() => this.setState({value: 'X'})}`.
- Put the `className` and `onClick` props on separate lines for better readability.

After these changes, the `<button>` tag that is returned by the Square’s `render` method looks like this:

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}{" "}
      </button>
    );
  }
}
```

By calling `this.setState` from an `onClick` handler in the Square’s `render` method, we tell React to re-render that Square whenever its `<button>` is clicked. After the update, the Square’s `this.state.value` will be `'X'`, so we’ll see the `X` on the game board. If you click on any Square, an `X` should show up.

When you call `setState` in a component, React automatically updates the child components inside of it too.

**[View the full code at this point](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**
