import type { Network } from '@web3-react/network';
import type { MetaMask } from '@web3-react/metamask';
import type { Web3ReactHooks } from '@web3-react/core';
import type { GnosisSafe } from '@web3-react/gnosis-safe';
import type { WalletConnect } from '@web3-react/walletconnect';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

import { Chain } from './Chain';
import { Status } from './Status';
import { Accounts } from './Accounts';
import { ConnectToBinance } from './ConnectToBinance';

interface Props {
  accounts?: string[];
  closeModal: () => void;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  provider?: ReturnType<Web3ReactHooks['useProvider']>;
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  connector: MetaMask | WalletConnect | WalletConnectV2 | CoinbaseWallet | Network | GnosisSafe;
}

export function Card({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
  closeModal,
}: Props) {
  return (
    <div>
      <b>{'MetaMask'}</b>
      <div style={{ marginBottom: '1rem' }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={activeChainId} />
      <div style={{ marginBottom: '1rem' }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectToBinance
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
        closeModal={closeModal}
      />
    </div>
  );
}
