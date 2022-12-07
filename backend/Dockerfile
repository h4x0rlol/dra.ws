FROM node:16

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]