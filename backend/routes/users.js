const router = require("express").Router();
const User = require("../models/user.model");
const jsonParser = require("json-parser");

router.post("/", (req, res, err) => {
  const { version, username, lists } = req.body;

  const hash = "1";
  const salt = "2";

  const newUser = new User({
    username,
    version,
    lists,
    hash,
    salt,
  });

  newUser
    .save()
    .then(res.json("User Added"))
    .catch((err) => console.log(err));
});

// router.put()

module.exports = router;

// router.post("/register", jsonParser, (req, res, err) => {
//   if (req.body.password !== "") {
//     User.findOne({ username: req.body.username })
//       .then((foundUser) => {
//         if (foundUser) {
//           res.json({ isUserUnique: false });
//         } else {
//           const saltHash = passwordUtils.genPassword(req.body.password);

//           const salt = saltHash.salt;
//           const hash = saltHash.hash;

//           const newUser = new User({
//             version: req.body.version,
//             username: req.body.username,
//             hash: hash,
//             salt: salt,
//           });

//           newUser
//             .save()
//             .then((user) => {})
//             .catch((err) => console.log(err));

//           res.json({ isUserUnique: true });
//         }
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }
// });
