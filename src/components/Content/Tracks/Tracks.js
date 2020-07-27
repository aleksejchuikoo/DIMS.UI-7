import React from 'react';
import '../Users/Users.sass';

function Tracks(props) {
  const { tasks } = props;
  return (
    <div className='users users-animation'>
      {tasks.length ? (
        <div className='users__tasks-block'>
          <div className='users__tasks-title'>
            <p className='task-title'>
              <i className='fa fa-tasks' />
              Tracks
            </p>
          </div>
          <div className='users__title'>
            <div className='users__title-name'>#</div>
            <div className='users__title-name'>task</div>
            <div className='users__title-name'>note</div>
            <div className='users__title-name'>date</div>
            <div className='users__title-name'>manage</div>
          </div>
        </div>
      ) : (
        <div className='users__tasks-title'>
          <p className='task-warning'>
            <i className='fa fa-warning' />
            No tasks
          </p>
        </div>
      )}
    </div>
  );
}

export default Tracks;
