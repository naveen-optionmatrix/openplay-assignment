/**
 * This module connects rendering modules to routes
 */
const express = require('express')
const router = express.Router()

//loading middlewares
const { authJwt } = require('../middlewares');

//error handler
const { catchErrors } = require('../handlers/errorHandlers')

//Importing Controllers
const { signup, signin } = require('../controllers/auth.controller')
const { allEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/diary.controller')

// Login Auth routes used for signup and signin
router.post('/auth/signup', catchErrors(signup))
router.post('/auth/signin', catchErrors(signin))

//Routes used for the activities done on Diary model
router.get("/diary/events", [authJwt.isUser], catchErrors(allEvents)) //get all events
router.post("/diary/event", [authJwt.isUser], catchErrors(createEvent)) // for creating an event
router.put("/diary/event/:diaryId", [authJwt.isUser], catchErrors(updateEvent)) //for updating an event
router.delete("/diary/event/:diaryId", [authJwt.isUser], catchErrors(deleteEvent)) //for deleting an event

module.exports = router