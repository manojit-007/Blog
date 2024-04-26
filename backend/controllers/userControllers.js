const HttpError = require("../models/errorModel");
const User = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')


//register
//post => api/users/register ======== unprotected
const registerUser = async (req, res, next) => {
    console.log("run register");
    try {
        const { name, email, password, confirm_Password, avatar } = req.body;

        if (!name || !email || !password || !confirm_Password) {
            return next(new HttpError("Please fill all fields properly.", 422));
        }

        const normalizedEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: normalizedEmail });
        if (emailExists) {
            return next(new HttpError("Email already exists. Please use a different email for register.", 422));
        }

        if ((password.trim()).length < 8) {
            return next(new HttpError("Password should be at least 8 characters long.", 422));
        }

        if (password !== confirm_Password) {
            return next(new HttpError("Passwords do not match", 422));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email: normalizedEmail, password: hashPassword, avatar });

        res.status(201).json({ message: `${user.name} registered successfully with ${user.email} email. 😀` });

    } catch (error) {
        return next(new HttpError("User registration/sign up failed. Try again after some time.", 500));
    }
};


//login
//post =>api/users/login ==== unprotected
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError("Please provide both email and password.", 422));
        }
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials.", 401));
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        // const passwordMatched = await user.checkPassword(password);
        if (!passwordMatched) {
            return next(new HttpError("Invalid credentials.", 401));
        }
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({ token, id, name, message: "Login successful." });
    } catch (error) {
        return next(new HttpError("Login failed. Please try again later.", 500));
    }
};



//get user details
//get => api/users/:id ===== protected

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password')
        if (!user) {
            return next(new HttpError("user not found", 404));
        }
        res.status(200).json(user);

    } catch (error) {
        return next(new HttpError(error));
    }
}

//update profile avatar - post =>api/users/change-avatar ==== protected

const changeAvatar = async (req, res, next) => {
    try {
        // res.json(req.files)
        // console.log(req.files);
        if (!req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }
        //find user from database
        const user = await User.findById(req.user.id)
        //del old avatar
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err));
                }
            })
        }
        const { avatar } = req.files
        if (avatar.size > 500000) {
            return next(new HttpError("Requested image size is too big. Should be less than 500kb"), 422);

        }

        let fileName;
        fileName = avatar.name;
        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err));
            }

            const updateAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFileName }, { new: true })
            if (!updateAvatar) {
                return next(new HttpError("Avatar couldn't changed", 422));
            }
            res.status(200).json(updateAvatar);

        })

    } catch (error) {
        return next(new HttpError(error));

    }
}

//update profile details
//post =>api/users/update-user ==== protected
// avatar,

const updateUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            currentPassword,
            newPassword,
            confirmNewPassword } = req.body;
        if (!name ||
            !email ||
            !currentPassword ||
            !newPassword ||
            !confirmNewPassword) {
            return next(new HttpError("Fill all fields", 422));
        }

        const user = await User.findById(req.user.id)

        if (!user) {
            return next(new HttpError("User not found", 403));
        }

        //check email
        const emailExist = await User.findOne({ email })
        if (emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exists", 422));
        }

        const passwordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatched) {
            return next(new HttpError("Invalid password", 422));
        }
        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("Password do not match", 422));
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);

        //find and update
        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hashPassword }, { new: true }).select('-password')

        res.status(200).json(newInfo);



    } catch (error) {
        return next(new HttpError(error));
    }
}
//get all all-authors
//post =>api/users/all-authors ==== unprotected

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors)
    } catch (error) {
        return next(new HttpError(error));

    }
}

module.exports = { registerUser, loginUser, getUser, changeAvatar, updateUser, getAuthors }