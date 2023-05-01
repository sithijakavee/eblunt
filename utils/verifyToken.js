import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
//   const { access_token } = req.cookies;

//   if (!access_token) {
//     res.status(401).json({
//       success: false,
//       message: "no access_token",
//     });
//   }

//   const decoded = jwt.verify(access_token, process.env.JWT);

//   req.user = await User.findById(decoded.id);

console.log(req.body.cookie)
};

