const express=require("express");
const router=express.Router();

const {getAllUser,getAllContact,deleteUserById,getUserById,updateUserById,deleteContactById}=require("../controller/admin-controller");
const authMiddleware=require("../middleware/auth-middleware");
const adminMiddleware=require("../middleware/admin-middleware");

//admin get all the priviledge to add user and contact data to fetch all the data 
// if the admin is there by checking through authmiddleware and adminMiddleware
router.route('/users').get(authMiddleware,adminMiddleware,getAllUser);
//if authmiddleware correct then go to admin middleware if admin middleware true then  
// fetch AllUser data
router.route('/users/:id').get(authMiddleware,adminMiddleware,getUserById);
//getting single user data which id is forwarded
router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,updateUserById);
//update user data which id is forwarded
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById);
//for deleting user data

router.route('/contacts').get(authMiddleware,getAllContact);
//get all the data of contacts
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,deleteContactById);
//for deleting ucontact data

module.exports=router;