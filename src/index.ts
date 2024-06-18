import { Resource, WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/zswap';
import * as bip39 from 'bip39';
import { Wallet } from "@midnight-ntwrk/wallet-api";

const INDEXER_ADDRESS = 'https://indexer.devnet.midnight.network/api/v1/graphql';
const NODE_ADDRESS = 'https://rpc.devnet.midnight.network';
const PROVING_SERVER_ADDRESS = 'http://localhost:6300';

const convertHttpToWebSocket = (address: string) =>
  `${address.replace(/(http)(s)?:\/\//, 'ws$2://')}/ws`;

// HACK: The wallet doesn't return updates when its first created, so we will
// create the wallet, start it, disconnect it, reload it and then restart it again.
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

const buildWallet = async () => {
  const mnemonicArray = bip39.generateMnemonic(256);
  const entropy = bip39.mnemonicToEntropy(mnemonicArray);

  setNetworkId(NetworkId.DevNet);

  return await WalletBuilder.buildFromSeed(
    INDEXER_ADDRESS,
    convertHttpToWebSocket(INDEXER_ADDRESS),
    PROVING_SERVER_ADDRESS,
    NODE_ADDRESS,
    entropy,
  );
};

(async () => {
  let wallet = await buildWallet();

  wallet.start(); // Comment this line, and uncomment the next line to make the wallet sync
  // wallet = await restartWallet(wallet);

  wallet.state().subscribe((state) => {
    console.log(state);
  });
})();
