const sightengine = require('sightengine')(process.env.SIGHTENGINE_USER, process.env.SIGHTENGINE_SECRET);

const nudityModeration = async (image, type = 'URL') => {
    try {
        switch (type) {
            case 'URL':
                if (typeof (image) === 'string')
                    return await sightengine.check(['nudity']).set_url(image);
                else
                    return null;
            case 'BIN':
                return await sightengine.check(['nudity']).set_bytes(image);
        }
    }
    catch (e) {
        console.log(e);
    }
};

const scammersModeration = async (image, type = 'URL') => {
    try {
        switch (type) {
            case 'URL':
                if (typeof (image) === 'string')
                    return await sightengine.check(['scam']).set_url(image);
                else
                    return null;
            case 'BIN':
                return await sightengine.check(['scam']).set_bytes(image);
        }
    }
    catch (e) {
        console.log(e);
    }
};

const imageModeration = async (image, type = 'URL') => {
    try {
        switch (type) {
            case 'URL':
                if (typeof (image) === 'string')
                    return await sightengine.check(['nudity', 'scam']).set_url(image);
                else
                    return null;
            case 'BIN':
                return await sightengine.check(['nudity', 'scam']).set_bytes(image);
        }
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = { imageModeration, nudityModeration, scammersModeration };