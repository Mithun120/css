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
let Domain = require('../models/domain');
router.post('/domainpost', upload.single('DomainImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new Domain({
        _id: new mongoose.Types.ObjectId(),    
        title: req.body.title,
        domainImg: url + '/public/' + req.file.filename,

    });
    user.save().then(result => {
        res.status(201).json({
            message: "Domain registered successfully!",
            domainCreated: {
                _id: result._id,
                domainImg: result.domainImg
                
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



router.get('/domainget', async (req, res) => {
  try {
    const userProfiles = await Domain.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}); 
router.put('/domainput/:id', upload.single('domainimg'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body);
  const domainimgUrl = req.file ? url +"/public/"+ req.file.filename : null;
  try {
    const user = await Domain.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          domainImg: domainimgUrl,
          title: req.body.title,
        }
      },
      { new: true }
    );

    res.json({ message: 'Domain updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user profile
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { domainimg, domaintitle, desc, githublink } = req.body;

//     const userProfile = await User.findById(id);
//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found' });
//     }

//     const updatedFields = {};
//     if (domainimg) updatedFields.domainimg = domainimg;
//     if (domaintitle) updatedFields.domaintitle = domaintitle;
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
router.delete('/domaindelete/:domainId', (req, res, next) => {
    const userId = req.params.domainId;
    Domain.deleteOne({ _id: userId })
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