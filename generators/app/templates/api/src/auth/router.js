import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import config from "config";

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

export const router = express.Router();

router.post(
  "/login",
  // The user provides a username and password to login
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    const authToken = createAuthToken(req.user.apiRepr());
    res.json({ authToken });
  }
);

router.post(
  "/refresh",
  // The user exchanges an existing valid JWT for a new one with a later
  // expiration
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    console.log("Token refreshed for: ", req.user);
    res.json({ authToken });
  }
);

export default router;
