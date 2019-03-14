import React from 'react';

export const Button = ({ className, withArrow, navigational, bg, ...props }) => (
  <button {...props}>{props.children}</button>
);

export default Button;
