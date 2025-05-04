const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../../models/users-model');

passport.use(new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async (login, password, done) => {
        const user = await Users.findByLogin(login);
        if (!user) return done(null, false, { message: 'Пользователь не существует' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Неверный пароль' });

        return done(null, user);
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Users.getById(id);
    done(null, user);
});
