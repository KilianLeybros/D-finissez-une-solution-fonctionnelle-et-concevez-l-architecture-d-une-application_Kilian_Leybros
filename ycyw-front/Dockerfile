FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i
RUN npm install -g @angular/cli
COPY . .
CMD  ["npm", "run","start", "--", "--host", "0.0.0.0", "--poll", "2000"]
