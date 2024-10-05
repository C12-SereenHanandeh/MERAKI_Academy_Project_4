module.exports = function (requiredRoles = []) {
  return (req, res, next) => {
    // If no roles are required, continue to next middleware
    if (!requiredRoles.length) return next();

    // Check if the user has the required role
    const userRole = req.user.role;

    if (!requiredRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};
