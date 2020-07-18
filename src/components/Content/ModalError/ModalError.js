import React from 'react';
import CrossButton from '../../UI/CrossButton';
import '../../Header/Modal/Modal.sass';

function ModalError(props) {
  const { error, handleButton, isDark, errorInput } = props;

  const errorObj = {
    width: '500px',
    height: '100px',
  };

  return (
    <div className='headerModalOverlay' style={error || errorInput ? { display: 'flex' } : { display: 'none' }}>
      <div className={`headerModal headerModal-error ${isDark ? 'theme-dark' : ''}`} style={errorObj}>
        <div className='headerModal__header' style={{ borderBottom: 'none' }}>
          <div className='headerModal__header-title modal-error'>
            <i className='fa fa-warning' />
            {error && 'Not all fields are filled'}
            {errorInput && 'Field filled incorrectly'}
          </div>
          <div className='headerModal__header-close'>
            <CrossButton handleButton={handleButton}>&times;</CrossButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalError;
