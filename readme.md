# **Environment File Sample**

> `./src/.env.local`

```
PORT=3000
DATABASE_URL=mysql://admin:pass123@localhost:3306/test_database
ACCESS_TOKEN_SECRET=d3552a52da30fb20d7f24b4c89a3a598c15f3e28c603baa2ab8e20b88df043fa6cbcdd1cfbaa881f8ac6e4a2d7b54fc087124c696de87acbc8b9992407122b07
REFRESH_TOKEN_SECRET=cfffb8361c2b06934ef2fe0954ccb4300ba2aabb8424ceb2f104e29043461abaabe841e2665c531215b7f73104ac49e698ef6fce568e0912d15e1ebce8f41f1f
SESSION_SECRET=9c839d3037eee9acce623eb3d22c61f8444bf74fdefa3fd09fcbab4170ef64b9c9c143e5f5bce2e51663e2deab746eb791bf01fad07ee6058efec09e71c4a50e
```

# **Environment Variables**

Create `.env.local` inside the directory `/src`

## `PORT`

Run your app on a certain port (integer).
Example:

```
PORT=3000
```

## `DATABASE_URL`

MySQL Database url (String)

```
mysql://<user>:<password>@<host>:<port>/<database>
```

Example:

```
DATABASE_URL=mysql://admin:pass123@localhost:3306/test_database
```

## `ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET`

Access token and refresh token secret for JWT authentication.

### **Recommended way**

> First open the terminal and enter `node` to enter interactive mode of node

> Enter the following command to generate random 64 bytes hex for both token secrets

```
require('crypto').randomBytes(64).toString('hex')
```

> Copy the 64 bytes hex code and use it as the token secrets

Example:

```
ACCESS_TOKEN_SECRET=d3552a52da30fb20d7f24b4c89a3a598c15f3e28c603baa2ab8e20b88df043fa6cbcdd1cfbaa881f8ac6e4a2d7b54fc087124c696de87acbc8b9992407122b07
REFRESH_TOKEN_SECRET=cfffb8361c2b06934ef2fe0954ccb4300ba2aabb8424ceb2f104e29043461abaabe841e2665c531215b7f73104ac49e698ef6fce568e0912d15e1ebce8f41f1f
```

## `SESSION_SECRET`

Session Secret to encrypt and handle session.

### **Recommended way**

Secret key can be generated from the `crypto` library as shown in the `ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET` section.

Example:

```
SESSION_SECRET=9c839d3037eee9acce623eb3d22c61f8444bf74fdefa3fd09fcbab4170ef64b9c9c143e5f5bce2e51663e2deab746eb791bf01fad07ee6058efec09e71c4a50e
```
