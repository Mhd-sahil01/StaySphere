import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
});

// module.exports = {
//   // Check auth status
//   checkStatus: (req, res) => {
//     res.status(200).json({
//       isAuthenticated: req.isAuthenticated(),
//       user: req.isAuthenticated() ? {
//         _id: req.user._id,
//         username: req.user.username,
//         email: req.user.email
//       } : null
//     });
//   },
// };