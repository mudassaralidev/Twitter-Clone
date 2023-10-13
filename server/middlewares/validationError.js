const validationError = (errors, res) => {
  const msg = Object.values(errors)
    .map((err) => err.message)
    .join(". ");
  return res.status(422).json({ msg: msg });
};

module.exports = validationError;