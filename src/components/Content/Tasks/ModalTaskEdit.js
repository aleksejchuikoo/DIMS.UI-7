import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import '../../Header/Modal/Modal.sass';
import { v4 as uuidv4 } from 'uuid';
import Date from '../../UI/Date';
import Button from '../../UI/Button';
import CheckboxButton from '../../UI/CheckboxButton';
import ModalError from '../ModalError/ModalError';
import fire from '../../../config/Fire';

export default class ModalUserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      startDate: '',
      deadlineDate: '',
      description: '',
      error: '',
      errorInput: '',
      checkboxes: this.props.task.checkboxes,
    };
  }

  componentDidMount() {
    this.setState({
      taskName: this.props.task.taskName,
      startDate: this.props.task.startDate,
      deadlineDate: this.props.task.deadlineDate,
      description: this.props.task.description,
      checkboxes: this.props.task.checkboxes,
      error: '',
      errorInput: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const task = this.state;
    const db = fire.firestore();
    const { handleEditTask, handleButton, task: idTask, transferUserTasks } = this.props;
    const { errorInput, error, checkboxes } = this.state;

    const filterTasks = Object.fromEntries(
      Object.entries(task).filter((item) => item[0] !== 'error' && item[0] !== 'errorInput'),
    );

    let userTask = { ...filterTasks, checkboxes: true };
    userTask = Object.values(userTask).every((val) => !!val);

    if (userTask && error === '' && errorInput === '') {
      checkboxes.forEach((item) => {
        if (Object.values(item)[0]) {
          let flag = false;
          db.collection('UserTasks').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().taskId === idTask.id && doc.data().itemId === Object.keys(item)[0]) {
                flag = true;
              }
            });
          });
          if (flag === false) {
            const idUserTasks = uuidv4();
            db.collection('UserTasks')
              .doc(idUserTasks)
              .set({
                itemId: Object.keys(item)[0],
                taskId: idTask.id,
                status: '',
                id: idUserTasks,
              })
              .catch((err) => {
                console.log('Error ', err.message);
              });
            const transferUserTask = {
              itemId: Object.keys(item)[0],
              taskId: idTask.id,
              status: '',
              id: idUserTasks,
            };
            transferUserTasks(transferUserTask);
          }
        } else {
          db.collection('UserTasks').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().taskId === idTask.id && doc.data().itemId === Object.keys(item)[0]) {
                db.collection('UserTasks')
                  .doc(doc.data().id)
                  .delete();
              }
            });
          });
        }
      });
      handleEditTask(task, idTask.id);
    } else if (errorInput === false) {
      this.setState({
        errorInput: true,
      });
    } else {
      this.setState({
        error: true,
      });
    }

    handleButton(e);
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskName' && value.length >= 101) {
      this.setState({
        errorInput: false,
      });
    } else {
      this.setState({
        [name]: value,
        errorInput: '',
      });
    }
  };

  handleComponent = (val, name) => {
    this.setState({
      [name]: val,
    });
  };

  handleCheckbox = (id) => {
    const { checkboxes } = this.state;

    const checkboxesArr = checkboxes.map((item) => {
      const objKey = Object.keys(item)[0];
      if (objKey === id) {
        return { [objKey]: !item[id] };
      }
      return item;
    });

    this.setState({
      checkboxes: checkboxesArr,
    });
  };

  isError = () => {
    const { error, errorInput } = this.state;
    if (error && errorInput) {
      this.setState({
        error: '',
        errorInput: '',
      });
    } else if (error) {
      this.setState({
        error: '',
      });
    } else {
      this.setState({
        errorInput: '',
      });
    }
  };

  render() {
    const { taskName, startDate, deadlineDate, description, checkboxes, error, errorInput } = this.state;

    const { isOpen, handleButton, task, data, isDark } = this.props;

    return (
      <>
        <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
          <div className='newUser'>
            <form className='newUser__form' onSubmit={this.handleSubmit}>
              <h1 className='newUser__form_title'>
                <i className='fa fa-edit' />
                Edit task
              </h1>
              <div className='newUser__form_wrapper'>
                <div className='newUser__form_wrapper-inner'>
                  <div className='newUser__form_row'>
                    <input
                      type='text'
                      name='taskName'
                      placeholder='Task name'
                      value={taskName ? taskName : task.taskName}
                      onChange={this.handleInputChange}
                    />
                    <span
                      className='newUser__form_row-error'
                      style={taskName.length >= 100 ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    >
                      Max: 100 symbols
                    </span>
                  </div>
                </div>
              </div>
              <div className='newUser__form_wrapper'>
                <div className='newUser__form_wrapper-inner newUser-verticaly'>
                  <div className='newUser__form_wrapper-label'>
                    <label className='start-label'>Start date:</label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <Date
                      placeholder='DD/MM/YYYY'
                      name='startDate'
                      value={startDate ? startDate : task.startDate}
                      changeDate={this.handleComponent}
                    />
                  </div>
                </div>
                <div className='newUser__form_wrapper-inner newUser-verticaly'>
                  <div className='newUser__form_wrapper-label'>
                    <label className='deadline-label' style={{ whiteSpace: 'nowrap' }}>
                      Deadline date:
                    </label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <Date
                      placeholder='DD/MM/YYYY'
                      name='deadlineDate'
                      value={deadlineDate ? deadlineDate : task.deadlineDate}
                      changeDate={this.handleComponent}
                    />
                  </div>
                </div>
              </div>
              <div className='newUser__form_wrapper'>
                <div className='newUser__form_wrapper-inner'>
                  <div className='newUser__form_wrapper-input'>
                    <textarea
                      className='textarea-desc textareaEdit-desc'
                      name='description'
                      placeholder='Description'
                      value={description ? description : task.description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='newUser__form_wrapper'>
                <div className='assign__block'>
                  <div className='newUser__form_wrapper-label'>
                    <label className='assing-members'>Assign members:</label>
                  </div>
                  <div className='newUser__form_wrapper-input assignMembers-edit'>
                    {data.map((item, i) => {
                      return (
                        <div className='assign-member'>
                          <CheckboxButton
                            fullName={`${item.firstName} ${item.lastName}`}
                            key={item.id}
                            id={item.id}
                            user={item}
                            number={i}
                            handleCheckbox={this.handleCheckbox}
                            isActive={checkboxes.length ? checkboxes[i][item.id] : null}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='newUser__form-btns'>
                <div className='newUser__form-btn'>
                  <Button action='close' handleButton={handleButton}>
                    Cancel
                  </Button>
                </div>
                <div className='newUser__form-btn'>
                  <Button action='create' type='submit'>
                    Edit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ModalError error={error} errorInput={errorInput} handleButton={this.isError} isDark={isDark} />
      </>
    );
  }
}
