FROM node:12.15.0-alpine as base
WORKDIR ./build
COPY . .

# 資材のビルド
RUN yarn install
ENV NODE_ENV=production
RUN yarn build && rm -rf src/client/.next/cache node_modules

# dependencies のみの node_modules を作成
RUN yarn install

# 最終イメージ
FROM node:12.15.0-alpine as app
WORKDIR ./app
COPY --from=base ./build/bin ./bin
COPY --from=base ./build/src/client/.next ./src/client/.next
COPY --from=base ./build/node_modules ./node_modules
COPY .env .env
COPY package.json package.json
ENV NODE_ENV=production
ENV PORT=3000
CMD ["yarn", "serve:bff"]
