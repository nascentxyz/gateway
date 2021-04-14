const http = require('http');
const util = require('util');
const { getTokensInfo } = require('./token');
const { genPort } = require('../util');

class Price {
  constructor(key, priceInfo, ctx) {
    this.key = key;
    this.priceInfo = priceInfo;
    this.ctx = ctx;
  }

  getKey() {
    return this.key;
  }

  getPriceInfo() {
    return this.priceInfo;
  }

  async post() {
    this.ctx.log(`Setting price of ${this.key}...`);
    let call = this.ctx.getApi().tx.oracle.postPrice(this.priceInfo.payload, this.priceInfo.signature);
    let events = await this.ctx.eventTracker.sendAndWaitForEvents(call, { onFinalize: true, rejectOnFailure: false });
  }
}

class Prices {
  constructor(prices, timestamp, runServer, serverPort, serverHost, reporter, ctx) {
    this.prices = prices;
    this.timestamp = timestamp;
    this.runServer = runServer;
    this.serverPort = serverPort;
    this.serverHost = serverHost;
    this.reporter = reporter;
    this.ctx = ctx;
  }

  pricesResponse() {
    let priceInfos = this.prices.map((price) => {
      return {
        key: price.getKey(),
        ...price.getPriceInfo(),
      }
    });

    return {
      messages: priceInfos.map((pi) => pi.payload),
      signatures: priceInfos.map((pi) => pi.signature),
      prices: priceInfos.reduce((acc, pi) => {
        return {
          ...acc,
          [pi.key]: pi.price
        };
      }, {}),
      reporter: this.reporter,
      timestamp: this.timestamp,
    };
  }

  postPrices() {
    return Promise.all(this.prices.forEach((price) => price.post()));
  }

  serverUrl() {
    if (this.runServer) {
      return `http://${this.serverHost}:${this.serverPort}/`;
    } else {
      return null;
    }
  }

  async start() {
    if (this.runServer) {
      let that = this;
      await new Promise((resolve, reject) => {
        const requestListener = function (req, res) {
          let data = that.pricesResponse();
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(data, null, 4));
        }

        let server = http.createServer(requestListener);
        server.listen(that.serverPort, that.serverHost, () => {
          that.ctx.log(`Price Server listening at ${that.serverUrl()}`)
          that.server = server;
          resolve();
        });
      });
    }
  }

  async teardown() {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server.close(resolve);
      });
    }
  }
}

let basePricesInfo = {
  server: true,
  server_port: null,
  server_host: '127.0.0.1',
  reporter: '0xfCEAdAFab14d46e20144F48824d0C09B1a03F2BC',
  timestamp: "1611811500",
  prices: {
    "BTC": {
      price: "31194.11",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124aac00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000007435058300000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034254430000000000000000000000000000000000000000000000000000000000",
      signature: "0xac90de58918e1f47f50d9fd45c70192bd961541c33b6ca0d6e33660d26eb0a350e062fbdd1754d6464a23ca7ae316be604a054d21defab26b570b7df5abaa802000000000000000000000000000000000000000000000000000000000000001c",
    },
    "ETH": {
      price: "1277.15",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124aac00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000004c1fc3300000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034554480000000000000000000000000000000000000000000000000000000000",
      signature: "0xa568da2015060b2292b9587771beae4d89968f00f613bf4800dc70addacf8fddcb6d0e9550018869ba5cf1da8665daf8e0f366a0af2ae38362ea006ec260fd4a000000000000000000000000000000000000000000000000000000000000001c",
    },
    "XTZ": {
      price: "2.9771",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124aac00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000002d6d4c00000000000000000000000000000000000000000000000000000000000000067072696365730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000358545a0000000000000000000000000000000000000000000000000000000000",
      signature: "0xb821144470c14e9e3e9c1232e7e5f2bfd31880b4baca0e83c07ac68e95ed8182a4a5229336e8a2b23035efc0c2a4aab6cdf7e9a86eb6f2c292c0d6189b57192c000000000000000000000000000000000000000000000000000000000000001c",
    },
    "DAI": {
      price: "1.000895",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124aac00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000f45bf0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034441490000000000000000000000000000000000000000000000000000000000",
      signature: "0x26423d5d1cc766531a53415cd6b8ec0f405721afb2715344ba8fc80187e3f2139d895a6661519513ee6d46fa534ee0e839f966e0610331be3f4cc7e81bf1e8ef000000000000000000000000000000000000000000000000000000000000001c",
    },
    "REP": {
      price: "20.055",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124aac00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000013203d80000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035245500000000000000000000000000000000000000000000000000000000000",
      signature: "0x1b0b6f4098f294a8a5dc5b17658c5e149a2ed69caab5fd7523345535e21514a813feac7a74c7d0bbb129140f33f6642aae515cc922c066feeed11fb0dc5e68b2000000000000000000000000000000000000000000000000000000000000001b",
    },
    "ZRX": {
      price: "0.5994535000000001",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000009259d0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a52580000000000000000000000000000000000000000000000000000000000",
      signature: "0x88a17e64f1f3417c826f253e3e61fbafb735a476aad6ebc3352cc9cb65667b5f832928d31309eef0c0030f17a2ffbce71bb783cebf8b397ceaee5103fc3c8db9000000000000000000000000000000000000000000000000000000000000001c",
    },
    "BAT": {
      price: "0.313242",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000004c79a0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034241540000000000000000000000000000000000000000000000000000000000",
      signature: "0x48eaea4f4a52601aa0010bb37780989c06402f244959770d494ef040702cdbb0594b74185d36e4f09b36ca5ee270768d3252091060c53798cc479d16b3ec40e0000000000000000000000000000000000000000000000000000000000000001c",
    },
    "KNC": {
      price: "1.29105",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000013b32a0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034b4e430000000000000000000000000000000000000000000000000000000000",
      signature: "0xeacaede608c49ad49820e1a2d08ccd4a85243acf0d9501daa7734c30b3ee7527ac8d21f90dd5f7d8f8d8877e780faf3c45f15d79f74782f9611721c4fe1c1ec6000000000000000000000000000000000000000000000000000000000000001c",
    },
    "LINK": {
      price: "23.245275",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000162b1db0000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044c494e4b00000000000000000000000000000000000000000000000000000000",
      signature: "0xc4e24d143451a2c81f4d99898cda68c50217279c7e05f7283dad29ed5bce5a23648c948e9edf7d1505bf002ba7a4fc9790fbb0838e6ea183d062ad75f7943bdd000000000000000000000000000000000000000000000000000000000000001c",
    },
    "COMP": {
      price: "229.125",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000da82b88000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004434f4d5000000000000000000000000000000000000000000000000000000000",
      signature: "0x8e248059830bc2affb38f656f576e1b513e23fc9d30fb3c0193427f4b94524637b7f84eba4619116860b1cdd3987c447e0a3ae97c0adc614592b9f4dd9de14a3000000000000000000000000000000000000000000000000000000000000001b",
    },
    "UNI": {
      price: "14.32715",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000da9d6e000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003554e490000000000000000000000000000000000000000000000000000000000",
      signature: "0x6e6861fae678306740e96ba0a978afe8db8ff361c7e277f17f41c7aac7edcf3785b87d368731c703d167751584745131e33bb16a6cc849f87ac6e0cc973e918f000000000000000000000000000000000000000000000000000000000000001c",
    },
    "GRT": {
      price: "0.4962",
      payload: "0x00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000060124a7000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000792480000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034752540000000000000000000000000000000000000000000000000000000000",
      signature: "0x99379f1fc46bc71981f281db2e33b7573dcf45519d03b46826d4b1ecd30c0d95f2b0288648059624e4e835ade6cf37dd3cc608ed4aaedb1af8ed6d4d31566508000000000000000000000000000000000000000000000000000000000000001b"
    }
  }
};

async function buildPrice(key, priceInfo, ctx) {
  let price = new Price(key, priceInfo, ctx);

  return price;
}

async function buildPrices(pricesInfoHash, tokensInfoHash, ctx) {
  let pricesInfo = {
    ...basePricesInfo,
    ...pricesInfoHash
  };
  let tokensInfo = await getTokensInfo(tokensInfoHash, ctx);
  let symbols = tokensInfo.map(([symbol, _]) => symbol.toUpperCase());
  let entries = Object.entries(pricesInfo.prices).filter(([k, v]) => k == 'ETH' || symbols.includes(k));
  let runServer = pricesInfo.server;
  let serverPort = pricesInfo.server_port || genPort();
  let serverHost = pricesInfo.server_host;
  let reporter = pricesInfo.reporter;
  let timestamp = pricesInfo.timestamp;

  let priceObjects = await entries.reduce(async (acc, [key, priceInfo]) => {
    return [
      ...await acc,
      await buildPrice(key, priceInfo, ctx)
    ];
  }, Promise.resolve([]));

  let prices = new Prices(priceObjects, timestamp, runServer, serverPort, serverHost, reporter, ctx);
  if (ctx.__usePriceServer()) {
    await prices.start();
  }

  return prices;
}

module.exports = {
  buildPrices,
  Prices,
};
