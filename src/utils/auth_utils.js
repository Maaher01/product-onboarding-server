const { getClient } = require("../config/databaseConnection");

const getUser = async (email) => {
	const client = getClient();
	const [rows] = await client.query("SELECT * FROM users WHERE email=?;", [
		email,
	]);
	if (rows) {
		return rows[0];
	}
	return null;
};

const createUser = async (name, email, password, phone) => {
	const client = getClient();
	const row = await client.query(
		"INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?);",
		[name, email, password, phone]
	);
	if (row) {
		return row;
	}
	return null;
};

module.exports = { getUser, createUser };
