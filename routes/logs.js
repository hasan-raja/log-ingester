const router = require("express").Router();
const Log = require("../models/Log");

const logsJson = require("../config/logs.json");

router.get("/logs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    // let sort = req.query.sort || "rating";
    let level = req.query.level || "All";

    const levelOptions = await Log.distinct("level");

    level === "All"
      ? (level = [...levelOptions])
      : (level = req.query.level.split(","));

    // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // let sortBy = {};
    // if (sort[1]) {
    // 	sortBy[sort[0]] = sort[1];
    // } else {
    // 	sortBy[sort[0]] = "asc";
    // }

    const logs = await Log.find({ message: { $regex: search, $options: "i" } })
      .where("level")
      .in([...level])
      // .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Log.countDocuments({
      level: { $in: [...level] },
      message: { $regex: search, $options: "i" },
    });



    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      level: levelOptions,
      logs,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Middleware to check if the request body is JSON
const isJsonMiddleware = (req, res, next) => {
  if (req.is("application/json")) {
    next();
  } else {
    res
      .status(400)
      .json({ error: "Invalid content type. Expected application/json." });
  }
};

router.post("/postLogs", isJsonMiddleware, async (req, res) => {
  const logsJson = req.body;

  try {
    const docs = await Log.insertMany(logsJson);
    res.status(201).json(docs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// router.post('/postLogs', async (req, res) => {
// 	const logsJson = req.body;
// 	    try {
//         const docs = await Log.insertMany(logsJson);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
//   });

// export const createPost =

// const insertLogs = async () => {
//     try {
//         const docs = await Log.insertMany(logsJson);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertLogs()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router;
