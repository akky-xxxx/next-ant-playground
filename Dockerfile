FROM node:12.13.1-alpine as base
WORKDIR ./build
ENV NODE_ENV=production

COPY . .
RUN yarn install && \
    yarn build && \
    rm -rf node_modules/.cache src/client/.next/cache .cache src/server src/api

#FROM node:12.13.1-alpine as app
#WORKDIR ./app
#COPY --from=base ./build/bin ./bin
#COPY --from=base ./build/src/client/.next ./src/client/.next
#COPY --from=base ./build/package.json ./package.json
#COPY --from=base ./build/.env ./.env
#COPY --from=base ./build/node_modules ./node_modules
ENV PORT=3000
CMD ["yarn", "serve"]
