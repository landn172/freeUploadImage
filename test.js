const uploadImage = require('./index')
uploadImage('./ico.png').then(url => console.log(url), (error) => console.error(error))
