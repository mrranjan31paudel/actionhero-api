FROM node:12

WORKDIR /app
COPY . /app/

RUN npm install

EXPOSE 8581

CMD ["npm", "run", "dev"]
