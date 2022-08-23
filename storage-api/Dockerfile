FROM node:14
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8081
CMD ["node", "app.js"]