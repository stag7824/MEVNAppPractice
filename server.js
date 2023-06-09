const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const app = express();
// app.use(
//     session({
//       secret: 'YOUR_SECRET_KEY', // Replace with your own secret key
//       resave: false,
//       saveUninitialized: true,
//     })
//   );
mongoose.connect('mongodb://localhost/mevn', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});





app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
// const postsRoute = require('./routes/posts');


// User part
const userRoute = require('./routes/user');
app.use('/api', userRoute);

// app.use('/posts', postsRoute);
// const userRoute = require('./routes/users');
// app.use('/api', userRoute);


// Session Authentication
// const session = require('express-session');

app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


// Protecting Routes with JWT token
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ success: false, msg: 'No token provided.' });
    }
  
    // Verify the token
    jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, msg: 'Failed to authenticate token.' });
      }
  
      // Store the decoded token in the request object for further use
      req.user = decoded;
  
      // Call the next middleware
      next();
    });
  };