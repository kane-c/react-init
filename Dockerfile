FROM node:8-alpine

CMD ["npm", "start"]
EXPOSE 8080
WORKDIR /app

ENV \
  # Keep the image slim
  BABEL_DISABLE_CACHE=1 \
  # The official Docker image sets this to `info` which is far too verbose
  NPM_CONFIG_LOGLEVEL=warn \
  NODE_ENV=production

# TODO package-lock.json/npm-shrinkwrap.json or yarn.lock
ADD package.json .
RUN npm install --unsafe-perm && rm -rf ~/.node ~/.node-gyp ~/.npm /tmp/*
ADD . .

RUN npm run build
