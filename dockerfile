FROM node

COPY *.js .
COPY *.json . 

RUN npm install

ENTRYPOINT ["node"]
CMD ["index.js"]
