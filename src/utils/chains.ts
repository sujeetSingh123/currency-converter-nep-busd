import type { AddEthereumChainParameter } from '@web3-react/types';

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = MAINNET_CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network: string) =>
  process.env.infuraKey ? `https://${network}.infura.io/v3/${process.env.infuraKey}` : '';
const getAlchemyUrlFor = (network: string) =>
  process.env.alchemyKey ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}` : '';

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation };

export const MAINNET_CHAINS: ChainConfig = {
  56: {
    urls: [getInfuraUrlFor('bnb-mainet'), getAlchemyUrlFor('eth-mainnet'), 'https://bsc-dataseed.binance.org'].filter(
      Boolean,
    ),
    name: 'Binance Smart Chain Mainnet',
  },
};
