const AWS = require('aws-sdk');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const retrieveImage = async (req, res) => {
  try {
    await s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: 'cat_glasses.jpeg',
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send((`data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const uploadImage = async (req, res) => {
  const { file } = req.body;
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: file.name,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.putObject(params).promise();

    res.send('Image uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading image');
  }
};

module.exports = {
  retrieveImage, uploadImage,
};
