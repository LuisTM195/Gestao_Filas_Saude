const { google } = require('googleapis');
const { oAuth2Client } = require('./googleAuth');

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// Função para criar um evento no Google Calendar
async function createEvent(event) {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('Evento criado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
}

module.exports = {
  createEvent,
};