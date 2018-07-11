FROM node:8

ENV NODE_ENV=development
ENV DEBUG=true

WORKDIR /home/node/my_node_app

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5000

COPY *.js /home/node/my_node_app/
COPY spotifyCreds.json . 

RUN chown  -R  node:users /home/node/


USER node

CMD [ "node", "unqfyServer" ]
