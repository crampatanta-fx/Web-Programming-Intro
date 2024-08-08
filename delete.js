const fs = require('fs')

const path = './users.json'

fs.unlink(path, (err) => {
  if (err) {
    console.error(err)
    return
  }

  //file removed
})