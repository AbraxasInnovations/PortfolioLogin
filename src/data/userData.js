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
        name: "Cash",
        description: "Incoming Deposit 60% completed",
        value: 30000,
        allocation: 100,
        pendingTransfer: true,
      },
    ],
  },
  client4: {
    name: "Jane Dog",
    portfolioValue: 1000,
    positions: [
      {
        name: "Cash",
        description: "Incoming Deposit to Core Cash Position",
        value: 1000,
        allocation: 100,
        pendingTransfer: true,
      },
    ],
  },
};

export default USER_DATA;
