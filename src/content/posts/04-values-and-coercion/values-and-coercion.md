---
path: '/blog/values-and-coercion'
date: '2021-04-03T12:34:00+00:00'
title: "Values and coercion"
type: post
icon: ./../../../assets/icons/javascript.png
category: 'javascript'
tags: ['javascript', 'coercion', "variables javascript", "javascript engine", "javascript values"]
excerpt: "How many times have you heard the fact that doubles equals check the value but not the type while three equals check both"
---

It's been a few times that I have heard someone saying that I should use triple equals when comparing values because in that way I will be comparing not just the value but also the type of that value.

An example of that case would be something like comparing a number, maybe 2, with a string like "2". Depending on how we compare these two values we can get different results.

This is called equality between two values where two equals are loose equality comparison and the three equals are called strict equality

```javascript
  console.log(2 == "2") // true

  console.log(2 === "2") // false 
```

We have assumed that the difference between both results it's basically that it's because the three equals are checking the type and the value and the two equals one is only checking the value. 

The thing it's both of them are checking the types, but the triple equal comparison is returning false at the very first moment those types don't match.

On the other hand, the double equal will try a completely different approach, and that approach is called coercion.

## Coercion in our code.

Coercion is basically typing coversion, as it's called in EcmaScript spec. There are different abstract operations that are in charge of this type of conversion when it's needed. ToPrimitive(), ToString(), ToNumber() or ToBoolean() will help us to achieve that type conversion.  

but, when coercion takes place? We have always heard that coercion is something that we should avoid because it can make us commit terrible mistakes but at the same time, we should say that this is a very powerful feature in Javascript.

### Number to String

We bear in mind that thought telling us that coercion is evil, but we use coercion all the time in one of the features more loved by everyone like the template interpolation.

```javascript
  console.log(2 == "2") // coercion and evil

  const age = 18

  const introduction = `My name is Jack and I'm ${age} years old` // coercion but great
```

Actually, what we are doing is a type conversion of the value for the variable age from a number to a string, and inserting that value within two strings will create another string which, later, will be assigned to the introduction variable.

```javascript
  const age = 18

  const part1 = `My name is Jack and I'm`
  const part2 = `years old`

  console.log( part1 + age + part2)
```

We can say that this is the way implicit to do coercion and the one that sometimes we don't even know we are doing. There are other ways to do it more explicitly like using the method String().

```javascript
  const age = 18

  const introduction = `My name is Jack and I'm ${String(age)} years old` 
```

This was an example of coercion from number to string but how this could happen the other way around, a string into a number.

### String to Number 

All of us have dealt at some point with some elements in web development like forms that return a string and we are expecting to deal with that as a number in our functionality but it's not, causing unexpected behavior in our application.

Let's think about a function called addTwo, which is gonna receive a parameter called num but, depending on the type of that parameter is gonna return different values. 

```javascript
  const addTwo = (num) => {
    return num + 2
  }

  // number
  console.log(addTwo(2)) // 4

  // string
  console.log(addTwo("2")) // Ops! 22
```

How we could be explicit about coercing a string into a number, well the same we did in our previous case but using the Number() function instead of the String()

```javascript
  const addTwo = (num) => {
    return num + 2
  }

  console.log(addTwo(Number("2"))) // 4
```

Even we could pass that string into a number in an implicit way that it's not telling what it's doing as the Number() function but it's doing the type conversion behind the scenes, like adding the add operator in front of the parameter.

In that case, the + will do coercion to our parameter passing it into a number when it's needed and when it's able to do it. 

```javascript
  const str = "4"

  const addTwo = (num) => {
    return num + 2
  }

  console.log(addTwo(+str))) // 6
```

### String to Boolean

And what about booleans. I'm pretty sure that at some point you have used an if statement to check if you are receiving an empty string, without comparing with a proper empty string the variable itself.

```javascript
 const myString = ""

  // Doing this 
  if(myString){
    // do something
  }

  // Instead of this
  if(myString === ""){
    // do something
  }
```

Well, in that case, what we are doing is coercing myString to a boolean since the if statement what it's expecting is an operation that evaluates on true or false like it's doing (string === "")

There are other ways to make implicit coercion with number or strings and one of them could be the double exclamation mark in front of our value

```javascript
  const myString = ""
  const myNumber = 2
  
  if(!!myString){ // false
  }

  if(!!myNumber){ // true    
  }
```

or as we saw also there is an explicit way to do it, with the function Boolean().

```javascript
  const myString = "myString"
  
  if(Boolean(myString)){ // true
  }
```

## Understanding coercion is important.

There are different corner cases for coercion when values interact with each other and some of them can be really unexpected but they are happening even when we don't know about it.

The thing's coercion could bring confusion to our codebase, and I'm not saying that you should use coercion within your app, but at least understand how it works would help a lot to understand what's going on when it happens implicitly in your code.

