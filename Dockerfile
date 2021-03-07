FROM node:current-alpine3.10
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "start"]
