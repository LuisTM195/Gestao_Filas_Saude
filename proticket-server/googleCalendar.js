const { google } = require('googleapis');
const { oAuth2Client } = require('./googleAuth');

async function createEvent(event) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
  return response.data;
}

module.exports = {
  createEvent,
};