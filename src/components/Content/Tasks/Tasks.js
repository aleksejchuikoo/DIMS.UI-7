import React from 'react';
import '../Users/Users.sass';
import AllTasks from './AllTasks';

export default function Tasks(props) {
  const { tasks, handleDelete, handleEdit } = props;
  return (
    <div className='users users-animation'>
      {tasks.length ? (
        <div className='users__tasks-block'>
          <div className='users__tasks-title'>
            <p className='task-title'>
              <i className='fa fa-tasks'></i>All tasks
            </p>
          </div>
          <div className='users__title'>
            <div className='users__title-name'>#</div>
            <div className='users__title-name'>name</div>
            <div className='users__title-name'>start date</div>
            <div className='users__title-name'>deadline date</div>
            <div className='users__title-name'>description</div>
            <div className='users__title-name'>manage</div>
          </div>
          {tasks.map((item, i) => {
            return <AllTasks task={item} key={i} hash={i + 1} handleDelete={handleDelete} handleEdit={handleEdit} />;
          })}
        </div>
      ) : (
        <div className='users__tasks-title'>
          <p className='task-warning'>
            <i className='fa fa-warning'></i> No tasks
          </p>
        </div>
      )}
    </div>
  );
}
