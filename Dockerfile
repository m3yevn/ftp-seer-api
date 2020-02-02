FROM node:10
#Base image
WORKDIR /usr/src/app
#Directory to start
COPY . .
#Copy all
RUN npm install
#Install node modules
EXPOSE 5050
#FTP seer runs on 5050 for default
CMD [ "node", "index.js" ]
#Serve with node
