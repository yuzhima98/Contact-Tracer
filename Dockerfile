FROM node:14-alpine

RUN apt-get update && apt-get install -y python build-essential && rm -rf /var/lib/apt/lists/*

EXPOSE 1880


WORKDIR /app


COPY ./backend/package*.json /backend
WORKDIR /backend
RUN npm install
WORKDIR /app

COPY ./frontend/package*.json /frontend
WORKDIR /frontend
RUN npm install
RUN /app

COPY . .

CMD ["node", "./backend/main.js"]
