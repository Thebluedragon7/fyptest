## **Authentication**

```
npm i bcrypt
```

- Import `bcrypt` as bcrypt
- Create Salt: `bcrypt.genSalt()`
- Create Hash: `bcrypt.hash(req.body.password, salt)`

#### **Create Authentication login**

- Find user with username
- check if user exists
- Try: await `bcrypt.compare(req.body.password, user.password)` -> boolean
- Catch: status `500`

## **JWT Authentication**

```
npm i jsonwebtoken
```

You need to first authenticate the user

- import `jsonwebtoken` as JWT
- sign the user with JWT
  - `node; require('crypto').randomBytes(64).toString('hex')`
  - Create `ACCESS_TOKEN_SECRET` & `REFRESH_TOKEN_SECRET`
  - `jwt.sign(user, ACCESS_TOKEN_SECRET`
  - `res.json({accessToken})`

#### **Authenticate Middleware**

```js
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```
