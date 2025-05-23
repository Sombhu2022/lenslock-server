import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// table stracture
const userSchema = new Schema(
    {
        name: {
            type: String,
            maxLength: [60, "name should be in 60 latter"],
            minLength: [3, "name must be 3 latter or more"],
            required: [true, "name is reqired!"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is reqired!"],
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please provide a valid email address",
            ],
            trim: true,
        },
        password: {
            type: String,
            minLength: [8, "password must be 8 charecter or above"],
            required: [true, "password is reqired!"],
            select: false,
        },
        profile_pic: {
            url: {
                type: String,
                default:
                    "https://res.cloudinary.com/dab0ekhmy/image/upload/v1728130610/thik-ai/gvjpvq3xljmnw2vwdkag.avif",
            },
            public_id: {
                type: String,
                default: null,
            },
        },
        role: {
            type: String,
            enum: ["user", "admin", "photographer"],
            default: "user",
        },
        bio:{
            type: String,
            maxLength: [200, "bio should be in 200 latter"],
            required: [false, "bio is not reqired!"],
            trim: true,
        } ,
        phone: {
            type: String,
            maxLength: [15, "phone number should be in 15 latter"],
            minLength: [3, "phone number must be 3 latter or more"],
            required: [true , "phone number is  reqired!"],
            trim: true,
        },
        address: {
            type: String,
            maxLength: [200, "address should be in 200 latter"],
            required: [false, "address is not  reqired!"],
            trim: true,
        },
        url : {
            type: String,
            maxLength: [200, "url should be in 200 latter"],
            required: [false, "url is not  reqired!"],
            trim: true,
        },

        experiance : {
            type : String
        } , 
        otp: {
            type: Number,
        },
        otpExpiary: {
            type: Date,
        },
        isProfileComplete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// password hashing ...
userSchema.pre("save", async function (next) {
    // if password is  modified
    // update password ( forget , reset) then password modified ,
    // if first time i create a user then
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // hashing password
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
});

// create comparePassword function...
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Users = model("user", userSchema);
