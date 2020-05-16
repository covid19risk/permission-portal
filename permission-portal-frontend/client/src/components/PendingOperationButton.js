import React, { useState } from 'react';

// Encapsulates a button driven operation which takes time and may succeed or fail
const PendingOperationButton = (props) => {
  const [state, setState] = React.useState({
    isOperationStarted: false,
    operationSucceeded: false
  });

  const className = props.className || "";
  const timeoutInSeconds = props.timeoutInSeconds || 3;
  const operation = props.operation || (() => {});

  const startOperation = () => {
    setState({
        isOperationStarted: true,
        operationSucceeded: false
    });
    const onSuccess = () => {
        setState({
            isOperationStarted: false,
            operationSucceeded: true
        });
    };
    const onFailure = () => {
        setState({
            isOperationStarted: false,
            operationSucceeded: false
        });
    };
    operation().then(onSuccess, onFailure);
  };

  if (!state.isOperationStarted) {
    return (
      <div className={className} onClick={startOperation}>
        {props.children}
      </div>)
  } else {
    return (
      <div className={className}>
        Saving...
      </div>)
  }
};

export default PendingOperationButton;