var rp = require('request-promise');

export default async function callBot(message: string): Promise<any> {
  let options = {
    method: 'POST',
    uri: 'http://34.227.113.196:8000/bot/',
    body: {
      message
    },
    json: true // Automatically stringifies the body to JSON
  };

  return rp(options)
}