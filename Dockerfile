FROM mcr.microsoft.com/playwright:v1.21.0-focal

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx playwright install --with-deps

EXPOSE 3000

CMD ["npx", "playwright", "test"]
