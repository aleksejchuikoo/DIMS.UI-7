import React from 'react';
import '../Users/Users.sass';
import AllTasks from './AllTasks';

export default function Tasks(props) {
  const { tasks, handleDelete, handleEdit, data, handleCheckbox } = props;
  return (
    <div className='users users-animation'>
      {tasks.length ? (
        <div className='users__tasks-block'>
          <div className='users__tasks-title'>
            <p className='task-title'>
              <i className='fa fa-tasks' />
              All tasks
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
            return (
              <AllTasks
                data={data}
                task={item}
                key={item.id}
                hash={i + 1}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleCheckbox={handleCheckbox}
              />
            );
          })}
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
