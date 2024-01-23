const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserSchema');

// Use email instead of username
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email or password.' });
      const isValid = await user.isValidPassword(password);
      if (!isValid) return done(null, false, { message: 'Incorrect email or password.' });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
