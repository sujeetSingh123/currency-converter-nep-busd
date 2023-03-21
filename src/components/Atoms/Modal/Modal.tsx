'use client';
import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

interface IModal {
  isOpen: boolean;

  closeModal: () => void;
  footer?: () => React.ReactNode;
  children: React.ReactNode;
  title: string;
}
export default function Modal(props: IModal) {
  const { isOpen, closeModal, footer, children, title } = props;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between w-full ">
                    <Dialog.Title as="h3" className="text-[18px]  font-500 font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <AiOutlineClose color="black" size="20" />
                    </button>
                  </div>
                  <div className="mt-2">{children}</div>
                  {footer && <div className="mt-4">{footer()}</div>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
