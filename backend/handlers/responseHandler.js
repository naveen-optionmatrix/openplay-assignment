// Define Error Codes
let statusCode = {
    OK: 200,
    FOUR_ZERO_FOUR: 404,
    FOUR_ZERO_THREE: 403,
    FOUR_ZERO_ONE: 401,
    FIVE_ZERO_ZERO: 500
};

// Define Error Messages
let statusMessage = {
    SERVER_BUSY: 'Our Servers are busy. Please try again later.',
    DATA_UPDATED: 'Data updated successfully.',
    DELETE_DATA: 'Delete data successfully',

};

/** Below are used to handle the responses */
const handleSuccess = (res, data) => {
    res.status(statusCode.OK).send({ type: "@Success", data: data ? data : "Task performed successfully!" });
  };

const handleFailure = (res, data) => {
    res.status(statusCode.OK).send({ type: "@Error", data: data ? data : "Trouble performing the task. Please try later!" });
  };

const handleFailureWithCode = (res, type, data) => {
    res.status(type).send({ type: "@Error", data: data ? data : "Trouble performing the task. Please try later!" });
  };

const handleErrors = (res, err) => {
    res.status(statusCode.FIVE_ZERO_ZERO).send({ message: err ? err : "Trouble performing the task. Please try later" });
  };

module.exports = {
    statusCode: statusCode,
    statusMessage: statusMessage,
    handleSuccess: handleSuccess,
    handleFailure: handleFailure,
    handleFailureWithCode: handleFailureWithCode,
    handleErrors: handleErrors
}