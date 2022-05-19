var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var Usuario = mongoose.model('Usuario');
    passport.use(new GitHubStrategy({
        clientID: 'SEU CLIENT ID',
        clientSecret: 'SEU CLIENT PASSWORD',
        callbackURL: 'SUA REDIRECT_URI'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, Usuario) {
                if(erro){
                    console.log(erro);
                    return done(erro);
                }
                return done(null, Usuario);
            }
        );
    }));
};