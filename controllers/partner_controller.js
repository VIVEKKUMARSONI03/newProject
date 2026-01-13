const Partner = require('../models/partener_model');
const Branch = require('../models/branch_model');
const Order = require('../models/order_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const generateAccessAndRefereshTokens = async (partnerId) => {
    try {
        const partner = await Partner.findById(partnerId)
        const accessToken = partner.generateAccessToken()
        const refreshToken = partner.generateRefreshToken()

        partner.refreshToken = refreshToken
        await partner.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        console.log("error while generating access and refresh token: ", error);
    }
}

const loginPartner = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const partner = await Partner.findOne({ email: email });
    if (!partner) {
        console.log("partner not found");
        return res.render('base_home');
    }



    const isPasswordCorrect = await bcrypt.compare(password, partner.password);
    if (!isPasswordCorrect) {
        console.log('incorrect password');
        return res.render('base_home');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(partner._id);

    const options = {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax"
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    console.log("reached here");


    res.render('partner_home', { email: email, name: partner.name, bcode: partner.branchcode });

}

const registerPartner = async (req, res) => {
    try {
        const { name, email, password, branchcode, branchname } = req.body;

        const partnerExists = await Partner.findOne({ email: email });
        if (partnerExists) {
            console.log('partner exists')
            return res.render("register", { rolla: 'partner' });
        }


        const branch = await Branch.findOne({ name: branchname });

        if (!branch) {
            res.render("register", { rolla: 'partner' });
        }


        const partner = await Partner.create({
            name,
            email,
            password,
            branchcode: Number(branchcode),
            branch: branch._id
        });

        if (!partner) {
            console.log('invalid partner data');
            res.render("register", { rolla: ' partner' });
        }

        console.log('partner created successfully');

        res.render('login', { role: 'partner' });

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const get_list = async (req, res) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token || typeof token !== "string") {
            return res.status(401).json({ message: "Invalid access token" });
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const partner = await Partner.findById(decoded._id)
            .select("-password");

        // return res.status(200).json({ partner });

        const orders = await Order.find();

        // console.log(orders);

        const list = [];

        for (const order of orders) {
            const user = await User.findById(order.user);
            

            if(user.branchcode === partner.branchcode){
                list.push(order);
            }
        }

        console.log(list);

        console.log(partner);

        res.render('orders_list',{orders: list});

        return;
    } catch (error) {
        console.error("get_list error:", error);

        // clear corrupted cookie
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(401).json({ message: "Token verification failed" });
    }
};

const show_map  = async(req, res, next) => {

    const {email} = req.params;

    const partner = await Partner.findOne({email: email});

    if( !partner){
        console.log('partner with this email not found');
        res.status(404).json({message: 'partner with this email not found'});
    }

    res.render('map_for_partner',{email : email, name: partner.name, bcode: partner.branchcode});
}

module.exports = { loginPartner: loginPartner, registerPartner: registerPartner, get_list: get_list, show_map: show_map };