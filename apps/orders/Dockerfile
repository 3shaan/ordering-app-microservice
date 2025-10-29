FROM node:22-alpine as Development

WORKDIR /usr/src/app

# Install pnpm globally
RUN corepack enable  && corepack prepare  pnpm@10.11.0 --activate

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build


FROM node:22-alpine as Production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install pnpm globally
RUN corepack enable  && corepack prepare  pnpm@10.11.0 --activate

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --prod

COPY . .

COPY --from=Development /usr/src/app/dist ./dist

CMD [ "node", "dist/app/order/main" ]
