const router = require("express").Router();
const getRedisConnection = require("../core/redisClient");

router.get("/room/:id", async (req, res, next) => {
  try {
    let roomId = req.params.id;
    let page = req.query.page ? Number(req.query.page) : 0;
    let count = req.query.count ? Number(req.query.count) : 10;

    let conn = await getRedisConnection();
    let messages = await conn.lrange(
      "room" + roomId,
      page * count,
      page * count + 9
    );
    let messagesJSON = messages.map(e => JSON.parse(e));
    res.json(messagesJSON);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
