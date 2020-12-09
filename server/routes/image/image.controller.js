const axios = require('axios');
const qs = require('qs');

exports.imagePost = async (req, res, next) => {
  const {base64} = req.body
  const data = qs.stringify({
    'imageData': base64
  })
  var config = {
    method: 'post',
    url: 'https://test.rxflodev.com',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    res.status(200).send(response.data)
  })
  .catch(function (error) {
    console.error(error);
    res.status(400).send(error)
  });
};