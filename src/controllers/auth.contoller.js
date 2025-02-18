import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
   const {email,password,username} = req.body;
    //console.log(email);
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            passwordHash,
            email
        })
    
        const userSaved = await newUser.save();
        jwt.sign({
            id: userSaved.id, 
        },
        "secret123",
        {
            expiresIn: "1d"
        },
        (err,token)=> {
            if(err) console.log(err);
            //res.json({token});
            res.cookie('token',token)
            res.json({
                message: "User created successfully"
            })
        }
        )
        //res.send('Registrado');
    } catch (error) {
        console.log(error);
    }
    
};

export const login = async (req, res) => {
    const {email,password} = req.body;
     //console.log(email);
     try {
         const userFound = await User.findOne({email});
         if(!userFound) return res.status(400).json({
            message: "User not found"
         });

         const isMatch = await bcrypt.compare(password, userFound.passwordHash);
         if(!isMatch) return res.status(400).json({
            message: "Incorrect password"
         });
         
        jwt.sign({
             id: userFound.id, 
         },
         "secret123",
         {
             expiresIn: "1d"
         },
         (err,token)=> {
             if(err) console.log(err);
             //res.json({token});
             res.cookie('token',token)
             res.json({
                 message: "User found"
             })
             console.log(
                userFound.email,
                userFound.username
             )
         }
         )
         //res.send('Registrado');
     } catch (error) {
         console.log(error);
     }
     
 };

export const logout = (req,res) =>{
    res.cookie('token',"",{
        expiresIn: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile =(req,res)=>{
    res.send("Profile")
};