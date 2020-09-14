ARG IMAGE=node:13.13-alpine
FROM $IMAGE as builder

WORKDIR /app

FROM builder

COPY package.json package-lock.json ./

RUN npm i

COPY . .
RUN ls

RUN npm run prebuild

RUN ls
RUN npm run build

CMD ["node", "dist/main"]