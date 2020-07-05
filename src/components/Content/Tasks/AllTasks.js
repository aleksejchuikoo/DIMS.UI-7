import React from 'react';
import '../Users/Users.sass';
import Button from '../../UI/Button';
import ModalTask from './ModalTask';
import { Component } from 'react';
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
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  showModalEdit = (e) => {
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
    const { hash, task, handleDelete, handleEdit } = this.props;
    const { isOpen, isOpenEdit } = this.state;

    return (
      <>
        <div className='users__wrapper'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button className='userInfo' onClick={this.showModal}>
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
              <i className='fa fa-remove'></i>
            </Button>
            <Button action='create' handleButton={this.showModalEdit}>
              <i className='fa fa-edit'></i>
            </Button>
          </div>
        </div>

        <ModalTaskEdit task={task} isOpen={isOpenEdit} handleButton={this.showModalEdit} handleEdit={handleEdit} />

        <ModalTask task={task} isOpen={isOpen} handleButton={this.showModal} />
      </>
    );
  }
}

export default AllTasks;
