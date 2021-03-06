const dbConnection = require("../../db/db_connection.js");
const path = require("path");
exports.post = (req, res) => {
  const name = req.body.name;

  const item = req.body.item;
  const quantity = req.body.quantity;
  const price = req.body.price;

  dbConnection.query(
    "INSERT INTO users (full_name) VALUES ($1) RETURNING id",
    [name],
    (err, success) => {
      // console.log(personId); // logs out object for person, passed into bookings
      if (err) return err;
      dbConnection.query(
        "INSERT INTO shoppinglist (user_id, item, quantity, price) VALUES ($1, $2, $3, $4)",
        [success.rows[0].id, item, quantity, price],
        (err, result) => {
          console.log("inserted into shoppinglist database");
          if (err) return err;
          res.redirect(`/current-list/${name}`);
          
          // console.log("error!!!", err);
        }
      );
    }
  );

  console.log("222", name);

  // res.redirect(`/current-list/${name}`);
  console.log("333", name);
};

// cb(null);

// return name;

// exports.get = (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "currentList.hbs"));

// exports.get = (req, res) => {
//   res.render("shoppingList");
// };
