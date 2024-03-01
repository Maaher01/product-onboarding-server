const { Router } = require("express");
const {
	displayAllProducts,
	addProduct,
	productEdit,
	productDelete,
} = require("../controllers/product.controller");

const router = Router();

router.get("/", displayAllProducts);
router.post("/add", addProduct);
router.delete("/:productId", productDelete);
router.put("/:productId", productEdit);

module.exports = router;
