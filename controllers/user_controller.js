const User = require('../models/user_model');
const Branch = require('../models/branch_model');
const Order = require('../models/order_model');

const {loginAdmin, registerAdmin} = require('./admin_controller');
const {loginPartner, registerPartner} = require('./partner_controller');

const bcrypt = require('bcryptjs');

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log("error while generating access and refresh token: ", error);
    }
}

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

      const token = await generateAccessAndRefereshTokens(user._id);

      const options = {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax"
      };

      res.cookie("accessToken", token, options);

    console.log("reached here");
    
    
    res.render('home',{email : email, name : user.name});

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, location, branchname} = req.body;
        
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

        res.render('home',{email: email,name: user.name});

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const create_order = async (req, res, next) => {

     

     console.log('i am inside the create order function');

     const {email} = req.params;

     const user = await User.findOne({email: email});

     if( !user){
        console.log('user not found for order');
        res.render('login');
     }

     const order = await Order.create({
         user : user._id
     })

     console.log('order placed and your order is : ', order);
     res.render('home',{email: email,name: user.name});


}


module.exports = { loginUser: loginUser, registerUser: registerUser,create_order: create_order};