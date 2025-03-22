const mongoose = require("mongoose");

// Connect to MongoDB (cleaned up)
mongoose.connect('mongodb+srv://abichouasmaa:6QiM3C7aViJJCbOt@cluster0.inbgu.mongodb.net/myDatabase')
.then(() => {
    console.log("Database connected successfully");
})
.catch((error) => {
    console.error("Database connection failed:", error);
});

// Define the schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    password: {
        type: String,
    },
});

// Create the model
const User = mongoose.model("User", LoginSchema);

// Export the model
module.exports = User;
