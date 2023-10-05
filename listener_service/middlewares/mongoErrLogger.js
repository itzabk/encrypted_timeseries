const customLogger = require("./loggerTemplate");

const mongoErrLogger = async (err) => {
  try {
    const message = `${err?.name}\t${err?.message}\t${err.code}\t${err.syscall}`;
    await customLogger(message, "mongoErrorLogs.log");
  } catch (err) {
    console.log(`/middlewares/mongoErrLogger`, err.message);
  }
};

module.exports = mongoErrLogger;
