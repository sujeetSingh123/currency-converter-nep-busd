import { useCallback, useEffect, useState } from 'react';

import { Network } from '@web3-react/network';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import type { Web3ReactHooks } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

import Button from '@/components/Atoms/Button/Button';
import { getAddChainParameters } from '@/utils/chains';

interface IConnectToBinance {
  closeModal: () => void;
  error: Error | undefined;
  setError: (error: Error | undefined | any) => void;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  connector: MetaMask | WalletConnect | WalletConnectV2 | CoinbaseWallet | Network | GnosisSafe;
}
export function ConnectToBinance({ connector, activeChainId, error, setError, closeModal }: IConnectToBinance) {
  const [desiredChainId, setDesiredChainId] = useState<number>();

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const switchChain = useCallback(
    async (desiredChainId: number | undefined) => {
      if (desiredChainId) {
        setDesiredChainId(desiredChainId);
        try {
          if (
            // If we're already connected to the desired chain, return
            desiredChainId === activeChainId ||
            // If they want to connect to the default chain and we're already connected, return
            (desiredChainId === -1 && activeChainId !== undefined)
          ) {
            setError(undefined);

            return;
          }

          if (desiredChainId === -1 || connector instanceof GnosisSafe) {
            await connector.activate();
          } else if (
            connector instanceof WalletConnectV2 ||
            connector instanceof WalletConnect ||
            connector instanceof Network
          ) {
            await connector.activate(desiredChainId);
          } else {
            await connector.activate(getAddChainParameters(desiredChainId));
          }

          setError(undefined);
        } catch (error) {
          setError(error);
        }
      }
    },
    [connector, activeChainId, setError],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }} />
      {error ? (
        <Button buttonType="success" label="Try again?" onClick={() => switchChain(56)}></Button>
      ) : (
        <Button
          label="Disconnect"
          buttonType="danger"
          onClick={() => {
            if (connector?.deactivate) {
              void connector.deactivate();
            } else {
              void connector.resetState();
            }
            setDesiredChainId(undefined);
            closeModal();
          }}
        ></Button>
      )}
    </div>
  );
}
