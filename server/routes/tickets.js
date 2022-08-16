const express = require("express");
const ticketsController = require("../controllers/tickets");
const repliesController = require("../controllers/replies");
const router = express.Router();
const { adminAuth } = require('../middelware/index');
const { upload } = require('../middelware/upload');
const fs = require('fs')


router.post("/reply", upload.single('file'), (req, res, next) => {
    const body = {
        ticketId: req.body.ticketId,
        text: req.body.text,
        userId: req.body.userId,
        attachment: req.file,
    }
    repliesController.create(body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(422).send(err.message)
    })
})

router.get("/reply/:id", (req, res, next) => {
    const { id } = req.params;
    repliesController.findAllById(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(404).end()
    })
})




// tickets

router.post("/ticket", (req, res, next) => {
    ticketsController.create(req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(422).send(err.message)
    })
})

router.get("/tickets", (req, res, next) => {
    ticketsController.find({}).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(404).end()
    })
})

router.get("/ticket/:id", (req, res, next) => {
    const { id } = req.params;
    ticketsController.findOne(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(404).end()
    })
})

router.get("/tickets/:id", (req, res, next) => {
    const { id } = req.params;
    ticketsController.findAllByIdUser(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(404).end()
    })
})

router.patch("/tickets/:id", adminAuth, (req, res, next) => {
    const id = req.params;
    const body = req.body;
    ticketsController.editOne(id, body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(422).send(err.message);
    })
})

router.get("/admin/ticketscount", adminAuth, (req, res, next) => {
    ticketsController.count().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err)
        res.status(404).end()
    })
})

module.exports = router;
