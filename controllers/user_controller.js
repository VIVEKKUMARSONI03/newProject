const User = require('../models/user_model');
const Admin = require('../models/admin_model');
const Partner = require('../models/partener_model');
const Branch = require('../models/branch_model');

const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email:email });
    if (!user) {
        console.log("user not found");
        return res.render("login");
    }

    

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        console.log('incorrect password');
        return res.render("login", { message: "Invalid email or password" });
    }

    //   const token = await generateAccessAndRefereshTokens(user._id);

    //   const options = {
    //     httpOnly: true,
    //     secure: false, // localhost
    //     sameSite: "lax"
    //   };

    //   res.cookie("accessToken", token, options);

    //   res.render("home", { 
    //     local: { id: user._id },
    //     analytics: { redirectURL: null, visitHistory: [] }
    //   });

    console.log("reached here");

    res.redirect('/project/home');

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, location, branchname, role } = req.body;

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('user exists')
            return res.render("register", { message: "User already exists" });
        }

        
        const branch = await Branch.findOne({ name: branchname });
        if (!branch) {
            return res.render("register", { message: "Invalid branch name" });
        }

        
        const user = await User.create({
            name,
            email,
            password,
            location: Number(location),
            branch: branch._id   
        });

        if (!user) {
            return res.render("register", { message: "Invalid user data" });
        }

        console.log('user created successfully');

        return res.redirect('/project/home');

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};


module.exports = { loginUser: loginUser, registerUser: registerUser};