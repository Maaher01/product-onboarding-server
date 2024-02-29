const express = require("express");
require("dotenv").config();
const { databaseConnection } = require("./config/databaseConnection");

//Cors files import
const cors = require("cors");
const corsOptions = require("./middleware/check-ip-whitelist");

//Router files import
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

//Main app config
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Imported routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

//Base Get Path
app.get("/", (req, res) => {
	res.send(
		`<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
			<h1 style="color: blueviolet">API RUNNING...</h1>
		</div>`
	);
});

//Server start
app.listen(port, async () => {
	await databaseConnection();
	console.log(`Server is running on http://localhost:${port}`);
});
