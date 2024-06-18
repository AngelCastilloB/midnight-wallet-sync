# midnight-wallet-sync

## Description of the Issue

The midnight wallet from `@midnight-ntwrk/wallet` doesnt sycn when it is just created, but after a new wallet is created, if the wallet instance is destroyed and recreated, the wallet starts to sync.

## Expected Behavior

A wallet is created using fresh new mnemonics using `WalletBuilder.buildFromSeed`. The wallet is configured with the following URLS:

```
const INDEXER_ADDRESS = 'https://indexer.devnet.midnight.network/api/v1/graphql';
const NODE_ADDRESS = 'https://rpc.devnet.midnight.network';
const PROVING_SERVER_ADDRESS = 'http://localhost:6300';
```

The wallet starts to sync and emits updated states, example:

```
{
  address: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58|01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58',
  coins: [],
  encryptionPublicKey: '01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 2353n, total: 2441n }
}
{
  address: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58|01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58',
  coins: [],
  encryptionPublicKey: '01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 2353n, total: 2441n }
}
{
  address: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58|01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58',
  coins: [],
  encryptionPublicKey: '01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 2403n, total: 2441n }
}
{
  address: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58|01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'ddbad878d53002a8dfdbc8833f8f5c5e0b1ba06dd3aeddf71bb5536623d05f58',
  coins: [],
  encryptionPublicKey: '01000156946d3b6b930b7356efcdb73f1cfe5f615935aa38e8b940ee1b867533465d14',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 2441n, total: 2441n }
}
```
...

## Actual Behavior

A wallet is created using fresh new mnemonics using `WalletBuilder.buildFromSeed`. The wallet is configured with the following URLS:

```
const INDEXER_ADDRESS = 'https://indexer.devnet.midnight.network/api/v1/graphql';
const NODE_ADDRESS = 'https://rpc.devnet.midnight.network';
const PROVING_SERVER_ADDRESS = 'http://localhost:6300';
```

The wallet doesnt sync and we get from the websocket the same state over and over, example:

```
{
  address: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c|01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c',
  coins: [],
  encryptionPublicKey: '01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 0n, total: 2441n }
}
{
  address: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c|01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c',
  coins: [],
  encryptionPublicKey: '01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 0n, total: 2441n }
}
{
  address: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c|01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  availableCoins: [],
  balances: {},
  coinPublicKey: 'b62645cb47fa441a51b4da9a7e5fda1bfc7a9fbc387b2431ec50655096ea681c',
  coins: [],
  encryptionPublicKey: '01000162986086ae1d45adb75f3ff171d9275c6318c1d54ddfc949b9279ae1a768d26f',
  pendingCoins: [],
  transactionHistory: [],
  syncProgress: { synced: 0n, total: 2441n }
}
```

The sync progress stays at synced: 0.

## Steps to Reproduce

Provide a step-by-step guide on how to reproduce the issue:
1. Clone this repository.
3. Run `npm install`.
4. Execute `npm run build && npm run start`
5. Observe the output and behavior.

## Minimal Reproduction

Inside the repo you will find two lines (54 and 55) in at file `src/index.ts`:

```
  wallet.start(); // Comment this line, and uncomment the next line to make the wallet sync
  // wallet = await restartWallet(wallet);
```

If you swith these two lines:

```
  //wallet.start();
  wallet = await restartWallet(wallet);
```

The wallet starts syncing correctly, this code is executed to make the wallet sync:

```
const restartWallet = async (
  wallet: Resource & Wallet
) => {
  wallet.start();

  const serialized = await wallet.serializeState();
  await wallet.close();

  const reloadedWallet = await WalletBuilder.restore(
    INDEXER_ADDRESS,
    convertHttpToWebSocket(INDEXER_ADDRESS),
    PROVING_SERVER_ADDRESS,
    NODE_ADDRESS,
    serialized,
  );

  reloadedWallet.start();

  return reloadedWallet;
};
```

## Environment
Detail the environment in which the issue occurs:
- **@midnight-ntwrk/wallet:** ^3.5.9,
- **@midnight-ntwrk/wallet-api:** ^3.3.1,
- **@midnight-ntwrk/zswap:** ^0.3.11
- **Operating System:** Ubuntu 20.04
- **Node.js version:** v18.18.2
- **npm/yarn version:** 9.8.1
- **Webpack version:** 5.92.0

