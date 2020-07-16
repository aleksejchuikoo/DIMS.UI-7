import React from 'react';
import '../Users.sass';

function Progress(props) {
  const { hash } = props;
  return (
    <div className='user__task'>
      <div className='users__wrapper'>
        <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
          {hash}
        </div>
        <div className='users__wrapper_item'>
          <button type='button' className='userInfo'>
            Task
          </button>
        </div>
        <div className='users__wrapper_item'>Note</div>
        <div className='users__wrapper_item'>Date</div>
      </div>
    </div>
  );
}

export default Progress;
