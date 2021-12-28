const router = require("express").Router();

router.route("/").post((req, res) => {
  const { listItems, user, version, title, rootListItem, currentFocusItem } =
    req.body;

  //need to get user from element and then
});

router
  .put("/", (req, res, err) => {
    const {
      id,
      listItems,
      user,
      version,
      title,
      rootListItem,
      currentFocusItem,
    } = req.body;

    User.update(
      { _id: user, "lists._id": id },
      {
        $set: {
          "list.$.title": title,
          "list.$.currentFocusItem": currentFocusItem,
          "list.$.listItems": listItems,
          "list.$.version": version,
        },
      }
    )
      .then(() => {
        res.json("List Updated Successfully");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));
