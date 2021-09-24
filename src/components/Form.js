import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Icons
import { MdClose as CloseIcon } from "react-icons/md";
// Components
import Button from './Button';

class Form extends Component {
  constructor(props) {
    super(props);

    // Refs to access form and control input/textarea DOM nodes
    this.formRef = React.createRef();
    this.controlRef = React.createRef();

    // TODO: Define your state properties here
    this.state = {
      value: this.props.value || '',
      isSubmit: false
    }
  }

  componentDidMount() {
    this.controlRef.current.focus();
  }

  handleOnChangeText = (event) => {
    const isSubmit = event.target.value !== '';

    this.setState({ 
      value: event.target.value,
      isSubmit: isSubmit
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if(!this.state.isSubmit) return;

    this.props.onClickSubmit(this.state.value);
    this.setState({ value: '' , isSubmit: false });
    this.props.onClickCancel && this.props.onClickCancel();
  }

  handleOnKeyDown = (event) => {
    if(event.keyCode === 13) this.handleOnSubmit(event);
  }

  renderFormControl = () => {
    if(this.props.type === "card" || this.props.type === "editor") {
      return (
        <textarea 
        className="form-textarea" 
        ref={this.controlRef}
        placeholder={this.props.placeholder} 
        value={this.state.value}
        onChange={this.handleOnChangeText}
        >
        </textarea>
      )
    }
    else if(this.props.type === "list" || this.props.type === "labels") {
      return (
        <input 
        className="form-input" 
        ref={this.controlRef}
        placeholder={this.props.placeholder} 
        value={this.state.value}
        onChange={this.handleOnChangeText}
        />
      )
    } 
  }

  // render the Form UI.
  render() {
    return (
      <form
        ref={this.formRef}
        className={`form form-${this.props.type}`}
        onSubmit={this.handleOnSubmit}
        onKeyDown={this.handleOnKeyDown}
      >
        {this.renderFormControl()}
        <div className="form-actions">
          <Button
          variant={this.props.variant}
          text={this.props.buttonText}
          onButtonClick={this.handleOnSubmit}
          />
          {this.props.onClickCancel &&
          <CloseIcon 
          className="form-cancel-action"
          onClick={this.props.onClickCancel}
          />
          }
        </div>
      </form>
    );
  }
};

Form.defaultProps = {
  initialValue: '',
  placeholder: '',
  buttonText: '',
  onClickSubmit: () => null,
  onClickCancel: () => null
};

Form.propTypes = {
  type: PropTypes.oneOf(['list', 'card', 'editor', 'labels']).isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onClickSubmit: PropTypes.func,
  onClickCancel: PropTypes.func
};

export default Form;
