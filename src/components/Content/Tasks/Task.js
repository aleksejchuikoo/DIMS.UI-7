import React, { Component } from 'react';
import Button from '../../UI/Button';
import ModalTask from './ModalTask';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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
  render() {
    const { hash, tasks, failStatus, successStatus } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div className='user__task'>
          <div className='users__wrapper users__wrapper-tasks'>
            <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
              {hash}
            </div>
            <div className='users__wrapper_item'>
              <button className='userInfo' onClick={this.showModal}>
                {tasks.taskName}
              </button>
            </div>
            <div className='users__wrapper_item'>{tasks.startDate}</div>
            <div className='users__wrapper_item'>{tasks.deadlineDate}</div>
            <div className='users__wrapper_item'>
              {tasks.description.length > 10 ? tasks.description.slice(0, 9) + '..' : tasks.description}
            </div>
            <div className='users__wrapper_item'>{tasks.status}</div>
            <div className='users__wrapper_item users__wrapper_item-marks'>
              <Button action='delete' handleButton={() => failStatus('Fail', tasks, tasks.id)}>
                <i className='fa fa-thumbs-down'></i>
              </Button>
              <Button action='create' handleButton={() => successStatus('Success', tasks, tasks.id)}>
                <i className='fa fa-thumbs-up'></i>
              </Button>
            </div>
          </div>
        </div>
        <ModalTask task={tasks} isOpen={isOpen} handleButton={this.showModal} />
      </>
    );
  }
}

export default Task;
