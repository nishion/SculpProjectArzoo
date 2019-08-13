const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
//code to generate otp
function genotp(length) {
    var chars = '0123456789'.split('');


    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return (str);
}

//creates settings and sends mail
function sendMail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'saad.ahmed@onval.co',
            clientId: '366209567621-l6ifn5hp7alh3fn2iuc6tmuss3bug5i4.apps.googleusercontent.com',
            clientSecret: 'bq6WlQ8bS0LGi-4aQLVKSmoC',
            refreshToken: '1/ufShwABzttbcuYzxzBzBjFwP0_WiTPEPffB004EgYX6YyFtzssr2IA-cJ71sXvTy',
            accessToken: 'ya29.GltdB6ZzpsbMXIdLOsYYicsk0OX-g7bsa8_njg81FP2DhFq5dSERwnKmVMBzgMBZmqCyHQz8xQ6NaQNWKZAPcylmdtw0mYCL6vzvxg3_w0vA3rVt5BGNY4LENe5m'
        }
    });

    var mailOption = {
        from: 'Support Sculp <support@sculpfitness.co.in>',
        to: email,
        subject: 'Email Verification',
        text: 'Your One Time Password for E-mail verification is : ' + otp
    };

    transporter.sendMail(mailOption, function(err, res) {
        if (err) {
            console.log("Error Occurred: " + err);
        } else {
            console.log("Mail sent Successfully to " + email);
        }
    });

}

function verifyOTP(email){
    let otp = genotp(4);
    sendMail(email,otp);
    return otp;
}


module.exports = {verifyOTP}