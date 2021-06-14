const moment = require("moment");

const TimeMoment = () => {
    return {
        time: moment().format("h:mm a")
    }
}

module.exports = TimeMoment;