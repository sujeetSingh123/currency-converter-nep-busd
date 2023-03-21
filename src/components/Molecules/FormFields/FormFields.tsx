import clsx from 'clsx';
import { FC } from 'react';
import Input, { IInput } from '@/components/Atoms/Input/Input';

export interface IFormField extends IInput {
  label?: string;
  labelClass?: string;
  containerClass?: string;
}

const FormField: FC<IFormField> = ({ label, labelClass, containerClass, ...props }) => {
  return (
    <div className={clsx('flex flex-col', containerClass)}>
      {label && (
        <label htmlFor={props.id} className={clsx(labelClass, 'text-gray-500 mb-2')}>
          {label}
        </label>
      )}
      <div className={clsx(props.error && 'flex flex-col gap-1', props.disabled && 'bg-[#EDEDED]')}>
        <Input className="outline-none" {...props} />
        {props.error && <span className="flex flex-row gap-2 text-sm text-primary-60">{props.error}</span>}
      </div>
    </div>
  );
};

export default FormField;
