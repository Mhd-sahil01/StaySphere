module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            console.error("Error:", err);
            res.status(500).json({ message: "Internal server error", error: err.message });
        });
    };
};