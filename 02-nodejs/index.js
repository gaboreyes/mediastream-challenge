'use strict'
const fs = require('fs')
const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else

app.get('/users', async (req, res) => {
  const allUsers = await User.find({}).select({ _id: 1, name: 1, email: 1 })
  const stream = fs.createWriteStream('./users.csv', { flags: 'a' })

  const csv = allUsers.map(function (entry, index) {
    const line = index === 0 ? 'id,name,email' : Object.values(Object.values(entry)[2]).join(',')
    return line
  }).join('\n')

  stream.write(csv, function () {
    res.send('file created')
  })
})

app.listen(3000)
