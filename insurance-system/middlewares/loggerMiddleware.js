const fs = require('fs');

const loggerMiddleware = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync('server.log', log);
    next();
};

module.exports = loggerMiddleware;
