
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    const token =
        req.cookies?.artforgeToken ||
        (authHeader?.startsWith("Bearer ")
            ? authHeader.slice("Bearer ".length).trim()
            : null);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is missing.",
        });
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not configured.");

        return res.status(500).json({
            success: false,
            message: "Authentication service is not configured.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token.",
            });
        }

        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token.",
        });
    }
}

module.exports = authMiddleware;
