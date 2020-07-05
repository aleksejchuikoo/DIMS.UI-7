import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import '../../Header/Modal/Modal.sass';
import Date from '../../UI/Date';
import Button from '../../UI/Button';

export default class ModalUserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      startDate: '',
      deadlineDate: '',
      description: '',
      error: false,
    };
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      taskName: this.props.task.taskName,
      startDate: this.props.task.startDate,
      deadlineDate: this.props.task.deadlineDate,
      description: this.props.task.description,
      error: false,
    });
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     ...state,
  //     ...props.dataUser
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    const task = this.state;
    const { handleEdit, handleButton } = this.props;

    handleEdit(task, this.props.task.id);
    handleButton(e);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleComponent = (val, name) => {
    this.setState({
      [name]: val,
    });
  };

  render() {
    const { taskName, startDate, deadlineDate, description } = this.state;

    const { isOpen, handleButton, task } = this.props;

    return (
      <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        <div className='newUser'>
          <form className='newUser__form' onSubmit={this.handleSubmit}>
            <h1 className='newUser__form_title'>
              <i className='fa fa-edit'></i> Edit task
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
                  <span className='newUser__form_row-error'>Max: 20 symbols</span>
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
                <div className='newUser__form_wrapper-input'>
                  <textarea className='textarea-desc' value='' name='assignMembers' />
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
    );
  }
}
