let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
let User = require('../models/User');
router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        desc:req.body.desc,
        githublink:req.body.githublink,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });



router.get('/api/user-profiles', async (req, res) => {
  try {
    const userProfiles = await User.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.put('/:id', upload.single('profileImg'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body);
  // const profileImgUrl = req.file ? url + req.file.filename : null;
  const profileImgUrl = req.file ? url + "/public/" + req.file.filename : null;
console.log(profileImgUrl+" <= Profile Img");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profileImg: profileImgUrl,
          title: req.body.title,
          desc: req.body.desc,
          githublink: req.body.githublink
        }
      },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update a user profile
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { profileImg, title, desc, githublink } = req.body;

//     const userProfile = await User.findById(id);
//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found' });
//     }

//     const updatedFields = {};
//     if (profileImg) updatedFields.profileImg = profileImg;
//     if (title) updatedFields.title = title;
//     if (desc) updatedFields.desc = desc;
//     if (githublink) updatedFields.githublink = githublink;

//     await userProfile.updateOne({ $set: updatedFields });

//     const updatedUserProfile = await User.findById(id);

//     res.json(updatedUserProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

//delete
router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.deleteOne({ _id: userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted',
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  


module.exports = router;