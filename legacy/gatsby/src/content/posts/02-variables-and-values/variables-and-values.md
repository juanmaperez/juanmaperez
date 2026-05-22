---
path: '/blog/variables-and-values-javascript'
date: '2019-06-26T12:34:00+00:00'
title: "Variables and values in Javascript"
type: post
icon: ./../../../assets/icons/javascript.png
category: 'javascript'
tags: ['javascript', "variables javascript", "javascript engine", "javascript values"]
excerpt: "Getting into a new programming language, most of the time, starts in the same way, declaring a variable and setting a value in that variable and it's really important to know how they work together."
---

Getting into a new programming language, most of the time, starts in the same way, declaring a variable and setting a value in that variable. 

```javascript
  let person = "Michael" 
```

We can think about this line of code in different ways and it could be caused by multiple reasons. Maybe you can just assume how it will behave or bring your knowledge from other programming languages and apply the same logic in this scenario.

## The relationship between variables and values.

Let's think about an specific scenario:

```javascript
  let childOne = "Mark"

  let childTwo = childOne

  childOne = childOne + 'us' 
```

Let's say someone decides to call her child Mark, and a friend of hers decides to call her child after her child's name. A few days later, the first person thinks about all the mess that will cause when they go together to the park and also decides to add 'us' at the end of his child’s name, ending up as Markus.

That piece of code leaves us with two children where childOne is now called Markus and the childTwo is called Mark. 

Some people think about variables as a container where you store values isolated from external changes, but let's try a more complex example:

```javascript
  let childOne = { name: "Mark" }

  let childTwo = childOne

  childOne.name = childOne.name + 'us'
```

This example represents the same case scenario but with a more complex value, being an object instead of a simple string. We could think that we are having the same result from this change but what we are actually doing is changing the name to "Markus" for both of the children.

This kind of bug is caused by the idea we build in our heads about variables as containers and the values and the nature of the value itself. 

## It's all about the values.

Let's start talking about the concept of variables. I like to think of variables as pointers or wires to values. When we declare a variable and assign a value to it, we are only pointing that variable name to a specific value.

There are two different groups of values:

* primitives
* objects and functions

In the first group, we can add different types of values like strings, numbers, booleans, bigInts, symbols, null and undefined. On the other hand, the second group of functions and objects. If you are wondering where I left arrays, let me clarify that arrays are objects.

These two groups behave in different ways and one of the most important differences between them is that primitive values are immutable, and objects and functions are manipulable.

Let's look at the first example and explain what it's going on there:

```javascript
  let childOne = "Mark"

  let childTwo = childOne

  childOne = childOne + "us" 
```

1. Create a variable called childOne and point it to the string value "Mark"
2. Create a variable called childTwo and point it to the same value
3. Change the pointer to a different value, "Markus" result of evaluating the expression childOne + "us"

The third step is the key in this example because we were thinking that what we were doing was modifying the value, but we can't do that. In a different way what we are doing is pointing our variable to a completely different value returned from our addition expression (+).


But in the second example, we are doing a completely different thing. Let's go through it: 

```javascript
  let childOne = { name: "Mark" }

  let childTwo = childOne

  childOne["name"] = "Markus"
```

1. Create a variable called childOne and point it to the object value { name: "Mark" }
2. Create a variable called childTwo and point it to the same value
3. Modifying the property name of the object value that our two variables are pointing to.

In this case scenario, we can see that we are modifying the property name of the object value that we are pointing through the variable childOne. 

## Verifying strings` immutability

Maybe you are a bit confused about the example that we just saw but we can try to modify the value of a string instead of using an expression that evaluates in a specific value.

We can try to modify the name of one of the children just switching a few letters, passing from Mark to Jack.

In the same way that we can access properties in objects, we can access the string because they are ropes or data structures of strings. 

Then assuming we can do this:

```javascript
  let childOne = { name: "Mark" }
  console.log(childOne["name"])  // Mark

  childOne["name"] = "Markus"
  console.log(childOne["name"])  // Markus
```

We should be able to do the next thing

```javascript
  let child =  "Mark"
  console.log(child[0])  // M

  child[0] = "J"
  child[2] = "c"
  console.log(childOne["name"])  // Jack ??
```

But unfortunately, we are not, and that's because as we said before primitive values are immutable.

## Wrapping up

This could be a bit confusing, and It can take a few minutes to assimilate but It's really important to understand the nature of the values that we are using in our code to realize what we are actually doing. 
