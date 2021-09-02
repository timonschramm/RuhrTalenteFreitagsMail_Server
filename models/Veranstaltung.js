const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VeranstaltungSchema = new Schema({
    title: String,
    subtitle: String,
    content: String,
    date: Date,
    time: String,
    place: String,
    lastSignUpDate: Date,
    handlungsfeld: String
    // datei
})

const Veranstaltung = mongoose.model('Veranstaltung', VeranstaltungSchema)
module.exports = Veranstaltung;