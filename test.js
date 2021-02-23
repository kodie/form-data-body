const test = require('ava')
const formDataBody = require('.')

const exampleFields = {
  name: 'My test post',
  description: 'This is just a test post',
  items: ['First Item', 'Second Item'],
  image: {
    name: 'hello.jpg',
    type: 'image/jpeg',
    data: '[BINARY IMAGE DATA]'
  }
}

const exampleResponse = `--{boundary}\r
Content-Disposition: form-data; name="name"\r
\r
My test post\r
--{boundary}\r
Content-Disposition: form-data; name="description"\r
\r
This is just a test post\r
--{boundary}\r
Content-Disposition: form-data; name="items[]"\r
\r
First Item\r
--{boundary}\r
Content-Disposition: form-data; name="items[]"\r
\r
Second Item\r
--{boundary}\r
Content-Disposition: form-data; name="image"; filename="hello.jpg"\r
Content-Type: image/jpeg\r
\r
[BINARY IMAGE DATA]\r
--{boundary}--\r
`

test('body', t => {
  const boundary = formDataBody.generateBoundary()
  const body = formDataBody(exampleFields, boundary)

  t.is(body, exampleResponse.replace(/\{boundary\}/g, boundary))
})

test('boundary', t => {
  const boundary = formDataBody.generateBoundary()

  t.is(boundary.length, 50)
  t.is(/^-{26}[0-9]{24}$/.test(boundary), true)
})

test('custom boundary', t => {
  const boundary = 'A3d54f'
  const body = formDataBody(exampleFields, boundary)

  t.is(body, exampleResponse.replace(/\{boundary\}/g, boundary))
})

test('invalid boundary parameter', t => {
  t.throws(() => {
    formDataBody(exampleFields, [])
  }, { instanceOf: TypeError })
})

test('invalid fields parameter', t => {
  t.throws(() => {
    formDataBody([])
  }, { instanceOf: TypeError })
})

test('invalid field value', t => {
  t.throws(() => {
    formDataBody({ name: [] })
  }, { instanceOf: TypeError })
})

test('invalid file field values', t => {
  t.throws(() => {
    formDataBody({ file: { } })
  }, { instanceOf: TypeError })

  t.throws(() => {
    formDataBody({ file: { name: null, type: '', data: '' } })
  }, { instanceOf: TypeError })

  t.throws(() => {
    formDataBody({ file: { name: '', type: null, data: '' } })
  }, { instanceOf: TypeError })

  t.throws(() => {
    formDataBody({ file: { name: '', type: '', data: null } })
  }, { instanceOf: TypeError })
})
