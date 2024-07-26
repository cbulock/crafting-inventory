import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const LoadingSpinner = ({ size, show, children, className }) => (
  <span className={spinnerVariants({ show })}>
    <Loader2 className={cn(loaderVariants({ size }), className)} />
    {children}
  </span>
);

LoadingSpinner.defaultProps = {
  size: 'medium',
  show: true,
  children: null,
  className: '',
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  show: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default LoadingSpinner;
