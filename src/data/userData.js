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
    portfolioValue: 30400, // Updated total portfolio value
    positions: [
      {
        name: "Hyperliquid Perpetual Strategy", // New position
        description: "Active strategy in perpetual futures",
        value: 18400, // New position value
        allocation: 60, // New allocation percentage
        pendingTransfer: false,
      },
      {
        name: "Cash",
        description: "Incoming Deposit 60% completed",
        value: 12000, // Updated cash value
        allocation: 40, // Updated allocation percentage
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
