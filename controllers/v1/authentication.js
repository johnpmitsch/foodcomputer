const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, _next) => {
  passport.authenticate("local", { session: false }, (err, token, message) => {
    if (err) console.error(err);
    if (token)
      return res.status(200).send({ token, message: "You are now signed in" });
    if (message) return res.status(400).send({ error: message });
    return res.status(500).send({ error: "Something went wrong!" });
  })(req, res);
});

module.exports = router;
