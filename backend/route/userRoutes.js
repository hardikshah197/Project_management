//dependency 
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');

//post request SignUp 
router.post('/signup' ,async (req,res) =>{
        
        //console.log(req.body.email);
        //console.log(req.body.password);
        //getting the data in
        let user = new User({
        email: req.body.email,
        password: req.body.password
        });
        
        //Hash Passwords
        const password = req.body.password; 
        //console.log(bcrypt.hash(password,10));
        const hashPwd = await bcrypt.hash(password,10);
        user.password = hashPwd;
        
        //pushing the mail to the taskQueues
        User.findOne({email: req.body.email}).then(function (doc) {
                if(doc!=null){
                        res.status(409).json({'msg':'AlReady Exists !'});
                        return ;
                }
        });
        
        //saving to mongo DB 
        const savedUser = await user.save();
        res.json(savedUser);
          
});

//verify the email 
router.get('/verify/:jwt',async (req,res)=>{
        const token = req.params.jwt ;
        let decode = {};
        //destructure the token and verify it 
        jwtToken.verify(token, 'shhhh', function(err, decoded) {
                        if(err){
                        res.status(401).send('No Access CaNNot Verify !');
                        throw err;
                }
                //console.log(decoded);
                decode = decoded;
        });
        const id = decode._id ;
        const mail = decode.email ;
        //verify that this id is registered
        try {
                console.log(mail);
                User.findOne({email: mail}).then(async function (doc) {
                        doc.verified = true ;
                        await doc.save()
                });
                        
                res.status(200).json({'msg':'Token Accepted !'});
        }    
        catch(err) {
                res.status(401).json({'msg':'No Access Id Not Present !'});
                
        }
});

//login routes
router.post('/signin',async (req,res)=>{

        //taking the email and password in 
        const {email ,password} = req.body ;
        
        //const hashPwd = await bcrypt.hash(password,10);
        //taking the data from mongo 
        User.findOne({email:email}).then(async function(doc){
                if(doc==null){
                        res.status(400).json({'msg':'Email not Exists !'});
                }
                else{
                        //email exists 
                        const validPass = bcrypt.compare(password,doc.password);
                        bcrypt.compare(password, doc.password, function(err, result) {
                                if (err) { throw (err); }
                                if(!result) return res.status(400).json({'msg':'Invalid Password'});
                                else{       
                                        //create a token that can be assigned as identitty of that user
                                        const token = jwtToken.sign({_id:doc.id},process.env.TOKEN_SECRET||'shhhh');
                                        res.header('access-token',token);
                                        return res.json({'msg':'Logged in !','token': token});
                                    }
                            });
                        
                        
                        
                }
        });


});
//forgot my password 
router.post('/forgot_password' , (req,res) =>{
const {email} = req.body;
//creating a jwt token :
res.send('Pending');
});
//do change the password 
router.post('/forgot_password/:jwt' , (req,res) =>{
        const {email , password } = req.body;             
        //token 
        res.send(req.params.jwt);
        res.send('Pending');
});

//finally Logout 
router.get('/logout' , async (req,res)=>{
        //the incomming token comming from the header expire that
        
        if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
        } 
        
        jwtToken.verify(req.headers['access-token'], 'shhhh', async function(err, decoded) {
                if(err){
                res.status(401).json({'msg':'No Access CaNNot Verify !'});
                throw err;
        }
        const data = await User.findById(decoded['_id']); 
        //console.log(decoded);
        await res.json({'email':data.email});
        //res.json({'msg':'Logged Out', 'email': decoded.email});        
});        

});



//export the routes
module.exports = router;

