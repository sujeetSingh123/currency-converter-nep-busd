'use client';
import React from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MdSwapCalls } from 'react-icons/md';

import Button from '@/components/Atoms/Button/Button';
import MetaMaskCard from '@/components/Molecules/Web3/MetaMaskCard';
import FormField from '@/components/Molecules/FormFields/FormFields';

const Modal = dynamic(() => import('@/components/Atoms/Modal/Modal'), {
  ssr: false,
});

const CurrencyConverter = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [metaMaskCardModalOpen, setMetaMaskCardModalOpen] = React.useState(false);

  const [np, setNpValue] = React.useState(0);
  const [busd, setBusd] = React.useState(0);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSwapHandle = () => {
    setNpValue(busd);
    setBusd(busd * 3);
  };

  const handleInputChange = (
    value: string,
    setValue: (value: number) => void,
    conversionRate: number,
    setConvertedValue: (data: number) => void,
  ) => {
    const newValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal point
    setValue(+newValue);
    const convertedValue = +(+newValue * conversionRate).toFixed(2);
    setConvertedValue(convertedValue);
  };

  return (
    <div className=" w-1/4">
      <div className="flex justify-center mb-[64px]">
        <Image alt="neptune-mutual" width="330" height="130" src="/neptune-mutual.png" />
      </div>
      <Modal
        title="Wallet Details"
        isOpen={isOpen}
        closeModal={toggleModal}
        footer={() => (
          <div className="flex flex-end gap-2">
            <Button
              label="Connect"
              className="w-[200px]"
              buttonType="primary"
              onClick={() => setMetaMaskCardModalOpen(true)}
            ></Button>
            <Button className="w-[200px]" onClick={toggleModal} buttonType="secondary" label="Cancel"></Button>
          </div>
        )}
      >
        <p className="text-red-500 my-4 tex">
          Wallet Not Connected. Please Click &apos;Connect&apos; to connect to your wallet
        </p>
      </Modal>

      <Modal title="Wallet Details" isOpen={metaMaskCardModalOpen} closeModal={() => setMetaMaskCardModalOpen(false)}>
        <MetaMaskCard closeModal={() => setMetaMaskCardModalOpen(false)} />
      </Modal>
      <form className="w-full border-2 shadow-xl my-auto bg-white rounded-xl px-4 py-10">
        <h3 className="text-center font-bold text-2xl">Crypto convertor</h3>
        <div className="mt-4 mb-4">
          <FormField
            type="number"
            value={np}
            label="Nep"
            onChange={(e) => {
              handleInputChange(e.target.value, setNpValue, 3, setBusd);
            }}
          />
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={onSwapHandle}>
            <MdSwapCalls size={'30'} color="gray" />
          </button>
        </div>

        <div className="mt-4">
          <FormField
            type="number"
            value={busd}
            label="BUSD"
            onChange={(e) => {
              handleInputChange(e.target.value, setBusd, 1 / 3, setNpValue);
            }}
          />
        </div>

        <button className="mx-auto text-blue-400 flex mt-4" onClick={toggleModal} type="button">
          Check Wallet Details
        </button>
      </form>
    </div>
  );
};

export default CurrencyConverter;
