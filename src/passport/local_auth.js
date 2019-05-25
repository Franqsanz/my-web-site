const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// estrategia de registro de usuarios a la DB
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, 
async (req, email, password, done) => {
    // comparamos si el usuario ya existe o no en la DB
    const compareUser = await User.findOne({email: email});
    
    if (compareUser) {
        done(null, false)
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPass(password);
        // newUser.password = password;
        await newUser.save();
        done(null, newUser);   
    } 
}));

// estrategia para comparar los datos registrados de los usuarios en la DB
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, 
async (req, email, password, done) => {
    // verificamos el usuario si su mail o password estan correctos como en la DB
    const verifyUser = await User.findOne({email: email, password: password});

    if (!verifyUser) {
        done(null, false);
    }

    /*if (!verifyUser.comparePass(password)) {
        done(null, false);
    }*/

    done(null, verifyUser);  
}));