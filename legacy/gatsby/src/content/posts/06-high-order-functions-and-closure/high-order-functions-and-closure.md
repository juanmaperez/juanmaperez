---
path: '/blog/closure-high-order-functions'
date: '2021-04-10T12:34:00+00:00'
title: "Closure and high order functions"
type: post
icon: ./../../../assets/icons/javascript.png
category: 'javascript'
tags: ['javascript', "functions", "closure", "high order functions", "javascript closure"]
excerpt: "Closure is one of the most powerful features in Javascript, and used in the right way can bring endless possibilities into your implementations."
---

[High order functions](/high-order-functions-callbacks-inversion-control) are one of the patterns more used in Javascript and one of the reasons is because of a feature that allows us to persist the local memory of a function beyond its invocation, and its name is closure.

Closures will provide us a super powerful tool that will allow us to create complex patterns like currying, once time invokation functions, memoization, even the module pattern which is based on closure as well.

## Returning functions

Functions never remember anything from previous runnings, the local memory created inside them is fresh every time. Everything is deleted but the returned value. 

Nevertheless, there is a way to cache that local memory created inside of that function and make it persist attached to the value returned from that function, and that value __must be another function.__

```javascript 
  function createMultiplier(multiplier){
    function multipy (multiplicand){
      return multiplier * multiplicand
    }
    return multiply
  }
  const multiplyBy2 = createMultiplier(2)

  const value1 = multiplyBy2(10)  // 20
  const value2 = multiplyBy2(4)   // 8
```

Above we are able to persist multiplier, which is within the scope of the multiply function by returning multiply without being executed, that way we attach to it all the lexical environment from where it was created.

As a note, we need to clarify that once multiply is returned from createMultiplier, it has nothing to do with the function where it was created. Once its definition was returned we don't care anymore about createMultiplier but the definition of multiply stored in the variable multiplyBy2.

## Nested function scope

As we know, when returning a function from another function what we are trying to achieve is persist the outer's function scope (__lexical environment__) which is accessible from the function definition returned, and that's because where a function is created determines what data it has access to when it's called.

> Where a function is created determines what data it has access to when it's called

This also applies to functions declared directly in the global memory, and in the next example when we try to execute the expression __counter++__ from inside the increment function, if it doesn't find the variable in its own local memory, it goes straight to look for it in the global memory.  

```javascript 
  let counter = 0;

  function increment (){
    counter++
  }

  increment()
  increment()

  console.log(counter) // 2
```
Inside of a function since increment was declared into the outer function, when it doesn't find counter in its own local memory, tries to find it in the outer's local memory which is still there because we have not finished executing that function.

```javascript 
  function outer() {
    let counter = 0

    function increment(){
      counter++
    }
    increment()
    increment()

    return counter
  }

  console.log(outer()) // 2
```

The only problem with the previous implementation is that the value of the counter doesn't persist further than outers invocation, and that's because we are executing increment inside of the function instead of returning its definition.

## Retain function memory

Let's say that instead of the previous implementation, what we want to do is persist the value of the counter to be taken into account for next runnings of increment.

```javascript 
  function outer() {
    let counter = 0
    function increment(){
      counter++
    }
    
    return increment
  }

  const count = outer()

  count() // 1
  count() // 2
  console.log(count()) // 3
```

In that case, what we are doing is creating an outer function, and declare inside of it our increment function, but instead of invoking increment from inside that function, what we will be doing is returning increment out and storing that function definition into a new variable called count.

From now on, when we invoke count, which contains the definition of increment created inside of outer, It's going to try to find counter in its own local memory and when it doesn't find it, instead of looking for it in the global memory, It will search in the __backpack__ with the information that has taken with it.  

## Closure behind the scenes

You could be wondering, how this works under the hood and the answer is that when we declare the increment function inside of outer, that the function automatically creates a hidden property called __[[scope]]__ that contains all the surrounding data from where it was declared. 

That piece of permanent data is private, we can only access it by running the function. 

As a note, we can say that only the data that will be referenced into the returned function will be added to that persisted memory, the other values inside are garbage collected and not accessible anymore. That's the case of the variable anotherCounter in the example below, since it's not used, it's lost.

```javascript 
  function outer() {
    let anotherCounter = 0;
    let counter = 0
    function increment(){
      counter++
    }
    
    return increment
  }

  const count = outer()

  count() // 1
```

## Multiple Closure instances

To summarizing, we can say that our high order function returns a function which has attached to it the closure or persistent data available when it was declared.

Every time we invoke that high order function we will return a new function with its own and independent data that can be only modified by invoking that reference to the retuned function.

For that reason in the example below, every call to count is modifying a persisted data completely different that the data which is referencing the anotherCount function since every time we ran outer we created a different execution context with a new brand counter in the variable environment bond to the returned function.

```javascript 
  function outer() {
    let counter = 0
    return function (){
      counter++
    }
  }

  const count = outer()
  const anotherCount = outer()
  
  count() // 1
  count() // 2

  anotherCount() // 1
  anotherCount() // 2
 
```

## Closure definition and Scope

For most developers, this persistent piece of memory is called closure, term that also refers to the whole concept of this implementation. In that way we end up getting a vague concept of what clousure is.

But there are other ways to refer to it. Some people also call to the local memory surrounding our returned function as __Variable Environment__ (also lexical environment), and this environment is closed over the function definition that we are returning, so this ends up turning into __COVE, which stands for Closed Over Variable Environment__

There is other technical definition that tries to show a depth of understanding of what's going on in this feature. This is PLSRD which stands for __Persistent Lexically Scoped Referenced Data__.

In a programming language, Scope determines what data is available for every single line of code, and Javascript is a __Lexical or Static Scoped language__ instead of a Dynamic Scoped language. That means that where a function is declared determines what data is available, and not where the function is run.

This leaves us with at least 3 o 4 names for this data:
- Closure
- COVE
- PLSRD
- Backpack

## Wrapping up

We have gone through the concept of closures and all its characteristics. This feature gives great power and an endless variety of possibilities to implement different patterns as we said before. You just need to start experimenting with this amazing feature to assimilate even more what you can achieve with it.