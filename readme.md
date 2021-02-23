# form-data-body

[![npm package version](https://img.shields.io/npm/v/form-data-body.svg?style=flat-square)](https://www.npmjs.com/package/form-data-body)
[![Travis build status](https://img.shields.io/travis/com/kodie/form-data-body.svg?style=flat-square)](https://travis-ci.com/kodie/form-data-body)
[![npm package downloads](https://img.shields.io/npm/dt/form-data-body.svg?style=flat-square)](https://www.npmjs.com/package/form-data-body)
[![code style](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://github.com/standard/standard)
[![license](https://img.shields.io/github/license/kodie/form-data-body.svg?style=flat-square)](license.md)

A tiny, dependency-free node module for generating a form's multipart/form-data body for a POST request.

This is meant to be a simple, no frills module for generating a string to send as the body for a POST request, simulating a form submission. If you need something with more bells and whistles, check out the [form-data](https://github.com/form-data/form-data) module.

## Installation

```shell
npm install --save form-data-body
```

## Usage

```js
const formDataBody = require('form-data-body')

// Specify form fields
const fields = {
  name: 'My test post',
  description: 'This is just a test post',
  items: ['First Item', 'Second Item'],

  // Files should be an object with the name, type, and data set to strings
  image: {
    name: 'hello.jpg',
    type: 'image/jpeg',
    data: binaryImageData
  }
}

const boundary = formDataBody.generateBoundary()
const header = {
  'Content-Type': `multipart/form-data; boundary=${boundary}`
}
const body = formDataBody(fields, boundary)
```

### Example Response

```
----------------------------071517909670537006900435
Content-Disposition: form-data; name="name"

My test post
----------------------------071517909670537006900435
Content-Disposition: form-data; name="description"

This is just a test post
----------------------------071517909670537006900435
Content-Disposition: form-data; name="items[]"

First Item
----------------------------071517909670537006900435
Content-Disposition: form-data; name="items[]"

Second Item
----------------------------071517909670537006900435
Content-Disposition: form-data; name="image"; filename="hello.jpg"
Content-Type: image/jpeg

[BINARY IMAGE DATA]
----------------------------071517909670537006900435--
```

## License
MIT. See the [license.md file](license.md) for more info.
