
const responseHandler = require("../handlers/responseHandler");
const db = require("../models");

/**
 * This action outputs all the events/reminder/tasks stored in the Diary
 * @param {*} req 
 * @param {*} res 
 */
exports.allEvents = async (req, res) => {
  let decodedResult = req.decoded;
  let whereCondition = {
    userId: decodedResult.user.id,
    isActive: true
  }

  //Passed Conditions here
  if (req.query.eventDate) {
    whereCondition[db.Sequelize.Op.and] = { eventDate: new Date(req.query.eventDate) }
  }

  try {
    let { count, rows: events } = await db.diary.findAndCountAll({
      attributes: ['id', 'comment', 'eventDate', 'isActive'],
      offset: parseInt(req.query.Skip),
      limit: parseInt(req.query.Max),
      where: whereCondition,
      order: [
        ['eventDate', 'DESC'],
        ['id', 'DESC']
      ]
    });

    return responseHandler.handleSuccess(res, { totalRecords: count, result: events });

  } catch (err) {
    console.log("err", err)
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in fetching Diary Events. Please try later.");
  }
};

/**
 * This action is used to Create an Event in the Diary Table
 * @param {*} req 
 * @param {*} res 
 */
exports.createEvent = async (req, res) => {
  let decodedResult = req.decoded;
  try {

    let result = await db.diary.create({
      comment: req.body.comment,
      eventDate: req.body.eventDate,
      userId: decodedResult.user.id
    });

    if (result) {
      return responseHandler.handleSuccess(res, 'Event created successfully');
    } else {
      return responseHandler.handleFailure(res, "Error in creating Event");
    }

  } catch (err) {
    console.log("err", err)
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in creating event in Diary. Please try later.");
  }
};

/**
 * This action is used to update an existing event in the Diary Table
 * @param {*} req 
 * @param {*} res 
 */
exports.updateEvent = async (req, res) => {
  let decodedResult = req.decoded;
  try {

    let diaryEvent = await db.diary.findOne({
      attributes: ['id', 'comment', 'eventDate', 'isActive'],
      where: {
        id: req.body.id,
        userId: decodedResult.user.id,
        isActive: true
      }
    });

    if (diaryEvent) {
      diaryEvent.comment = req.body.comment;
      diaryEvent.eventDate = req.body.eventDate;

      let saveStatus = await diaryEvent.save();
      if (saveStatus) {
        return responseHandler.handleSuccess(res, 'Event successfully updated');
      }

    } else {
      return responseHandler.handleFailure(res, 'No existing event found to update');
    }

  } catch (err) {
    console.log("err", err)
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in updating event in Diary. Please try later.");
  }
};

/**
 * This action is used to delete a task from the diary
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteEvent = async (req, res) => {
  try {
    let deleteStatus = await db.diary.destroy({
      where: {
        id: req.params.diaryId
      }
    });

    if (deleteStatus) {
      return responseHandler.handleSuccess(res, 'Event successfully deleted');
    } else {
      return responseHandler.handleFailure(res, 'No existing event found to delete');
    }

  } catch (err) {
    console.log("err", err)
    // res.status(500).send({ message: err.message });
    responseHandler.handleFailure(res, "Trouble in deleting event in Diary. Please try later.");
  }
};