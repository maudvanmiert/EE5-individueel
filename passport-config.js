const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize (passport, getUserbyUsername, getUserById){
    const authenticateUser = async (username, password, done)=>{
        const user = getUserbyUsername(username)
        if(user == null){
            console.log('geen met die username')
            return done(null, false, {message: 'no user with that username'})
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                console.log('goe i guess')
                return done(null, user)
            } else {
                console.log('password fout')
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            console.log('catch error')
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null,user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}

module.exports = initialize;