const { getUser, createUser } = require("../utils/auth_utils");
const { hashPassword, comparePassword } = require("../utils/password_utils");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "Failed",
				error: "User does not exist",
			});
		}
		const comparePass = await comparePassword(password, user.password);
		if (!comparePass) {
			return res.status(404).json({
				status: "Failed",
				message: "You entered an incorrect password",
			});
		}
		//JSON token generation
		token = jwt.sign(
			{
				username: user.name,
				email: user.email,
				userId: user.id,
			},
			process.env.JWT_PRIVATE_KEY,
			{
				expiresIn: "1 day",
			}
		);
		res.status(200).json({
			token: token,
			expiredIn: "1 day",
		});
	} catch (err) {
		res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};

const register = async (req, res) => {
	const { name, email, password, phone } = req.body;
	try {
		let user = await getUser(email);
		if (user) {
			return res.status(403).json({
				status: "Failed",
				error: "A user with this email already exists",
			});
		}
		const hashedPassword = await hashPassword(password);
		user = await createUser(name, email, hashedPassword, phone);
		return res.status(200).json({
			status: "Success",
			message: "User created successfully",
		});
	} catch (err) {
		res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};

module.exports = { login, register };
