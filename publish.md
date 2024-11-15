# How to publish arranger (for CLIN)

1. Prepare local node

```
cd arranger
nvm use 15
npm cache clean --force
```

2. bump all package.json versions for:

- middleware
- mapping-utils
- schema
- admin
- admin-ui
- server

3. Publish to NPM repository

for every modules in order, `cd <module>`

- middleware
- mapping-utils
- schema
- admin
- server

_admin-ui (can be ignored, if no changes made)_

```
npm install && npm run prepare && npm publish
```

specific for **server module**

```
npm install --legacy-peer-deps && npm run prepare && npm publish
```

_Note: that step requires NPM access, ask front-end lead_
