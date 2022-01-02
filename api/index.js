const express = require('express')
const app = express();
const multer = require('multer')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/category');
const path = require('path')

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then((res) => {
  console.log('Db connected');
}).catch(err => 
  console.log(err)
);

app.use(express.json()); //To get request body json parameters 
app.use("/images", express.static(path.join(__dirname, '/images')))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name)
  }
})
  
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json('File has been uploaded!');
});

app.listen("5000", () => {
  console.log('Backend is running. Hello world!');
})