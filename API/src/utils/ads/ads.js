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

const getClicksByDate = (type, startDate, endDate) => {
    switch (type) {
        case 'today':
            const today = moment().format('YYYY-MM-DD');
            return {
                $gte: new Date(today + "T00:00:00.000Z"),
                $lte: new Date(today + "T23:59:59.999Z")
            };
        case 'month':
            const startMonth = moment().format('YYYY-MM-01');
            const endMonth = moment().format('YYYY-MM-') + moment().daysInMonth();
            return {
                $gte: new Date(startMonth),
                $lte: new Date(endMonth)
            };
        case 'year':
            const startYear = moment().format('YYYY-01-01');
            const endYear = moment().format('YYYY-12-31');
            return {
                $gte: new Date(startYear),
                $lte: new Date(endYear)
            };
        case 'custom':
            return {
                $gte: moment(startDate).toDate(),
                $lte: moment(endDate).toDate()
            };
        default:
            return {};
    }
}

module.exports = {
    canAddActivity,
    getClicksByDate
};