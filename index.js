const request = require('request')
const FormData = require('form-data')
const fs = require('fs')

const configFigurebed = {
  smms: SMMSUploadImage
}

module.exports = function uploadImage({
  filePath,
  figurebed = 'smms',
}) {
  const upload = configFigurebed[figurebed]
  if (typeof upload !== 'function') return Promise.reject('图床配置[figurebed]不在列表中')
  return upload(filePath)
}

// __dirname + '/ico.png'

function SMMSUploadImage(filePath) {
  return new Promise((resolve, reject) => {
    request
      .post('https://sm.ms/api/upload', {
        headers: {
          origin: 'https://sm.ms',
          referer: 'https://sm.ms/',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
        },
        formData: {
          smfile: fs.createReadStream(filePath)
        }
      }, (err, response, body) => {
        if (err) {
          reject()
          return console.error(err)
        }
        const result = JSON.parse(body)
        if (!result || result.code !== 'success') {
          reject();
          reurn console.log(result)
        }
        const {
          url,
          delete
        } = result.data
        resolve(url)
      })
  })
}
