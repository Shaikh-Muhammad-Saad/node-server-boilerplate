import userModel from "../../models/user.js";
import { getUsers, postUser, updateUser, deleteUser } from "../../controllers/userController.js"
import express from "express";
import { body, param } from "express-validator"

const router = express.Router();

// route:  GET /api/user/
// desc:   reading users 
router.get("/", getUsers);


// route:  POST /api/user/
// desc:   creating user data
router.post("/", [
    body("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password Field is required").isLength({ min: 8, }).withMessage("password must be greater than 8 characters"),
    body("name").notEmpty().withMessage("name field is required").isLength({ min: 6 }).withMessage("must be greater than 6 characters")
], postUser);



// route:  PATCH /api/user/:id
// desc:   updating user data
router.patch("/:id", [
    body("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password Field is required").isLength({ min: 8, }).withMessage("password must be greater than 8 characters"),
    body("name").notEmpty().withMessage("name field is required").isLength({ min: 6 }).withMessage("must be greater than 6 characters")
], updateUser);



// route:  DELETE /api/user/:id
// desc:   deleting user data
router.delete("/:id", deleteUser);

// module.exports = router;
export default router;