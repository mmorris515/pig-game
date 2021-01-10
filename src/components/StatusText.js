import React from 'react';

const StatusText = ({statusText, className, id}) => {
  return (
    <span id={id} className={className}>
      {statusText}
    </span>
  );
};

export default StatusText;
