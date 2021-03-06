#
# ---- Base build ----
#
FROM node:14.16.1 as base

WORKDIR /app
ADD . /app
RUN yarn
EXPOSE 3000

CMD [ "yarn", "start" ]
