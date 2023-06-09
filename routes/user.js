const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// router.route('/create').post((req, res, next) => {
//     User.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// });


// router.route('/create').post((req, res, next) => {
//     User.create(req.body)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             next(err);
//         });
// });
router.route('/create').post((req, res, next) => {
    const { name, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword // Store the hashed password
        });

        newUser.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                next(err);
            });
    });
});

router.route('/').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// router.route('/authenticate').post((req, res) => {
//     User.findOne({
//         email: req.body.email
//     }, (err, user) => {
//         if (err) throw err;

//         if (!user) {
//             res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
//         } else {
//             if (user.validPassword(req.body.password)) {
//                 const token = user.generateJwt();
//                 res.json({success: true, token: 'JWT ' + token});
//             } else {
//                 res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
//             }
//         }
//     });
// });
// router.route('/authenticate').post((req, res) => {
//     const { email, password } = req.body;

//     User.findOne({ email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
//         }
//         if (!user.validPassword(password)) {
//           return res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
//         }
//         const token = user.generateJwt();
//         res.json({ success: true, token: 'JWT ' + token });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ success: false, msg: 'Internal server error.' });
//       });
//   });
// router.post('/authenticate', (req, res) => {
//     const { email, password } = req.body;

//     User.findOne({ email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
//             }

//             if (!user.validPassword(password)) {
//                 return res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
//             }

//             const token = user.generateJwt();
//             req.session.token = token; // Store the token in the session

//             res.json({ success: true, token: 'Bearer ' + token });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ success: false, msg: 'Internal server error.' });
//         });
// });
router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
            }

            if (!user.validPassword(password)) {
                return res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
            }

            const token = user.generateJwt();
            res.json({ success: true, token });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: 'Internal server error.' });
        });
});

router.route('/delete/:id').delete((req, res, next) => {
    
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ msg: data });
        }
    })
});




module.exports = router;
