---
path: '/blog/how-javascript-engine-works'
date: '2018-05-18T12:34:00+00:00'
title: "How javascript engine works"
type: post
icon: ./../../../assets/icons/javascript.png
category: 'javascript'
tags: ['javascript', "basic javascript", "javascript engine", "hoisting", "execution context"]
excerpt: "If we want to understand how javascript works beyond your code, you need to know three different concepts or ideas that you will see repeated throughout the rest of your life as a programmer."
---

If we want to understand how javascript works beyond your code, you need to know three different concepts or ideas that you will see repeated throughout the rest of your life as a programmer.

* Syntax Parser,
* Lexical Environment,
* Execution Context.

## Syntax parser.
It’s a program that reads your code and determines what it does and if its grammar is valid. Your code is not magic, someone else wrote a program to translate it for the computer.

These programs are interpreters, also known as compilers. Compilers work reading your code character by character and they implement that syntax in a way that computer can understand.

For example:

```js
  function hello() { var a = "Hello world" }
```

This program starts reading F-U-N-C-T-I-O-N and when it finishes it determines that you have declared a function, and after this continues and identifies a variable inside of it.

## Lexical environment

It’s about where something sits physically in the code you write. __A lexical environment exists in programming in which where you write something is important__. This happens because the order determines how these elements will interact with other variables and functions.

Compilers care about where you put things. They make decisions about where something is and what is surrounding it.

## Execution context: creation and hoisting

The execution context is a wrapper to help manage the code that is running. There are a lot of lexical environments. And one of them is currently running via execution contexts. It can contain things beyond what you have written in your javascript code.

The execution context is composed of two phases: __creation and execution__ and we will need a variable and a function if we want to explain how both of them work:

```javascript
  var a = "Hello world"; 

  function b (){ 
    console.log("Called ¡b!") 
  } 

  b(); 
  console.log(a)   
    
  // Called b! 
  // Hello World
```

When we execute this code It will show what we expected but if we would put the call to the function and the variable log at the top of the javascript file, it showed that the variable a wasn’t defined with a value instead of return an error as usual in other programming languages:

```javascript
  b(); 
  console.log(a) 

  var a = "Hello world"; 

  function b (){ 
    console.log("Called b!") 
  } 

  // Called b! 
  // undefined
```

Some people think that this happens because the javascript engine moves all the functions and variables, created along the all entire code, to the top of the file. But how it really works is through the Creation phase where hoisting is created:

* Global Object
* ‘this’
* Outer Environment
* and the Hoisting

Javascript engine has already set hoisting, a memory space for variables and function that you’ve created in that entire code that you’ve built. All this mean that when the code is executed line by line, this variables and function already exist.

However, functions are entirely placed into memory space, that means that the function is named and the code inside but variables are only created, their value is not assigned yet. It’s in the next phase, the execution phase, where these kinds of assignments are set, where variable equals something.

Then, the variable is executed but how it has not a value assigned instead of return and error, javascript engine puts a placeholder called undefined.

## Different between undefined and not been defined

In javascript, we have two different ways to define a variable. It could be when we assign a value or when the own engine of the programming language assigns the value automatically as undefined. In another hand, if we never create a variable, the browser will show us an Uncaught referenceError: variable is not defined.

In the first case, we can create a variable like this:

```javascript
  var a = "Hello World";

  console.log(a) // Hello World
```

and we will see that the browser shows that the browser returns the value Hello World. But if we try to create another variable b without a value:

```javascript
  var b;
  console.log(b) // undefined

  var b;
  console.log(b) // undefined
```

In this case, the variable has been created and the console log shows the variable as undefined but this is confusing. __Because our variable has a value assigned automatically by the javascript engine with the special keyword undefined.__ For this reason, we don’t get an error when we refer to the variable b.

However, if we would have tried to log a variable that we have never declared before like this:

```javascript
  console.log(c) 
  // Uncaught ReferenceError : c is not define
```

It will give you an error because when that initial execution context creation, in that creation phase, when Javascript engine went trough memory space, it didn’t find a var c so it doesn’t have c in memory at all.

## Wrapping up

We have seen 3 different concepts and all work together to get javascript working: 

We can say that the __syntax parser__ is the piece that it's gonna read what we have written to indentify what we are trying to achieve. Besides we have a __lexical context__ that gives an lexical environment to our commands according to interact with each other. And finally we got a __execution context__ that it's gonna read our code, save it on its corresponding memory space and execute it.
