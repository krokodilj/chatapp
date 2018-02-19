const getConnection = require("../core/mysqlpool");

module.exports = {
  getUserContacts: getUserContacts,
  createContacts: createContacts
};

async function getUserContacts(id) {
  let connection = await getConnection();
  let rows = await connection.query(
    "select u.id,u.username,u.email,u.avatar from contact c join user u where u.id=c.contact2 and c.contact1=? ;",
    id
  );
  connection.close();
  return rows;
}

async function createContacts(id1, id2) {
  let connection = await getConnection();
  let rows = await connection.query(
    "insert into contact set contact1=?, contact2=?;",
    [id1, id2]
  );
  let rows2 = await connection.query(
    "insert into contact set contact1=?, contact2=?;",
    [id2, id1]
  );
  connection.close();
}
