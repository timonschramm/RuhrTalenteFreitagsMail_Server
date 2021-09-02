const express = require('express')
const router = express.Router();

const Veranstaltung = require("./../models/User")

router.post('/create-event', (req, res) => {
    let {title, subtitle, content, date, time, place, lastSignUpDate, handlungsfeld} = req.body;
    title = title.trim();
    subtitle = subtitle.trim();
    content = content.trim();
    date = date.trim();
    time = time.trim();
    place = place.trim();
    lastSignUpDate = lastSignUpDate.trim();
    handlungsfeld = handlungsfeld.trim();

    

    if(title == "", subtitle == "", content == "", date == "", time == "", place == "", lastSignUpDate == "", handlungsfeld == ""){
        res.json({
            status: "FAILED",
            message: "Some of the parameters were empty!"
        })
    }
    else{
        const newEvent = new Veranstaltung({
            title,
            subtitle,
            content,
            date,
            time,
            place,
            lastSignUpDate,
            handlungsfeld
        });
        
        newEvent.save().then(result => {
            res.json({
                status: "SUCCESS",
                message: "Event created successfull",
                data: result,
            })
        })
    }
    
})

module.exports = router;