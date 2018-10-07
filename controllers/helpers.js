const errorMessage = message => {
  if (Array.isArray(message)) {
    return { errors: message };
  }
  return { errors: [message] };
};

module.exports = { errorMessage };
