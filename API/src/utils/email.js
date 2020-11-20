const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // config mail server
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

exports.sendEmail = async (user) => {

    const username = user.username;
    //const accountNumber = req.accountNumber;

    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail 
        from: 'Mạng xã hội ',
        to: user.email,
        subject: 'Login',
        text: "Wellcome !"
    }

    console.log('Email sent: ');

    try {
        const info = await transporter.sendMail(mainOptions);
        console.log('Email sent: ' + info.response);
    }
    catch (e) {
        console.log(e);
    }
}