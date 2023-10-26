const axios = require('axios');
const Key = process.env.Key;

exports.imageUploader = async (req) => {
  const formData = new FormData();
  formData.append('key', Key);
  const image = req.file.buffer.toString('base64');
  formData.append('image', image);

  const response = await axios.post('https://api.imgbb.com/1/upload', formData);
  return response?.data?.data?.url;
};