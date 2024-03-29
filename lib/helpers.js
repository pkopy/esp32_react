// const crypto = require('crypto');
// const config = require('./config');
// const nodemailer = require('nodemailer');
// const _data = require('./dataFs');
// const db = require('./db')
const PDFDocument = require('pdfkit');
const fs = require('fs')

const helpers = {};

// helpers.hash = (str) => {
//   if(typeof(str) == 'string' && str.length > 0) {
//     const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
//     return hash
//   } else {
//     return false
//   }
// };

// helpers.parseJsonToObject = (str) => {
//   try {
//     const obj = JSON.parse(str);
//     return obj;
//   } catch (e) {
//     return {};
//   }
// };

// helpers.createRandomString = (strLength) => {
//   strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
//   if(strLength) {
//     //Define all posaible character that could go to the string
//     const posaibleCharacters = 'abcdefghijklmnoprstquwyz0123456789ABCDEFGHIJKLMNOPQRSTUWXYZ';
//     //Start the final string

//     let str = '';
//     for(i = 1; i <= strLength; i++) {
//       const randomCharacter = posaibleCharacters.charAt(Math.floor(Math.random() * posaibleCharacters.length));
//       str += randomCharacter;
//     }
//     return str;
//   }
// };


helpers.response = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  const payloadString = JSON.stringify(payload);
  response.end(payloadString)
};

helpers.createPDF = (data) => {
    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(25)
        .text('Some text with an embedded font!', 100, 100);
    doc.end();
}

//All records from another table
// helpers.allRecords = (array, anotherTable, field, value) => {
//   const arr = []
//   return new Promise((res, rej) => {
//     array.forEach(elem => {
//       db.read(anotherTable, field, elem[value])
//       .then(data => {
//         elem.details = data 
//         arr.push(elem)
//         if(arr.length === array.length) {
//           // console.log(arr)
//           res(arr)
//         } 
//       }) 
//       .catch(err => {
//         rej(err)
//       });
//     });
//   });
// };

// helpers.verifyToken = (id, email, callback) => {
//   _data.read('tokens', id, (err, tokenData) => {
//     if(!err && tokenData) {
//       //Check that the token is for the given user, and  has not expired
//       tokenData = helpers.parseJsonToObject(tokenData)
//       if(tokenData.email == email && tokenData.expires > Date.now()) {
//         callback(true);
//       } else {
//         callback(false);
//       }
//     } else {
//       callback(false);
//     }
//   });
// };



// helpers.sendEmail = (userEmail, key) => {
//   nodemailer.createTestAccount((err, account) => {
//     let transporter = nodemailer.createTransport(config.emailSettings);
  
//     let mailOptions = {
//       from: '"Fred Foo" <bet@pkopy.eu>', // sender address
//       to: userEmail,// list of receivers
//       subject: 'Hello ✔', // Subject line
//       text: key || 'hell', // plain text body
//       html: `<a href="http://localhost:5101/register/${key}">Aktywuj</a>` // html body
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);
//       // // Preview only available when sending through an Ethereal account
//       // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
//   });



// }

module.exports = helpers