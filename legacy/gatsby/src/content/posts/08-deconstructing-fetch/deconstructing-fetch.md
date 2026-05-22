---
path: "/blog/deconstructing-fetch-browser-api"
date: "2021-11-25T19:00:00+00:00"
title: "Deconstructing the Fetch API"
type: post
icon: ./../../../assets/icons/javascript.png
category: "javascript"
tags: ["javascript", "fetch API", "fetch", "typescript", "fetch browser API"]
excerpt: "Fetch is one of the most used APIs in our projects but not everyone knows about all the features available."
---

Fetch is one of the most used API from the browser. We take advantage of this API to perform http requests such as `POST`, `GET`, `PUT`, `PATCH` or `DELETE`, but not everyone knows all the features that it offers.

Basically, the Fetch API provides an easy and logical way to retrieve resources asynchronously across the network.

## Fetch method and Response object.

The Fetch API provides a global <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch" target="_blank">fetch() method</a>, which is a better alternative than the old `XMLHttpRequest` and `jQuery.ajax()`, with significant differences:

- `fetch()` won't reject on HTTP error status even if the response is an 404 or 500, instead will resolve with the `ok` property set to false

- won't send cross-origin cookies.

The simplest use of fetch takes one argument, the path to the resource you want to fetch.

```js
const res = await fetch("http://example.com/movies")
```

If you are wondering what type of object is returning the fetch method, it's just a promise that resolves in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Response" target="_blank">Response</a> to our request, and this is the way that you'll most likely find this type of object.

## Request

As we said before, `fetch()` can receive more than one argument, the first one is the path of the resource and the second is an object containing any custom settings that you want to apply to request (method, headers, body, mode, credentials, cache, etc).

```js
const res = await fetch("http://example.com/movies", {
  headers: { accept: "application/json" },
})
```

We basically pass to the `fetch()` method all the arguments that we need for our request but, did you know that there is actually a Request constructor?

```js
const req = new Request("http://example.com/movies", {
  headers: { accept: "application/json" },
})
```

You can use both together, the Request constructor is kinda like a way to describe a request, and the fetch is kinda like telling the JavaScript environment to actually execute the described request.

```js
const req = new Request("http://example.com/movies", {
  headers: { accept: "application/json" },
})

const res = await fetch(req)
```

## Headers

Another API that you might not be familiar with is the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Headers" target="_blank">Headers API</a>, which has associated a list of headers, but also methods to perform actions such as retrieving, setting or removing headers from the list.

```js
const headers = new Headers({ accept: "application/json" })
headers.append("Set-Cookie", "some_cookie=cookie-value")

const req = new Request("http://example.com/movies", {
  headers,
})

const res = await fetch(req)
```

Also is worth saying that the Headers are present in the request but also in the response, and they can be accessed via Request.headers and Response.headers

```js
const res = await fetch(req)
res.headers.get("content-type") // application/json
```

## URL and parameters

As we said the first parameter in the request object is the path to the resource, basically the URL.

The URL interface is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

```js
const url = new URL("http://example.com/movies")

const res = await fetch(url)
```

The URL interface can receive the whole url as a string or two arguments where the first element is the relative path and the second one is the base url.

```js
const url = new URL("../movies", "http://example.com")

console.log(url.hostname) // "http://example.com"
console.log(url.pathname) // "/movies"
```

Besides, It's also common that some resources accept parameters such as page, limit or filters that can be sent with the URL.

The <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" target="_blank">URLSearchParams</a> interface defines utility methods to work with the query string of a URL, and it's also present in the URL interface under the property searchParams.

```js
const url = new URL("http://example.com/movies")

url.searchParams.set("page", 1)
url.searchParams.set("limit", 10)
```

This API expects an object of key and value properties and it returns URLSearchParams object instance with a list of methods such as `toString()`, `has()`, `get()`, `set()` and more:

```js
const page = "2"
const limit = "10"

const searchParams = new URLSearchParams({ page, limit })

const url = new URL(`http://example.com/movies?${searchParams.toString()}`)
```

## Bottom Line

The Fetch Api is a more complex API than just a global method `fetch()`, even when it covers the essential feature of retrieving data. Fetch API is composed of a bunch of other APIs and interfaces that fit together into the HTTP pipeline.

```js
// Params
const page = "1"
const limit = "30"

const searchParams = new URLSearchParams({ page, limit })

// URL
const url = new URL(`http://example.com/movies?${searchParams.toString()}`)

// Headers
const headers = new Headers({ accept: "application/json" })

// Request
const req = new Request(url, { headers })

// fetch
const response = await fetch(req)

// Response
const data = await response.json()
```
