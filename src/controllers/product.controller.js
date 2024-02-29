const {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
} = require("../utils/product_utils");

const displayAllProducts = async (req, res) => {
	try {
		const allProducts = await getAllProducts();

		if (!allProducts) {
			return res.status(404).json({
				status: "Failed",
				message: "Failed to fetch all products",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: allProducts,
		});
	} catch {
		return res.status(500).json({
			status: "Failed",
			message: "An unexpected server error occured. Please try again later.",
		});
	}
};

const addProduct = async (req, res) => {
	const { productName, price } = req.body;
	try {
		const product = await createProduct(productName, price);
		return res.status(200).json({
			status: "Success",
			data: product,
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: error.message,
		});
	}
};

const productDelete = async (req, res) => {
	const { productId } = req.params;
	try {
		await getProductById(productId);
		const operation = await deleteProduct(productId);
		if (!operation) {
			return res.status(404).json({
				status: "Failed",
				error: "Product does not exist",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: { productId: operation.productId },
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			error: error.message,
		});
	}
};

module.exports = { displayAllProducts, addProduct, productDelete };
