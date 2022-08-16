const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();
const { adminAuth } = require('../middelware/index');


// users
router.post("/register", (req, res, next) => {
  usersController.create(req.body).then((user) => {
    res.json(user);
  })
    .catch((err) => {
      console.log(err.message);
      res.status(422).send(err.message);
    });
});

router.post("/login", (req, res, next) => {
  usersController
    .login(req.body)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(422).send("wrong please try again");
    });
});

router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  usersController.findOne(id).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err)
    res.status(404).end()
  })
})

router.get("/admin/users", adminAuth, (req, res, next) => {
  usersController.find({}).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err)
    res.status(404).end()
  })
})



router.delete("/admin/users/:id", adminAuth, (req, res, next) => {
  const id = req.params
  usersController.delOne(id).then(() => {
    res.status(200).end()
  }).catch((err) => {
    res.status(422).end()
  })
})

router.patch("/users/:id", (req, res, next) => {
  const id = req.params;
  const body = req.body;
  usersController.editOne(id, body).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(422).send(err.message);
  })
})

router.get("/admin/userscount", adminAuth, (req, res, next) => {
  usersController.count().then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err)
    res.status(404).end()
  })
})


module.exports = router;
