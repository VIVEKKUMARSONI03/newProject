const Branch = require('../models/branch_model');

const add_branch = async(req, res, next) => {

      
       const {name, placename, branchcode, contactInfo, lat, lng}  = req.body;
       const {ename, email , bcode} = req.params;

       const branch = await Branch.findOne({name : name});

       if( branch){
          console.log("branch already exist");
          res.render('admin_home',{name:ename, email: email, bcode: bcode});
       }

       const newBranch = await Branch.create({
          name : name,
          branchcode : branchcode,
          location: {lat:lat, lng: lng, placename:placename},
          contactInfo: contactInfo
       });

       if( !newBranch){
        console.log('branch not added');
       }

       console.log('branch created');

      res.render('admin_home',{name:ename, email: email, bcode: bcode});
}

module.exports = { add_branch : add_branch};