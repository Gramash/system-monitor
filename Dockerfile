FROM node:14.8.0-stretch-slim
WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
RUN ng build
CMD ng serve --host 0.0.0.0 --port 4200 --disableHostCheck
