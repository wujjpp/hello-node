FROM node:8.11.3-alpine

# Copy application files
COPY . /usr/local/app/
WORKDIR /usr/local/app/

# Install Node.js dependencies
# For chinese user, please unmark the follow code for improving building performance
RUN npm config set registry=http://registry.npm.taobao.org
RUN npm install && npm cache clean --force

CMD ["node", "server.js" ]
