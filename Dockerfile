FROM node:10.15.3-alpine

RUN cp /etc/apk/repositories /etc/apk/repositories.bak
RUN echo "http://mirrors.aliyun.com/alpine/v$(cat /etc/alpine-release | cut -b 1-3)/main/" > /etc/apk/repositories

# Copy application files
COPY . /usr/local/app/
WORKDIR /usr/local/app/

# Install Node.js dependencies
# For chinese user, please unmark the follow code for improving building performance
RUN npm config set registry=http://registry.npm.taobao.org
RUN npm install && npm cache clean --force

CMD ["node", "server.js" ]
