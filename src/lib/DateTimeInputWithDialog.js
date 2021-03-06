import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimeInput from './DateTimeInput';
import {CalendarIcon, DeleteIcon} from './Picker/Icons';
import DatePicker from './DatePicker';
import moment from 'moment-jalaali';
import './DateInputWithDialog.css';

const DATE_SEPERATOR =  '/';// this is arabic date seperator ' ؍' but it is right to left glyph and as the numbers are left to right there will be caret position problem
const MIDDLE_SEPERATOR =  '\xa0';
const TIME_SEPERATOR =  ':';
const DATE_FORMAT = `jYYYY${DATE_SEPERATOR}jMM${DATE_SEPERATOR}jDD${MIDDLE_SEPERATOR}HH${TIME_SEPERATOR}mm`;

class DateInputWithDialog extends Component {

  static propTypes = {
    /**
     * The name that will be set while firing the onChange event in the target object
     */
    name: PropTypes.string,
    /**
     * Callback function that is fired when the date value changes.
     * @param {string} date and time, The new date and time in iso 8601 format like 2018-08-23T21:06:50Z
     * it is always UTC
     */
    onChange: PropTypes.func,
    /**
     * If true, automatically accept and close the picker on select a date.
     */
    autoOk: PropTypes.bool,
    /**
     * Override the default text of the 'OK' button.
     */
    closeLabel: PropTypes.node,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of DatePickerDialog's Container element.
     */
    dialogContainerStyle: PropTypes.object,
    /**
     * Override the inline-styles of DatePickerDialog's Container element.
     */
    dialogContainerClassName: PropTypes.object,
    /**
     * Disables the DateTimeInput.
     */
    disabled: PropTypes.bool,
    /**
     * makes the DateTimeInput readonly.
     */
    readOnly: PropTypes.bool,
    /**
     * Callback function that is fired when a click event occurs on the Date Picker's `TextField`.
     * @param {object} event Click event targeting the `main div element`.
     */
    onClick: PropTypes.func,
    /**
     * Callback function that is fired when the Date-Time input's dialog is dismissed.
     */
    onDismiss: PropTypes.func,
    /**
     * Callback function that is fired when the Date-Time input's `main div` gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function that is fired when the Date-Time input's dialog is shown.
     */
    onShow: PropTypes.func,
    /**
     * a function to filter some dates, return true means that it accept the date and false is to reject it. It gives a date 'jYYYY/jMM/jDD' format as the first parameter.
     */
    filterDate: PropTypes.func,
    /**
     * Sets the value for the Date-Time input.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(moment)
    ]),
  };

  state = {
    openDialog: false,
  };

  constructor(props){
    super(props);
    this.handleEmpty = this.handleEmpty.bind(this);
  }

  handleCalendar = (e) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }

    this.setState({
      openDialog: !this.state.openDialog
    }, ()=>{
      if(this.state.openDialog && this.props.onShow){
        this.props.onShow();
      }
    });
  };

  handleDateChange = (value) => {
    const newState = {};

    if(!value){
      newState.formatted = '';
      newState.moment = null;
      newState.iso = '';
    }else{
      newState.formatted = value;
      newState.moment = moment(value, DATE_FORMAT);
      newState.iso = newState.moment.format();
    }

    this.setState(newState, ()=>{
      this.fireOnChange();
    });
  };

  handleEmpty(){
    this.handleDateChange('');
  }

  fireOnChange = () => {
    if(this.props.onChange){
      const e = {
        target: {
          name: this.props.name,
          value: this.state.iso,
          formatted: this.state.formatted,
          moment: this.state.moment,
        }
      };
      this.props.onChange(e);
    }
  };

  render(){
    const {
      disabled,
      readOnly,
      className,
      value,
      dialogContainerStyle,
      dialogContainerClassName,
      closeLabel,
      autoOk,
      onDismiss,
      style,
      filterDate,
      ...rest
    } = this.props;

    return (
      <div className='date-input-with-dialog-main'>
        <DateTimeInput
          className={`date-input-with-dialog-input ${this.props.className ? this.props.className : ''}`} 
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onShowDialog={this.handleCalendar}
          {...rest}
        />
        <div className={'date-input-with-dialog-input-buttons date-input-with-dialog-calendar'} onClick={this.handleCalendar}><CalendarIcon/></div>
        <div className={'date-input-with-dialog-input-buttons date-input-with-dialog-empty'} onClick={this.handleEmpty}><DeleteIcon/></div>
        {this.state.openDialog && (
          <React.Fragment>
            <div className={'OutSideClick'} onClick={this.handleCalendar}> </div>
            <DatePicker
              onChange={e => {
                this.handleDateChange(e.target.value);
                if(autoOk){
                  this.handleCalendar();
                }
              }}
              cancelHandler={this.handleCalendar}
              selectedDay={value}
              style={dialogContainerStyle}
              className={dialogContainerClassName}
              closeLabel={closeLabel}
              onDismiss={onDismiss}
              filterDate={filterDate}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default DateInputWithDialog;