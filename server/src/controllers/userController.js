import userModel from "../models/user.js";
import { validationResult } from "express-validator";

// route:  GET /api/user/
// desc:   sending users 
const getUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(500).json({ errorMsg: "server error" });
        }
    } catch (err) {
        res.status(500).json({ errorMsg: "server error" });
        console.log("ERROR OCCOURED WHILE FETCHING USERS", err);
    }
};


// route:  POST /api/user/
// desc:   getting user data
const postUser = async (req, res) => {

    // checking for the validations 
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json(validationErrors.array()[0]);
    }
    
    else {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = new userModel({
                name: name,
                email: email,
                password: password
            });
            await user.save();
            res.status(201).json({ successMsg: "user created successfully" });
            
        } catch (err) {
            res.status(409).json({ errorMsg: "user not created" }); // 409 is for conflict
            console.log("ERROR OCCOURED WHILE CREATING USER", err);
        }
    }
};



// route:  PATCH /api/user/:id
// desc:   updating user data
const updateUser = async (req, res) => {
    
    // checking for the validations 
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json(validationErrors.array()[0]);
    }

    else {
        const { name, password, email } = req.body;
        const id = req.params.id;
        try {
            await userModel.updateOne({ _id: id }, { $set: { name, password, email } });
            res.status(200).json({ successMsg: "user updated successfully" });

        } catch (err) {
            res.status(409).json({ errorMsg: "user not updated" }); // 409 is for conflict
            console.log("ERROR OCCOURED WHILE UPDATING USER", err);
        }
    }
};



// route:  DELETE /api/user/:id
// desc:   deleting user data
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.deleteOne({ _id: id });
        res.status(200).json({ successMsg: "user deleted successfully" });

    } catch (err) {
        res.status(409).json({ errorMsg: "user not deleted" }); // 409 is for conflict
        console.log("ERROR OCCOURED WHILE DELETING USER", err);
    }
};


export { getUsers, postUser, updateUser, deleteUser };