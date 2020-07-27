import React, { Component } from 'react';
import '../Users/Users.sass';
import Button from '../../UI/Button';
import ModalTask from './ModalTask';
import ModalTaskEdit from './ModalTaskEdit';

class AllTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenEdit: false,
    };
  }

  showModal = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  showModalEdit = (e, checkboxes) => {
    const { isOpenEdit } = this.state;
    e.preventDefault();

    if (isOpenEdit) {
      this.setState({
        isOpenEdit: false,
      });
    } else {
      this.setState({
        isOpenEdit: true,
      });
    }
  };

  render() {
    const { hash, task, handleDelete, handleEditTask, data, isDark, userTasks, transferUserTasks } = this.props;
    const { isOpen, isOpenEdit } = this.state;

    return (
      <>
        <div className='users__wrapper'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button type='button' className='userInfo' onClick={this.showModal}>
              {task.taskName}
            </button>
          </div>
          <div className='users__wrapper_item'>{task.startDate}</div>
          <div className='users__wrapper_item'>{task.deadlineDate}</div>
          <div className='users__wrapper_item'>
            {task.description.length > 10 ? task.description.slice(0, 9) + '..' : task.description}
          </div>
          <div className='users__wrapper_item users__wrapper_item-marks'>
            <Button action='delete' handleButton={() => handleDelete(task.id)}>
              <i className='fa fa-remove' />
            </Button>
            <Button action='create' handleButton={this.showModalEdit}>
              <i className='fa fa-edit' />
            </Button>
          </div>
        </div>

        <ModalTaskEdit
          data={data}
          task={task}
          isDark={isDark}
          isOpen={isOpenEdit}
          handleButton={this.showModalEdit}
          handleEditTask={handleEditTask}
          userTasks={userTasks}
          transferUserTasks={transferUserTasks}
        />

        <ModalTask task={task} isOpen={isOpen} handleButton={this.showModal} />
      </>
    );
  }
}

export default AllTasks;
