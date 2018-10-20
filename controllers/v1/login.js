const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post(
  "/login",
  passport.autheticate("local"),
  (_req, _res, _next) => null
);
