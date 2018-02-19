module.exports = parseErrors;

function parse400(err) {
  return err[0].messages[0];
}

function parseErrors(err, req, res, next) {
  //parse validation errors
  if (err.status == 400)
    res
      .status(400)
      .json(parse400(err.errors))
      .send();
  else if (err.name == "JsonWebTokenError")
    //jwt error
    res
      .status(401)
      .json("Can't touch this")
      .send();
  else {
    //internal server errors
    console.log(err);
    console.log(JSON.stringify(err)); //log
    res
      .status(500)
      .json("Internal Server Error")
      .send();
  }
}
