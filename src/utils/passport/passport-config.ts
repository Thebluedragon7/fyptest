import bcrypt from "bcrypt";
import { PassportStatic } from "passport";
import passportLocal from "passport-local";
import prisma from "../../data/data-source/prisma";

const LocalStrategy = passportLocal.Strategy;

const authenticateUser = async (
  username: string,
  password: string,
  done: Function
) => {
  const user = await prisma.admin.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return done(null, false, {
      message: "No User with that username",
    });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Incorrect Password",
      });
    }
  } catch (e) {
    done(e);
  }
};

const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  // @ts-ignore
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    const user = await prisma.admin.findUnique({
      where: {
        id: id,
      },
    });
    return done(null, user);
  });
};

export default initializePassport;
