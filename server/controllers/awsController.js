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
  console.log(email);
  console.log(token);
  try {
    const TemplateData = `{"token":${token}}`;

    const params = {
      Source: 'bpidontmind@gmail.com',
      Destination: {
        ToAddresses: [
          email,
        ],
      },
      Template: 'ResetPassword2',
      TemplateData,
    };

    ses.sendTemplatedEmail(params, (err, data) => {
      if (err) console.log(err);
      else res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// Example of how to create a templated email
const createTemplate = async (req, res) => {
  const templateParams = {
    Template: {
      TemplateName: 'ResetPassword2',
      HtmlPart: '<div style="display: flex;"><div style="flex-direction: column;"><h1 style="margin-top: 30px;">IDONTMIND</h1><h2 style="margin-top: 15px; margin-bottom: 30px;">Reset Password</h2><p>Hi,<br>Forgot your password?<br> If you did not request a password reset for your account please ignore this message.<br> Below is the code to reset your password: <br> {{token}}</p></div>',
      SubjectPart: 'Reset Password Request',
    },
  };

  await ses.createTemplate(templateParams, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log('created template');
  });
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
  getImage, uploadImage, sendEmail, createTemplate,
};
