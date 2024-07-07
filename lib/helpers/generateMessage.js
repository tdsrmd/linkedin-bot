// generateMessage.js

function generateMessage(message, profileData) {
  message = message.replace("{{fullName}}", profileData.fullName);
  message = message.replace("{{firstName}}", profileData.firstName);
  message = message.replace("{{lastName}}", profileData.lastName);
  return message;
}

module.exports = generateMessage;
