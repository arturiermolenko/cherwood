FROM node:16-alpine

WORKDIR /app/frontend/

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps

COPY . /app/frontend/


CMD ["npm", "start"]
