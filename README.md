# Ethereum Transaction Crawler

This application allows a user to view transaction data from Ethereum blockahin associated a specific wallet address.

## Functionalities
1. Crawl and visualize all transaction data (addresses that have sent and received tokens from the address and how much ETH was used for a given transaction) from given starting block.

2. Calculate Token amount of a wallet address at given date time (YYYY-MM-DD 00:00 UTC time). Token can be ETH, USDT, USDC, MATIC. BNB and custom token with token address.

## Tech stacks
- React
- Material UI
- Styled-Component
- React Data Table
- Etherscan API
- Alchemy API

## Install and run

First clone thisrepository.

```bash
$ git clone https://github.com/bluesky0724/eth-transaction-crawler.git
```

Copy .env.example and make new env file .env
We need [`Etherscan API Key`](https://etherscan.io/apis) and [`Alchemy API Key`](https://www.alchemy.com/)

```bash
$ cp .env.example .env
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system. Node 16.0+ is prefered.

```bash
$ npm install # or yarn
```

Run it
```bash
$ npm start # or yarn start
```

