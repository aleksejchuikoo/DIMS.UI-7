import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import '../../Header/Modal/Modal.sass';
import Date from '../../UI/Date';
import Button from '../../UI/Button';
import CheckboxButton from '../../UI/CheckboxButton';
import ModalError from '../ModalError/ModalError';

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
      idMembers: this.props.task.idMembers,
      checkboxes: Array(this.props.data.length).fill(false),
    };
  }

  componentDidMount() {
    this.setState({
      taskName: this.props.task.taskName,
      startDate: this.props.task.startDate,
      deadlineDate: this.props.task.deadlineDate,
      description: this.props.task.description,
      error: '',
      errorInput: '',
      idMembers: this.props.task.idMembers,
      checkboxes: this.props.task.checkboxes,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const task = this.state;
    const { handleEdit, handleButton } = this.props;
    const { errorInput, error } = this.state;

    const filterTasks = Object.fromEntries(
      Object.entries(task).filter((item) => item[0] !== 'error' && item[0] !== 'errorInput'),
    );
    console.log(error);
    console.log(errorInput);

    let userTask = { ...filterTasks, idMembers: true, checkboxes: true };
    userTask = Object.values(userTask).every((val) => !!val);
    console.log(userTask);

    if (userTask && error === '' && errorInput === '') {
      handleEdit(task, this.props.task.id);
    } else if (errorInput === false) {
      console.log('error');
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

  handleCheckbox = (id, number, user) => {
    const { checkboxes, idMembers } = this.state;
    const { handleCheckbox } = this.props;

    const firstArr = checkboxes.slice(0, number);
    const secondArr = checkboxes.slice(number + 1);

    this.setState({
      checkboxes: [...firstArr, (checkboxes[number] = !checkboxes[number]), ...secondArr],
    });

    if (!idMembers.includes(id)) {
      this.setState({
        idMembers: [...idMembers, id],
      });
    } else {
      const filterIdMembers = idMembers.filter((item) => item !== id);
      this.setState({
        idMembers: filterIdMembers,
      });
    }

    handleCheckbox(id, number, user);
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
                            isActive={checkboxes[i]}
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
