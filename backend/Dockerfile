FROM node:16

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]