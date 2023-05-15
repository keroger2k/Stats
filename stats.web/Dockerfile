FROM node:17-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start:production"]