import React from 'react';
import '../../Header/Modal/Modal.sass';
import CrossButton from '../../UI/CrossButton';

export default function ModalTask({ isOpen, handleButton, task }) {
  return (
    <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
      <div className='headerModal userModal'>
        <div className='headerModal__header userModal__header'>
          <div className='headerModal__header-title userModal__header-title'>
            <i className='fa fa-info-circle'></i> Task information
          </div>
          <div className='headerModal__header-close'>
            <CrossButton handleButton={handleButton}>&times;</CrossButton>
          </div>
        </div>
        <div className='headerModal__wrapper'>
          <div className='task-info__wrapper'>
            <div className='headerModal__wrapper_item'>
              <span>Task name: </span>
              <span className='span-userData'>{task.taskName}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Start date: </span>
              <span className='span-userData'>{task.startDate}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Deadline date: </span>
              <span className='span-userData'>{task.deadlineDate}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Description: </span>
              <p className='taskDesc'>{task.description}</p>
            </div>
            {task.status && (
              <div className='headerModal__wrapper_item'>
                <span>Task name: </span>
                <span className='span-userData'>{task.status}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
