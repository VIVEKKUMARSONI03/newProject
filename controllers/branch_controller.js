const Branch = require('../models/branch_model');

const add_branch = async(req, res, next) => {

      
       const {name, branchcode , contactInfo}  = req.body;

       const branch = await Branch.findOne({name : name});

       if( branch){
          console.log("branch already exist");
          res.render('admin_home');
       }

       const newBranch = await Branch.create({
          name : name,
          branchcode : branchcode,
          contactInfo: contactInfo
       });

       if( !newBranch){
        console.log('branch not added');
       }

       console.log('branch created');

      res.render('admin_home');


}

module.exports = { add_branch : add_branch};