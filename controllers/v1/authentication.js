const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, _next) => {
  passport.authenticate("local", { session: false }, (_err, user, message) => {
    if (user)
      return res
        .status(200)
        .send({ message: `${user.username} signed in successfully` });
    if (message) return res.status(400).send({ error: message });
    return res.status(500).send({ error: "Something went wrong!" });
  })(req, res);
});

module.exports = router;
