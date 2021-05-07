const moment = require('moment');

const canAddActivity = (activities) => {

    // activies is empty return true
    if (!activities || activities.length === 0) {
        return true;
    }

    // Get previous activity checking date of new activity should be greater 30m
    const previousActivity = activities.slice(-1)[0];

    if (moment().diff(moment(previousActivity.date), 'minutes') >= 30) {
        return true;
    }

    return false;
};

module.exports = {
    canAddActivity
};