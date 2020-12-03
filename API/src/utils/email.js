const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    // config mail server
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

const forgotPassword = async (user, data) => {
    const fullname = user.fullname;

    const renderFile = await ejs.renderFile(path.join(__dirname, '/template/reset-password.ejs'), {
        name: fullname,
        link: data
    });

    // Thiết lập đối tượng, nội dung gửi mail 
    const mainOptions = {
        from: 'Mạng xã hội ',
        to: user.email,
        subject: 'Reset your password on SocialV',
        html: renderFile
    };

    return mainOptions;
};

const welcome = async (user) => {
    const fullname = user.fullname;

    const renderFile = await ejs.renderFile(path.join(__dirname, '/template/welcome.ejs'), {
        name: fullname
    });

    // Thiết lập đối tượng, nội dung gửi mail 
    const mainOptions = {
        from: 'Mạng xã hội ',
        to: user.email,
        subject: 'Welcome To Social Network',
        html: renderFile
    };

    return mainOptions;
};

const selectedOptions = async (user, options) => {
    switch (options.type) {
        case 'welcome':
            return await welcome(user);
        case 'forgot-password':
            return await forgotPassword(user, options.data);
    }
}

exports.sendEmail = async (user, options = {
    type: 'welcome',
    data: null
}) => {
    const mainOptions = await selectedOptions(user, options);

    try {
        const info = await transporter.sendMail(mainOptions);
        console.log('Email sent: ' + info.response);
    }
    catch (e) {
        console.log(e);
    }
};