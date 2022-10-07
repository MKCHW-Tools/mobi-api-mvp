require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
/**
 * To authorize a user
 *@var: req
 *@var: res
 *@var: next
 */
const auth = async (req, res, next) => {
	if (!req.header("Authorization"))
		return res.status(403).json({
			result: "Failure",
			msg: "Missing Authorization header",
		});

	const token =
		(await req.header("Authorization")) &&
		req.header("Authorization").replace("Bearer ", "");

	if (!token)
		return res.status(403).json({
			result: "Failure",
			msg: "Missing Authorization Token",
		});

	const owner = await User.findOne({ accessToken: token });

	if (!owner)
		return res.status(401).json({
			result: "Failure",
			msg: "Invalid Access Token",
		});

	jwt.verify(
		token,
		process.env.ACCESS_KEY_SECRET,
		async (err, verifiedJWT) => {
			if (err instanceof jwt.TokenExpiredError)
				return res.status(403).json({
					result: "Failure",
					msg: "Token expired",
				});

			if (!verifiedJWT)
				return res.status(403).json({
					result: "Failure",
					msg: "Token expired",
				});

			let user = await User.findOne({
				username: verifiedJWT.username,
				accessToken: token,
			});

			if (!user) {
				user = await User.findOne({
					phone: verifiedJWT.username,
					accessToken: token,
				});
				if (!user) {
					user = await User.findOne({
						email: verifiedJWT.username,
						accessToken: token,
					});
					if (!user)
						return res.status(401).json({
							result: "Failure",
							msg: "Can not find user",
							verifiedJWT,
						});
				}
			}

			const userID = String(user._id);
			const ownerID = String(owner._id);

			if (userID != ownerID)
				return res.status(401).json({
					result: "Failure",
					msg: "Mismatched tokens",
				});

			req.user = owner;

			next();
		}
	);
};

const authRole = (role) => {
	return (req, res, next) => {
		if (!req.user.roles.includes(role))
			return res.status(403).json({
				result: "Failure",
				msg: "Not Authorized",
			});

		next();
	};
};

module.exports = {
	auth,
	authRole,
};
