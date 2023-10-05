import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from '../models/listing.model.js';


export const test = (req, res) => {
    res.send('hello world!!')
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account.'));

    try {
        // Find the user to be deleted
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json('User not found');
        }

        // Find all listings associated with the user and delete them
        await Listing.deleteMany({ userRef: user._id });

        // Delete the user
        await User.deleteOne({ _id: user._id });
        res.clearCookie('access_token');
        res.status(200).json('User and associated listings have been deleted');
    } catch (error) {
        next(error);
    }
}


export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listing = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listing);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can view only your own listings.'));
    }
}


export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User not found.'));

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }


}