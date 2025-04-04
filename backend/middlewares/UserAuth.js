import jwt from 'jsonwebtoken';
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const userAuth = await req.headers.authorization;
  if (!userAuth) {
    return res.status(401).json({ success: false, message: "No Token Provided Access Denied, UnAuthenitcated." });
  }
  const userToken = userAuth.split(" ")[1];
  if (userToken) {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    req.body.userDetails = decodedToken;
    next();
  } else {
    return res.status(403).json({ success: false, message: "Ivalid Credentials" });
  }
};
export default userAuth;