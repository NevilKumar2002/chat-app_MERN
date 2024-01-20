const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username,email,password);
    const usernameCheck = await User.findOne({ username });
    console.log("username Check: " + usernameCheck);
    if (usernameCheck) {
      return res.send({
        status: false,
        message: "Username already in use",
      });
    }
    const emailCheck = await User.findOne({ email });
    console.log("emailCheck", emailCheck);
    if (emailCheck) {
      return res.send({
        status: false,
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    // const UserObj= new User({
    //     name:name,
    //     email:email,
    //     password:hashedPassword,
    // })
    // try{
    //     const userDb= await UserObj.save();

    // }
    // catch(err){
    //     return res.send({
    //         status:500,
    //         message:err.message,
    //     })
    // }
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error){
    next(error)
    // return res.send({
    //     status:500,
        
    // })


  }
};
module.exports.login =async(req,res,next)=>{
    try{
        const{username, password}= req.body;
        console.log(username, password);
        const user = await User.findOne({ username });
        console.log("username Check: " + user);
        if(!user){
            return res.send({
                status:false,
                message:"Incorrect Username",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.send({
                status:false,
                message:"Invalid Password",
            })
        }
        return res.json({ status: true,user });


    }
    catch(err){
        next(err);
    }
}
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};