import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'undefined',
      rulesAccept: false,
      receiveNews: "true",
      firstNameError: '',
      lastNameError: '',
      genderError: '',
      dateOfBirthError: '',
      rulesAcceptError: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  changeHandler(event) {
    // console.log(event.target.name, event.target.value);
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // console.log(event.target.name, event.target.checked)
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
    console.log(this.state);
  }

  validateForm() {
    const errors = {
      firstNameError: '',
      lastNameError: '',
      genderError: '',
      dateOfBirthError: '',
      rulesAcceptError: '',
    };
    const { firstName, lastName, dateOfBirth, gender, rulesAccept } = this.state;
    // first name field validation
    if (!firstName) {
      errors.firstNameError = 'Please fill this field';
      // console.log('error on field firstName detected');
    } else if (!/^[a-z ,.'-]+$/i.test(firstName)) {
      errors.firstNameError = 'This field can contain letters only';
    } else if (firstName.length < 2 || firstName.length > 12) {
      errors.firstNameError = 'First name must have length between 2 and 12 characters';
    }
    // last name field validation
    if (!lastName) {
      errors.lastNameError = 'Please fill this field';
      // console.log('error on field firstName detected');
    } else if (!/^[a-z ,.'-]+$/i.test(lastName)) {
      errors.lastNameError = 'This field can contain letters only';
    } else if (lastName.length < 2 || lastName.length > 12) {
      errors.lastNameError = 'First name must have length between 2 and 12 characters';
    }
    if (gender === 'undefined') {
      errors.genderError = 'Please select your gender';
    }
    if (rulesAccept !== true) {
      errors.rulesAcceptError = 'Please accept the rules';
    }
    const dateNow = new Date();
    const userDoB = Date.parse(dateOfBirth);
    const timeDifference = Date.parse(dateNow.toDateString()) - userDoB;
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    // console.log(differenceInDays / 365 < 18);
    if (timeDifference <= 0) {
      errors.dateOfBirthError = "People from future can't use our service";
    } else if (differenceInDays / 365 < 18) {
      errors.dateOfBirthError = 'You must be 18 or older to use this service';
    }
    // console.log(errors);
    this.setState(errors);
    return errors;
  }

  submitHandler(event) {
    // console.log(this.state);
    event.preventDefault();
    const errorsList = this.validateForm(this.state);
    // console.log(errorsList);
    let formIsValid = true;
    Object.keys(errorsList).forEach((error) => {
      if (errorsList[error].length > 0) {
        formIsValid = false;
      }
    });
    if (formIsValid) {
      console.log('form was submitted', this.state);
      this.clearForm();
    }
  }

  clearForm() {
    this.setState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'undefined',
      rulesAccept: false,
      receiveNews: false,
    });
  }

  render() {
    return (
      <div className="form">
        <h3 className="form-title">Please fill out the form</h3>
        <form onSubmit={this.submitHandler}>
          <label className="label" htmlFor="firstName">
            First Name:
            <input
              className="text-input"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.changeHandler}
            />
            <span className="error-field">
              {this.state.firstNameError.length !== 0 ? this.state.firstNameError : ''}
            </span>
          </label>
          <br />
          <label className="label" htmlFor="lastName">
            Last Name:
            <input
              className="text-input"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.changeHandler}
            />
            <span className="error-field">{this.state.lastNameError.length !== 0 ? this.state.lastNameError : ''}</span>
          </label>
          <br />
          <label className="label" htmlFor="gender">
            Choose your gender:
            <select className="select-input" name="gender" value={this.state.gender} onChange={this.changeHandler}>
              <option value="undefined" disabled>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span className="error-field">{this.state.genderError.length !== 0 ? this.state.genderError : ''}</span>
          </label>
          <br />
          <label className="label" htmlFor="dateOfBirth">
            Please enter date of your birth
            <input
              className="date-input"
              type="date"
              name="dateOfBirth"
              max="2099-01-01"
              onChange={this.changeHandler}
            />
            <span className="error-field">
              {this.state.dateOfBirthError.length !== 0 ? this.state.dateOfBirthError : ''}
            </span>
          </label>
          <br />
          <div className="switch-field">
            <span className="switch-field__title">I want to receive news from your company</span>
            <input
              className="switch-field__input"
              type="radio"
              id="receiveNewsTrue"
              name="receiveNews"
              value="true"
              checked={this.state.receiveNews === 'true'}
              onChange={this.changeHandler}
              />
            <label className="label" className="switch-field__label" htmlFor="receiveNewsTrue">Yes</label>
            <input
              className="switch-field__input"
              type="radio"
              id="receiveNewsFalse"
              name="receiveNews"
              value="false"
              checked={this.state.receiveNews === 'false'}
              onChange={this.changeHandler}
            />
            <label className="switch-field__label" htmlFor="receiveNewsFalse">No</label>
          </div>
          <label className="label" htmlFor="rulesAccept">
            I have read and accept all rules
            <input type="checkbox" name="rulesAccept" checked={this.state.rulesAccept} onChange={this.changeHandler}/>
            <span className="error-field">
              {this.state.rulesAcceptError.length !== 0 ? this.state.rulesAcceptError : ''}
            </span>
          </label>
          <br />
          <input className="submit-input" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
