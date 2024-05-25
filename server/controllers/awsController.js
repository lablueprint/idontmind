const AWS = require('aws-sdk');
// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// Connect to the AWS SES Service
const ses = new AWS.SES({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

const sendEmail = async (req, res) => {
  const { email, token } = req.body;

  try {
    // Example of how to create a templated email
    // const templateParams = {
    //   Template: {
    //     TemplateName: 'TestTemplate',
    //     HtmlPart: '<h1>Hello {{name}},</h1><p>Your order {{token}} is ready for     pickup!</p>',
    //     SubjectPart: 'Your order {{order}} is ready!',
    //   },
    // };

    // await ses.createTemplate(templateParams, (err, data) => {
    //   if (err) console.log(err, err.stack);
    //   else console.log('HELLO');
    // });

    const TemplateData = `{ "name":"John", "token":${token}, "order":"random order"}`;

    const params = {
      Source: 'bpidontmind@gmail.com',
      Destination: {
        ToAddresses: [
          email,
        ],
      },
      Template: 'TestTemplate',
      TemplateData,
    };

    ses.sendTemplatedEmail(params, (err, data) => {
      if (err) console.log(err);
      else res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

const getImage = async (req, res) => {
  try {
    await s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: 'CB817395-4799-4233-9C4F-125BD7E0C18E.jpg',
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
  getImage, uploadImage, sendEmail,
};
