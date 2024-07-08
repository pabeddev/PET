FROM node:20

# Crear el directorio node_modules con los permisos adecuados
RUN mkdir -p /home/node/app/node_modules && \
    chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# Cambiar temporalmente a root para ejecutar npm install
USER root
RUN npm install
USER node

COPY --chown=node:node . .

EXPOSE 3030

CMD [ "npm", "run", "dev" ]
