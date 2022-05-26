var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '80fc8e33bb23c9bd072d',
        clientSecret: '1bed77d5b55ec13a58b4b82c1b9ae35f586d5be0',
        callbackURL: 'https://dswa5-11-ac-pt3008576.herokuapp.com/auth/github/callback'
        }, function(accessToken, refreshToken, profile, done) {
                Usuario.findOrCreate(
                    { "login" : profile.username},
                    { "nome" : profile.username},
                    function(erro, usuario){
                        if(erro){
                            console.log(erro);
                            return done(erro);
                        }
                        return done(null, usuario);
                    }
                )
        }));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
                done(null, usuario);
            });
        });
};
