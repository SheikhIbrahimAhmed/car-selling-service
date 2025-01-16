const mongoose = require("mongoose");

const connectMongoDB = (http, port) => {

    const mongoString = "mongodb+srv://user-1:lrFDeZ7jAJoZo9hA@cluster0.ngbw31v.mongodb.net/property-management?retryWrites=true&w=majority"
    mongoose.connect(mongoString)
        .then(() => {
            console.log("Connected to the database successfully!");
            http.listen(port, function () {
                console.log("Backend is running on port 5000");
            });
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });

}

module.exports = {
    connectMongoDB
}