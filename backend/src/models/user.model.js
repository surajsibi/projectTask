import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name:{
        type:String ,required:true
    },
    email:{
        type:String ,required:true,unique:true
    },
    password:{
        type:String ,required:true
    },
    role: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' }
},{
    timestamps:true
})

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to check password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};  


export const User = mongoose.model('User',userSchema)