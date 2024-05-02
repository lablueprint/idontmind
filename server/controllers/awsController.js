const AWS = require('aws-sdk');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const getImage = async (req, res) => {
  try {
    // console.log('req body is', req.body);
    // const {iKey} = req.body.imageKey;
    const { imageKey } = req.query;
    // console.log('image key is', req.body.imageKey)
    console.log('the key is:', imageKey);
    await s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: imageKey, // Use the dynamic key passed as a parameter
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching image');
      } else {
        res.send((`data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`));
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  }
};


// const getImage = async (req, res) => {
//   try {
//     await s3.getObject({
//       Bucket: process.env.S3_BUCKET,
//       Key: 'CB817395-4799-4233-9C4F-125BD7E0C18E.jpg', // hard coded key, last chunk of URL, get stuff after '/'
//     }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send((`data:${data.ContentType};base64,${Buffer.from(data.Body, 'binary').toString('base64')}`));
//       }
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// upload an image (imageObject is from Image Picker)
const uploadImage = async (req, res) => {
  try {
    const { uri, base64 } = req.body.imageObject;
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    const imageBuffer = Buffer.from(base64, 'base64');
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };
    await s3.putObject(params).promise();
    res.send('Image uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading image');
  }
};

module.exports = {
  getImage, uploadImage,
};
