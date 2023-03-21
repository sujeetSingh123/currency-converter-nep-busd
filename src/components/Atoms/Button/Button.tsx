import React from 'react';
import clsx from 'clsx';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonType?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
}

const Button = (props: IButton) => {
  const { label, buttonType = 'primary', className, ...rest } = props;

  const classNameForButtonType = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-300 text-black',
    danger: 'bg-red-300 text-white',
    success: 'bg-green-300 text-white',
  };

  return (
    <button className={clsx(className, classNameForButtonType[buttonType], 'px-4 py-2 rounded-lg')} {...rest}>
      {label}
    </button>
  );
};

export default Button;
