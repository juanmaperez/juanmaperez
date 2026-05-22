---
path: "/blog/demystifying-useReducer-hook"
date: "2021-11-30T19:00:00+00:00"
title: "Demystifying the useReducer hook"
type: post
icon: ./../../../assets/icons/react.png
category: "react"
tags: ["react", "hooks API", "useReducer", "useReducer API", "React.useReducer"]
excerpt: "useReducer can be a bit confusing and some people avoid using this hook for complex state management."
---

The useReducer hook can be a bit confusing if you never worked with Redux, lots of people avoid using this hook for complex state management and instead implement a bunch of useState.

The complexity of useReducer is not such, but the fact of receiving a reducer and an initial state makes it look a bit more complex than useState.

## Motivation.

The useState can get you a really long way with React state management but you might want to separate your state logic from the actual component that makes your state change. Also, using an object to manage different pieces of state that change with same action might be handy.

## Basic implementation

As we said, useReducer accepts 2 parameters:

1. **Reducer**: a function that receives 2 parameters: `state` (is the current state) and `action` (whatever is passed to update the state)

2. **initialState**: initial value for our state

Also it's gonna return 2 values:

1. **current state**
2. **Dispatch function**: used to update the state.

### Replicating useState

With that said, let's make a start replicating the behavior of useState but with useReducer, that way we can see the differences and similarities between both hooks

```js
const [count, setCount] = React.useState(0)
const increment = () => setCount(count + 1)

// =========================

function countReducer(state, newState) {
  return newState
}

const [count, setCount] = React.useReducer(countReducer, 0)
const increment = () => setCount(count + 1)
```

Now we have achieved the same behavior but with different hooks.

This implementations is too simple and basically we are passing into the dispatch(setCount) the new value that we want for our state.

### Update the state base on the action(step).

Now let's change our useReducer in a way that our action is actually determining the state of the useReducer is gonna change, and we can achieve that passing the step that we want to increment our previous state, and we can change the name from the dispatch function from `setCount` to `updateCount`.

```js
const step = 2
const [count, setCount] = React.useState(0)
const increment = () => setCount(count + step)

// =========================

function countReducer(state, step) {
  return state + step
}

const step = 2
const [count, updateCount] = React.useReducer(countReducer, 0)
const increment = () => updateCount(step)
```

This looks great! Our useReducer seems to be doing the same as our useState hook.

### state and action as objects.

When stateful components in React where based on classes and we used `this.setState` to update our state, we used to pass an object because the state was managed as an object. And only the properties that we passed were the ones updated in our state.

Let's change our implementation of useReducer to manage the state as an object, but also receive the action with the properties that we want to update. Besides, the values returned by our useReducer are not longer representing our state because it has become more complex than `count` and `updateCount`, we will use instead `state` and `setState`:

Also the countReducer will change its previous behavior to return a the new state based on the action received, updating the properties that are overlapping between each other.

```js
function countReducer(state, action) {
  return { ...state, ...action }
}

const step = 2
const [state, setState] = React.useReducer(countReducer, { count: 0 })

const { count } = state
const increment = () => setState({ count: count + step })
```

### SetState can receive either an object or a function

As you might remember, `this.setState` was able to receive either an object to update the state or a callback which received the current state of our component and returns an object with the properties that we want to update. And that's the next step in our implementation.

```js
const step = 2
const [state, setState] = React.useReducer(countReducer, { count: 0 })

const increment = () =>
  setState(currentState => ({
    count: currentState.count + step,
  }))
```

To support that behavior we need to handle in our `countReducer` the possibility of our `action` being an object or a function which receives the current state and returns the properties that we want to update in the state. And we need to spread both of them.

```js
function countReducer(state, action) {
  return {
    ...state,
    ...(typeof action === "function" ? action(state) : action),
  }
}
```

It might seem that supporting the function doesn't add much value, but it actually it's really important to delegate the control over whoever is using our API ([inversion of control]('/high-order-functions-callbacks-inversion-control')).

### Using the reducer convention on dispatch and reducer

This implementation so far is really cool, and we could use useReducer in the way that we are using it right now. Although, the convention inherit from Redux is based on dispatching an action containing the type of action and an optional payload `{ type: "DECREMENT", step: 2 }`, and depending of the type of action, update the state based on the payload.

So now our implementation is gonna change completely and our reducer will have a switch statement to update our state based on the type of action and will return the new piece of state. And as we said that action will be dispatched by our `dispatch` function was called setState previously.

```js
function countReducer(state, action) {
  switch(action.type){
    case "INCREMENT":
      return {
        count: state.count + action.step
      }
    case "DECREMENT":
      return: {
        count: state.count - action.step
      }
    default:
      throw new Error('Unsupported action type')
  }
}

const step = 2
const [state, dispatch] = React.useReducer(countReducer, { count: 0 })

const increment = () => dispatch({ type: "INCREMENT", step }))

const decrement = () => dispatch({ type: "DECREMENT", step }))

```

Now we can dispatch different actions and our reducer will return our new state based on the type and will use the step to increase in an amount step the count.

Also we will be throwing an error in the case of an unsupported action type.

## Bottom Line

As we saw here the useReducer hook API is much more flexible than we thought. It's true there is a convention on how implement your reducer but it's not a requirement to implement useReducer, although it's a great convention and it improves the maintainability as our reducer gets more complex.
