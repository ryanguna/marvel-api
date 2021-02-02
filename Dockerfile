FROM node:14.15.4-alpine3.10

WORKDIR /app
COPY . .

RUN rm -rf node_modules

RUN yarn build

# Tell docker which port will be used
EXPOSE 3000

CMD ["yarn", "start"]