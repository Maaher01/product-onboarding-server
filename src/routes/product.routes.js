const { Router } = require("express");
const {
	displayAllProducts,
	addProduct,
	productDelete,
} = require("../controllers/product.controller");

const router = Router();

router.get("/", displayAllProducts);
router.post("/add", addProduct);
router.delete("/:productId", productDelete);

module.exports = router;
