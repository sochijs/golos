module.exports = function (req, res, next) {
  if (!req.session.user) {
    req.session.user = {
      sessionId: req.sessionID
    };

    req.session.save(err => {
      if (err) throw err;
    });
  }

  next();
};