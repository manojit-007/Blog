const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const multer = require('multer');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRouters');
const postRoutes = require('./routes/postRouter');

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ dest: 'uploads/' }).single('thumbnail')); // Single file upload middleware
app.use('/upload', express.static(__dirname + '/uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use(notFound);
app.use(errorHandler);

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/blog-post-database')
    .then(() => console.log("Connection to MongoDB successful"))
    .catch(err => console.error("Connection to MongoDB failed", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
