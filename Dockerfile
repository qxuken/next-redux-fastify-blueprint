FROM node:11.9-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm config set unsafe-perm true \
    && npm install -g yarn \
    && npm config set unsafe-perm false
RUN yarn install --production
COPY . .

EXPOSE 3000
CMD [ "yarn", "build-n-start" ]
