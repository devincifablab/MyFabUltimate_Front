FROM node

COPY ./package*.json /home/node/MyFabUltimate_Front/
WORKDIR /home/node/MyFabUltimate_Front/
RUN npm install
COPY . .
#RUN npm run build
#CMD npm run start