const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://romanhulks1:Pass%4012345@cluster0.snyxgto.mongodb.net/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false // Corrected option name and set to false
}).then(() => {
    console.log('Connection established');
}).catch((err) => {
    console.log("Connection error:", err);
});

