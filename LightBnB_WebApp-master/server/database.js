const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
pool.on('error', (err, client) => console.log(Object.keys(err)))

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email= $1`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [user.name, user.email, user.password];
  return pool
    .query(
      `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) returning *`,
      values
    )
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// ['Ada', 'myemailAda.com', 'password'];
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit) {
  //return getAllProperties(null, 2);
  const query = `SELECT properties.title,properties.parking_spaces,properties.thumbnail_photo_url,properties.number_of_bathrooms,properties.number_of_bedrooms,properties.cost_per_night, property_reviews.rating,reservations.start_date, reservations.end_date FROM reservations 
  JOIN properties ON 
properties.id= reservations.property_id
JOIN users ON
users.id = properties.owner_id
JOIN property_reviews
ON properties.id = property_reviews.property_id
where reservations.guest_id = $1 
limit $2`;

  const val = [guest_id,limit];
  console.log('Query---',query, 'val---',val);
  return pool
    .query(query, val)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((error) => {
      console.log(Object.values(error));
      console.log(error.internalQuery);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  
  
  
  
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
