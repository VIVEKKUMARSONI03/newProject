const Admin = require('../models/admin_model');
const Order = require('../models/order_model');
const Branch = require('../models/branch_model');

const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email:email });
    if (!admin) {
        console.log("admin not found");
        return res.render("login",{role : null});
    }

    

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
        console.log('incorrect password');
        return res.render("login", { role: null });
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

    res.render('admin_home',{name:admin.name, email:email, bcode: admin.branchcode, orders:{}});

}

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, placename, branchname, lat, lng } = req.body;
        
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            console.log('admin exists')
            return res.render('base_home');
        }

        const branch = await Branch.findOne({ name: branchname });
        if (!branch) {
            return res.render('base_home');
        }

        if( !placename || !lat || !lng){
            return res.render('base_home');
        }

        const placedetail = {lat : lat, lng: lng, placename : placename};
        
        const admin = await Admin.create({
            name: name,
            email : email,
            password: password,
            branchcode: branch.branchcode,
            location: placedetail,
            branch: branch._id   
        });

        if (!admin) {
            return res.render('base_home');
        }

        console.log('admin created successfully');

        return res.render('admin_home',{name: admin.name, email: admin.email,bcode: admin.branchcode });

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const get_list = async(req, res, next) => {

   const {email} = req.params;

   const orders = await Order.find()
  .populate({
    path: 'user',
    select: 'name email'
  });


   if( !orders){
    console.log('something error in fetching order list');
   }

   const admin = await Admin.findOne({email:email});

   if(!admin){
       console.log('admin not found please login again');
       res.render('login',{role:admin});
   }



   console.log('orders are : ',orders);
   
   res.render('orders_list',{orders:orders});
   
}

module.exports = { loginAdmin: loginAdmin, registerAdmin: registerAdmin, get_list: get_list};