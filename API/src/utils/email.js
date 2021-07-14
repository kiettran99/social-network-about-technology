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
        logoLink: 'https://www.dksocialnetwork.tk/images/logo.png',
        background: 'https://github.com/ColorlibHQ/email-templates/blob/master/10/images/email.png?raw=true',
        link: data
    });

    // Thiết lập đối tượng, nội dung gửi mail 
    const mainOptions = {
        from: 'Mạng xã hội ',
        to: user.email,
        subject: 'RESET YOUR PASSWORD ON SocialV',
        html: renderFile
    };

    return mainOptions;
};

const welcome = async (user) => {
    const fullname = user.fullname;

    const renderFile = await ejs.renderFile(path.join(__dirname, '/template/welcome.ejs'), {
        name: fullname,
        logoLink: 'https://www.dksocialnetwork.tk/images/logo.png',
        background: 'https://www.dksocialnetwork.tk/images/page-img/07.jpg'
    });

    // Thiết lập đối tượng, nội dung gửi mail 
    const mainOptions = {
        from: 'Mạng xã hội',
        to: user.email,
        subject: 'WELCOME TO SOCIAL NETWORK',
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