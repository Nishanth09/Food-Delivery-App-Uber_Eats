const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './uber-eats-331202-fee2f3fda5af.json')

const { Storage } = Cloud
console.log("service key", serviceKey)
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'uber-eats-331202',
})

module.exports = storage