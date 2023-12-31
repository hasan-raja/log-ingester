const mongoose = require("mongoose");

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true };
	// const connectionParams = {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// 	ssl: true,
	// 	sslValidate: false, // Disable SSL validation for testing purposes
	// 	// Other connection options...
	//   };
    mongoose.connect(process.env.DB, connectionParams);

    mongoose.connection.on("connected", () => {
		console.log("Connected to database sucessfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error while connecting to database :" + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongodb connection disconnected");
	});

}


module.exports = dbConnect;