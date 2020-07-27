import React, { Component } from 'react';
import './Users.sass';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import ModalUser from './ModalUser';
import ModalUserEdit from './ModalUserEdit';
import parseDate from '../../../utils/parseDate';

export default class User extends Component {
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

  showModalEdit = (e) => {
    e.preventDefault();
    const { isOpenEdit } = this.state;

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
    const { dataUser, hash, handleDelete, handleEdit, role } = this.props;
    const { isOpen, isOpenEdit } = this.state;
    const { firstName, lastName, direction, education, startDate, birthday, id } = dataUser;
    const AgeInYears = parseDate(birthday);

    return (
      <>
        <div className='users__wrapper'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button type='button' onClick={this.showModal} className='userInfo'>
              {`${firstName} ${lastName}`}
            </button>
          </div>
          <div className='users__wrapper_item'>{direction}</div>
          <div className='users__wrapper_item'>{education}</div>
          <div className='users__wrapper_item'>{startDate}</div>
          <div className='users__wrapper_item'>{AgeInYears}</div>
          <div className='users__wrapper_item'>
            <div className='users__wrapper_column'>
              <div className='users__wrapper_row' style={role === 'mentor' ? { marginBottom: '0' } : null}>
                <Link to={`/users/${id}/tasks`}>
                  <Button action='showTasks'>Tasks</Button>
                </Link>

                <Link to={`/users/${id}/progress`}>
                  <Button action='showProgress'>Progress</Button>
                </Link>
              </div>
              {role === 'admin' ? (
                <div className='users__wrapper_row'>
                  <Button action='edit' handleButton={this.showModalEdit}>
                    Edit
                  </Button>
                  <Button action='delete' handleButton={() => handleDelete(dataUser.id)}>
                    Delete
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ModalUserEdit
          dataUser={dataUser}
          isOpen={isOpenEdit}
          handleButton={this.showModalEdit}
          handleEdit={handleEdit}
        />
        <ModalUser dataUser={dataUser} isOpen={isOpen} handleButton={this.showModal} />
      </>
    );
  }
}
