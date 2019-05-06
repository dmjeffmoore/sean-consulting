let nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "blucodexteam@gmail.com",
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: "Blucodex Team <blucodexteam@gmail.com>",
        to: "Sean.Pattee@blucodex.com",
        subject: "Blucodex Contact Us Page: " + data.name,
        html: "This email was generated by the contact page at <a href=\"https://blucodex.com/\">https://blucodex.com/</a>."
            + "<br/><br/><b>Name: </b>" + data.name
            + "<br/><b>Email: </b>" + data.email
            + "<br/><b>Message: </b>" + data.message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(err)
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(info)
            });
        }
    });
};