'use strict'

module.exports = (fields, boundary) => {
  let body = ''

  if (!boundary) {
    bounary = module.exports.generateBoundary()
  } else if (typeof boundary !== 'string') {
    throw new TypeError('`boundary` parameter should be a string.')
  }

  if (fields && typeof fields === 'object') {
    for (const fieldName in fields) {
      let field = fields[fieldName]

      if (typeof field === 'object') {
        if (!field.name || typeof field.name !== 'string') {
          throw new TypeError(`\`fields.${fieldName}.name\` should be a string.`)
        } else if (!field.type || typeof field.type !== 'string') {
          throw new TypeError(`\`fields.${fieldName}.type\` should be a string.`)
        } else if (!field.data || typeof field.data !== 'string') {
          throw new TypeError(`\`fields.${fieldName}.data\` should be a string.`)
        } else {
          body += `--${boundary}\r\n`
          body += `Content-Disposition: form-data; name="${fieldName}"; filename="${field.name}"\r\n`
          body += `Content-Type: ${field.type}\r\n\r\n`
          body += `${field.data}\r\n`
        }
      } else if (typeof field === 'string') {
        body += `--${boundary}\r\n`
        body += `Content-Disposition: form-data; name="${fieldName}"\r\n\r\n`
        body += `${field}\r\n`
      } else {
        throw new TypeError(`\`fields.${fieldName}\` is an unsupported type, should be an object or a string.`)
      }
    }

    if (body.length) {
      body += `--${boundary}--\r\n`
    }
  } else {
    throw new TypeError('`fields` parameter is required and should be an object.')
  }

  return body
}

module.exports.generateBoundary = () => {
  return '--------------------------' + (Date.now() * 1000)
}
