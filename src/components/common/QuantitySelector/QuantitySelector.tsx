/**
 * QuantitySelector Component
 *
 * Seletor de quantidade com botões de incremento/decremento.
 */

import React from 'react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  // Size styles
  const sizeStyles = {
    sm: {
      button: 'h-6 w-6 text-sm',
      input: 'h-6 w-12 text-sm',
    },
    md: {
      button: 'h-8 w-8 text-base',
      input: 'h-8 w-14 text-base',
    },
    lg: {
      button: 'h-10 w-10 text-lg',
      input: 'h-10 w-16 text-lg',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div className="inline-flex items-center gap-2">
      {/* Decrement Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={`
          ${currentSize.button}
          flex items-center justify-center
          rounded-lg border border-cinza-300
          bg-white hover:bg-cinza-50
          text-grafite-700 font-semibold
          transition-colors duration-200
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
          focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:ring-offset-1
        `}
        aria-label="Diminuir quantidade"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`
          ${currentSize.input}
          text-center font-semibold
          border border-cinza-300 rounded-lg
          bg-white text-grafite-900
          focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-magenta-500
          disabled:opacity-40 disabled:cursor-not-allowed
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
        `}
        aria-label="Quantidade"
      />

      {/* Increment Button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={`
          ${currentSize.button}
          flex items-center justify-center
          rounded-lg border border-cinza-300
          bg-white hover:bg-cinza-50
          text-grafite-700 font-semibold
          transition-colors duration-200
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
          focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:ring-offset-1
        `}
        aria-label="Aumentar quantidade"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(QuantitySelector);
