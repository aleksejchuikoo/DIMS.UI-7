import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import { v4 as uuidv4 } from 'uuid';
import Date from '../../UI/Date';
import Button from '../../UI/Button';
import CheckboxButton from '../../UI/CheckboxButton';
import fire from '../../../config/Fire';
import ModalError from '../ModalError/ModalError';

export default class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      startDate: '',
      deadlineDate: '',
      description: '',
      idMembers: [],
      id: uuidv4(),
      error: '',
      checkboxes: Array(this.props.data.length).fill(false),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const tasks = this.state;
    const { data } = this.props;

    let userTask = { ...tasks, idMembers: true, checkboxes: true };
    userTask = Object.values(userTask).every((val) => !!val);

    if (userTask) {
      const db = fire.firestore();
      db.collection('Tasks')
        .doc(tasks.id)
        .set({
          ...tasks,
        })
        .catch((err) => {
          console.log('Error ', err.message);
        });

      this.setState({
        taskName: '',
        startDate: '',
        deadlineDate: '',
        description: '',
        status: '',
        idMembers: [],
        id: uuidv4(),
        error: '',
        checkboxes: Array(this.props.data.length - 1).fill(false),
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskName' && value.length > 100) {
      this.setState({
        [name]: value,
        error: false,
      });
    } else {
      this.setState({
        [name]: value,
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
      idMembers: [...idMembers, id],
    });

    handleCheckbox(id, number, user);
  };

  isError = () => {
    const { error } = this.state;
    this.setState({
      error: !error,
    });
  };

  render() {
    const { taskName, startDate, deadlineDate, description, checkboxes, error } = this.state;
    const { data, isDark } = this.props;
    return (
      <>
        <div className='newUser'>
          <div className='newUser__form_icon'>
            <i className='fa fa-tasks' />
          </div>
          <form className='newUser__form' onSubmit={this.handleSubmit}>
            <h1 className='newUser__form_title'>Add new task</h1>
            <div className='newUser__form_wrapper'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_row'>
                  <input
                    type='text'
                    name='taskName'
                    placeholder='Task name'
                    value={taskName}
                    onChange={this.handleInputChange}
                  />
                  <span
                    className='newUser__form_row-error'
                    style={taskName.length > 100 ? { visibility: 'visible' } : { visibility: 'hidden' }}
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
                  <Date placeholder='DD/MM/YYYY' name='startDate' value={startDate} changeDate={this.handleComponent} />
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
                    value={deadlineDate}
                    changeDate={this.handleComponent}
                  />
                </div>
              </div>
            </div>
            <div className='newUser__form_wrapper'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-input'>
                  <textarea
                    className='textarea-desc'
                    name='description'
                    placeholder='Description'
                    value={description}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className='newUser__form_wrapper'>
              <div className='assign__block'>
                <div className='newUser__form_wrapper-label'>
                  <label className='assign-members'>Assign members:</label>
                </div>
                <div className='newUser__form_wrapper-input newUser__form_wrapper-assignMembers'>
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
              <div className='newTask-btn'>
                <Button action='create' type='submit'>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </div>
        <ModalError error={error} handleButton={this.isError} isDark={isDark} />
      </>
    );
  }
}
