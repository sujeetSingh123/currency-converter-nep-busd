import React from 'react';
import clsx from 'clsx';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  error?: string;
  status?: boolean;
}

const Input = (props: IInput) => {
  const { error, disabled, status } = props;

  return (
    <input
      {...props}
      className={clsx(
        props.className,
        'outline-none ease-in w-full px-2 py-1 max-h-[43px] focus:outline-0 text-gray-500 border-0 p-0  focus:ring-none',
        status && error ? 'border-primary-60 placeholder-primary-60' : 'border-normal-input placeholder-normal-input',
        disabled && 'bg-[#EDEDED]',
        'border-2',
      )}
    ></input>
  );
};

export default Input;
