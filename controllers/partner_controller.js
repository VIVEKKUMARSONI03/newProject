const User = require('../models/user_model');
const Admin = require('../models/admin_model');
const Partner = require('../models/partener_model');
const Branch = require('../models/branch_model');

const bcrypt = require('bcryptjs');

const loginPartner = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const partner = await Partner.findOne({ email:email });
    if (!partner) {
        console.log("partner not found");
        return res.render("login");
    }

    

    const isPasswordCorrect = await bcrypt.compare(password, partner.password);
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

    res.redirect('/partner/home');

}

const registerPartner = async (req, res) => {
    try {
        const { name, email, password, location, branchname } = req.body;
        
        const partnerExists = await Partner.findOne({ email: email });
        if (partnerExists) {
            console.log('partner exists')
            return res.render("register", { message: "partner already exists" });
        }

        
        const branch = await Branch.findOne({ name: branchname });
        if (!branch) {
            return res.render("register", { message: "Invalid branch name" });
        }

        
        const partner = await Partner.create({
            name,
            email,
            password,
            location: Number(location),
            branch: branch._id   
        });

        if (!partner) {
            console.log('invalid partner data');
            return res.render("register", { message: "Invalid partner data" });
        }

        console.log('partner created successfully');

        return res.redirect('/partner/home');

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};


module.exports = { loginPartner: loginPartner, registerPartner: registerPartner};