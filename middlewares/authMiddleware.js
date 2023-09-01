const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.header("authorization");
        if (!authorizationHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing",
            });
        }

        const token = authorizationHeader.split(" ")[1];
        console.log("Received Token:", token);

        const decodedToken = jwt.decode(token); // Use decode instead of verify here
        console.log("Decoded Token:", decodedToken);
        console.log("exprie date:", decodedToken.exp * 1000);
        console.log(" date:", Date.now());

        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
            localStorage.removeItem("token");
            localStorage.clear();
            return res.status(401).send({
                success: false,
                message: "Token has expired",
            });
        }

        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decryptedToken.userId;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({
                success: false,
                message: "Token expired",
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Invalid token",
            });
        }
    }
};
