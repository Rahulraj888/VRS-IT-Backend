const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check that we have a token in the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed token" });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded user to req.user
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
