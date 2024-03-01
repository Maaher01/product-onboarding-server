const { getClient } = require("../config/databaseConnection");

const getAllProducts = async () => {
	const client = getClient();
	const [rows] = await client.query("SELECT * FROM products");
	if (rows) {
		return rows;
	}
	return null;
};

const getProductById = async (productId) => {
	const client = getClient();
	const [row] = await client.query(
		"SELECT * FROM products WHERE productId=?;",
		[productId]
	);
	if (row) {
		return row;
	}
	return null;
};

const createProduct = async (productName, price) => {
	const client = getClient();
	const [rows] = await client.query(
		"INSERT into products(productName, price) VALUES (?, ?);",
		[productName, price]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

const editProduct = async (productName, price, productId) => {
	const client = getClient();
	const [row] = await client.query(
		"UPDATE products SET productName=?, price=? WHERE productId=?;",
		[productName, price, productId]
	);
	if (row) {
		return row;
	}
	return null;
};

const deleteProduct = async (productId) => {
	const client = getClient();
	const [row] = await client.query("DELETE FROM products WHERE productId=?;", [
		productId,
	]);
	if (row) {
		return row;
	}
	return null;
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	editProduct,
	deleteProduct,
};
