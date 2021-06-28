---
path: '/blog/high-order-functions-callbacks-inversion-control'
date: '2021-04-05T12:34:00+00:00'
title: "High order functions, callbacks, and inversion of control"
type: post
icon: ./../../../assets/icons/javascript.png
category: 'javascript'
tags: ['javascript', "functions", "callbacks", "high order functions", "inversion of control"]
excerpt: "Functions are one of the basics parts of Javascript. They are really powerful but it depends on ourselves when we declare them how powerfull they can be."
---

Functions are one of the most important tools we have to make a task in Javascript. We can declare them and use them in different places of our application.

We can use them to make operations such as calculate ten squared which is gonna return 100 every single time that we invoke that function.

```javascript 
  function tenSqured() {
    return 10 * 10
  }

  tenSquared() // 100
```

And we could do this for every single calculation that we want, nine squared, eight squared, but creating functions in this way it would be hard to track and maintain, and we would be breaking the DRY rule (Don't repeat yourself).

For that reason, we should create functions based on functionalities, not in data. In that way, we can declare a function that receives a number of parameters, and we must implement our code to handle that data in the way that our functionality requires.

Let's say we create the function multiplyBy2, which receives a parameter called num, which is the number we will be multiplying by 2, and the result of invoking that function is going to be the same when the argument passed is the same value.

```javascript 
  function multiplyBy2(num) {
    return num * 2
  }

  multiplyBy2(5)  // 10
  multiplyBy2(10) // 20
```

## High order functions

High order functions are those functions that makes one of this two things 
  - returns a function
  - receives a function as an argument.

These functions are based on the same principle of functionality that is based on our multiplyByTwo function but it goes a bit further as it can pass the whole functionality as a parameter.

Let's think about a function that receives an array and multiplies by two every single item in the array and returns a new brand array with the results of those operations.

```javascript
  function copyAndMultiplyByTwo(arr){
    const output = []
    for(let num of arr){
      output.push(num * 2)
    }
    return output
  }
  
  copyAndMultiplyByTwo([2, 4, 6])   // [4, 8, 12]
```

This function does its job but it's not reusable for multiplying by other numbers or maybe we want to addTwo instead of multiplying. 

That's when High order functions show their power allowing us to wrap the whole functionality into another function and pass it as an argument to be executed into the function.

These functions that wrap the functionality and are passed into another function are called callbacks.

```javascript
  function multiplyBy2(num) {
    return num * 2
  }

  function addTwo(num) {
    return num + 2
  }

 function copyAndModify(arr, cb){
    const output = []
    for(let num of arr){
      output.push(cb(num))
    }
    return output
  }

  copyAndModify([2, 4, 6], multiplyBy2)   // [4, 8, 12]
  copyAndModify([2, 4, 6], addTwo)       // [4, 6, 8]
```

Converting the old copyAndMultiplyByTwo function in the high order function called copyAndModify we have avoided rewriting the for of loop for every single case that we would like to implement, and instead, we only need to pass a callback function which is gonna decide what we are going to do with each result.


## Inversion of control

Hight order functions and callbacks are a really powerful tool that allows us to get improve our abstraction and cover more case scenarios in our implementations allowing other developers what to do with the data they are passing into the function. 

This kind of implementation inverts the control over the original function making to a developer who is using your function responsible for the different case scenarios and how to deal with them.

Going back to our copyAndMultiplyByTwo function which accepts an array. Let's say we have created this function as a library to be used by other developers, and one of the requests that in the case that one of the items of the array is undefined, we should return 0.

Let's implement the change:


```javascript
  function copyAndMultiplyByTwo(arr){
    const output = []
    for(let num of arr){
      const result ? num === undefined ? 0 : num * 2
      output.push(result)
    }
    return output
  }
```

And then someone requires the same but for null values:

```javascript
  function copyAndMultiplyByTwo(arr){
    const output = []
    for(let num of arr){
      const result ? num === undefined || num === null ? 0 : num * 2
      output.push(result)
    }
    return output
  }
```

More requirements mean more exceptions in the implementation, and more code changes in the code, and for sure more complexity. 

However, in the case of our function copyAndModify, the inversion of controls make responsible to the developer of the exceptions that he needs to handle and how to implement it in a way that is safe for their app, and this is one of the more valuable features of high order function in combination with callbacks.

