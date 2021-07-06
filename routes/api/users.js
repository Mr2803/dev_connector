const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

//define User with model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "Il nome è richiesto").not().isEmpty(),
    body("email", "Per favore inserisci una mail valida").isEmail(),
    body(
      "password",
      "Per favore inserisci una password con 8 o più caratteri"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //mongoose query
    try {
      // See if user exists
      let user = await User.findOne({
        //   email:email
        email,
      });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Utente già registrato" }] });
      }
      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password with bcrypt

      const salt = await bcrypt.genSalt(10);

      // delete password and replace with salt(bcrypt)
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
