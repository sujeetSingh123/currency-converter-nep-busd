import { useEffect, useState } from 'react';

import { Card } from './Card';
import { hooks, metaMask } from '@/connectors/metaMask';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

interface IMetaMaskCard {
  closeModal: () => void;
}
export default function MetaMaskCard(props: IMetaMaskCard) {
  const { closeModal } = props;
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error | undefined>(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.warn('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
      closeModal={closeModal}
    />
  );
}
