FROM node:16.18.1

ARG REACT_APP_HTTP_URL
ENV REACT_APP_HTTP_URL=$REACT_APP_HTTP_URL

ARG REACT_APP_WS_URL
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install 

COPY . .

RUN yarn build

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build