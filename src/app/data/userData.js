// src/data/userData.js
const USER_DATA = {
  client1: {
    name: "John Smith",
    portfolioValue: 20000,
    positions: [
      {
        name: "Stock A",
        description: "Tech company shares",
        value: 10000,
        allocation: 50,
        pendingTransfer: false,
      },
      {
        name: "Stock B",
        description: "Pharma company shares",
        value: 10000,
        allocation: 50,
        pendingTransfer: false,
      },
    ],
  },
  bobbogle24: {
    name: "Robert Bogle",
    portfolioValue: 30000,
    positions: [
      {
        name: "Stock C",
        description: "Energy company shares",
        value: 30000,
        allocation: 100,
        pendingTransfer: true,
      },
    ],
  },
  client3: {
    name: "Jane Doe",
    portfolioValue: 0,
    positions: [],
  },
};

export default USER_DATA;
