const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(401).json({ message: "Unauthorized access" })
            }

            //check if users role is allowed
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access Denid" })
            }

            next();
        }
        catch (error) {
            console.error("Error in authorizeRoles middleware:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = { authorizeRole }