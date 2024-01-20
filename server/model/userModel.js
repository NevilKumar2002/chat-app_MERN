const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const userSchema= new Schema({
    username:{
        type:'String',
        required: true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:'String',
        required: true,
        max:50,
        unique:true,  
        
    },
    password:{
        type:'String',
        required: true,
        min:5,  
    },
    isAvatarImageSet:{
        type:'Boolean',
        default:false,


    },
    avatarImage:{
        type:'String',
        default:"",
    }
})
module.exports= mongoose.model('users', userSchema);