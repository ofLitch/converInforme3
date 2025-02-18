import User from '../models/user.model.js'
export const register = async (req, res) => {
   const {email,password,username} = req.body;
    //console.log(email);
    try {
        const newUser = new User({
            username,
            password,
            email
        })
    
        await newUser.save();
        res.send('Registrado');
    } catch (error) {
        console.log(error);
    }
    
}

export const login = (req, res) => res.send('Login');