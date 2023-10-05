const customLogger = require("./loggerTemplate");

const errLogger = async (err, req, res, next) => {
  try {
    const message = `${req?.protocol}\t${req?.hostname}\t${
      req?.ip || req?.ips
    }\t${req.method}\t${req?.path}\t${err?.name}\t${err?.status}\t${
      err?.message
    }`;
    await customLogger(message, "errorLogs.log");
  } catch (err) {
    console.log("/middlewares/errLogger", err.message);
  }
};

module.exports = errLogger;
