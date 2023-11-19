const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      resourceId: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      traceId: {
        type: String,
        required: true,
      },
      spanId: {
        type: String,
        required: true,
      },
      commit: {
        type: String,
        required: true,
      },
      metadata: {
        parentResourceId: {
          type: String,
          required: true,
        },
      },
   
});

module.exports = mongoose.model("log", logSchema);

// {
// 	"level": "error",
// 	"message": "Failed to connect to DB",
//     "resourceId": "server-1234",
// 	"timestamp": "2023-09-15T08:00:00Z",
// 	"traceId": "abc-xyz-123",
//     "spanId": "span-456",
//     "commit": "5e5342f",
//     "metadata": {
//         "parentResourceId": "server-0987"
//     }
// }