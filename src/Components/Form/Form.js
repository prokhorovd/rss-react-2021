import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      rulesAccept: false,
      receiveNews: true,
      uniqueID: this.generateID(),
      firstNameError: '',
      lastNameError: '',
      genderError: '',
      dateOfBirthError: '',
      rulesAcceptError: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.name, event.target.value);
    const {
      name,
      value,
      type,
      checked,
    } = event.target;
    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else if (type === 'radio') {
      this.setState({ [name]: !this.state[name] });
    } else {
      this.setState({ [name]: value });
    }
  }

  validateForm() {
    const errors = {
      firstNameError: '',
      lastNameError: '',
      genderError: '',
      dateOfBirthError: '',
      rulesAcceptError: '',
    };
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      rulesAccept,
    } = this.state;
    // first name field validation
    if (!firstName) {
      errors.firstNameError = 'Please fill this field';
    } else if (!/^[a-z ,.'-]+$/i.test(firstName)) {
      errors.firstNameError = 'This field can contain letters only';
    } else if (firstName.length < 2 || firstName.length > 12) {
      errors.firstNameError = 'First name must have length between 2 and 12 characters';
    }
    // last name field validation
    if (!lastName) {
      errors.lastNameError = 'Please fill this field';
    } else if (!/^[a-z ,.'-]+$/i.test(lastName)) {
      errors.lastNameError = 'This field can contain letters only';
    } else if (lastName.length < 2 || lastName.length > 12) {
      errors.lastNameError = 'First name must have length between 2 and 12 characters';
    }
    // gender validation
    if (gender === '') {
      errors.genderError = 'Please select your gender';
    }
    // rules acceptance validation
    if (rulesAccept !== true) {
      errors.rulesAcceptError = 'Please accept the rules';
    }
    // date validation
    const dateNow = new Date();
    const userDoB = Date.parse(dateOfBirth);
    const timeDifference = Date.parse(dateNow.toDateString()) - userDoB;
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    if (this.state.dateOfBirth.length === 0) {
      errors.dateOfBirthError = 'Please choose your birthdate';
    } else if (timeDifference <= 0) {
      errors.dateOfBirthError = "People from future can't use our service";
    } else if (differenceInDays / 365 < 18) {
      errors.dateOfBirthError = 'You must be 18 or older to use this service';
    }
    // sent errors to state
    this.setState(errors);
    return errors;
  }

  generateID() {
    const idNum = Math.floor(Math.random() * 1000000 + 1);
    // console.log('generated id: ', idNum);
    return idNum;
  }

  handleSubmit(event) {
    event.preventDefault();
    const errorsList = this.validateForm(this.state);
    let formIsValid = true;
    Object.keys(errorsList).forEach((error) => {
      if (errorsList[error].length > 0) {
        formIsValid = false;
      }
    });
    if (formIsValid) {
      this.props.formSubmit(event, this.state);
      this.clearForm();
    }
    // lines below temporary disable validation
    // this.props.formSubmit(event, this.state);
    // this.clearForm();
  }

  clearForm() {
    this.setState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      rulesAccept: false,
      receiveNews: true,
      uniqueID: this.generateID(),
    });
  }

  render() {
    return (
      <div className="form">
        <h3 className="form-title">Please fill out the form</h3>
        <form onSubmit={this.handleSubmit}>
          <label className="label" htmlFor="firstName">
            First Name:
            <input
              className="text-input"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            <span className="error-field">{this.state.lastNameError.length !== 0 ? this.state.lastNameError : ''}</span>
          </label>
          <br />
          <label className="label" htmlFor="gender">
            Choose your gender:
            <select className="select-input" name="gender" value={this.state.gender} onChange={this.handleChange}>
              <option value='' disabled>Gender</option>
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
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
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
              // value={true}
              checked={this.state.receiveNews}
              onChange={this.handleChange}
              />
            <label className="label" className="switch-field__label" htmlFor="receiveNewsTrue">Yes</label>
            <input
              className="switch-field__input"
              type="radio"
              id="receiveNewsFalse"
              name="receiveNews"
              // value=""
              checked={!this.state.receiveNews}
              onChange={this.handleChange}
            />
            <label className="switch-field__label" htmlFor="receiveNewsFalse">No</label>
          </div>
          <label className="label" htmlFor="rulesAccept">
            I have read and accept all rules
            <input type="checkbox" name="rulesAccept" checked={this.state.rulesAccept} onChange={this.handleChange}/>
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
