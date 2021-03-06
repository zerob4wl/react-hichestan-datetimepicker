import React, { Component } from 'react';
import {} from './lib';
import {DateTimeInput, DateTimeInputSimple, DateInput, DateInputSimple} from './lib';

class Example extends Component {
  state = {
    value1: '',
    value1_formatted: '',
    value2: '',
    value2_formatted: '',
    value3: '',
    value3_formatted: '',
    value4: '2018-08-23T06:57:12+03:00',
    value4_formatted: '',
  };

  handleChange = (event) => {
    const newState = {};
    const t = event.target;
    console.log('target change on the example page : ', t);
    newState[t.name] = t.value;
    newState[t.name+'_formatted'] = t.formatted ? t.formatted : '';
    this.setState(newState, ()=>{
      console.log('after', this.state)
    });
  };

  render(){
    return (
      <React.Fragment>
        <div style={{width: 250}}>
          <label>ورودی تاریخ بدون پاپ‌آپ
            <br/>
            <DateInput
              value={this.state.value1}
              name={'value1'}
              onChange={this.handleChange}
              style={{textAlign: 'right'}}
              placeholder="فیلد تاریخ فقط تایپی" />
            <br/>
            خروجی
            <br/>
            <input type="text" dir={'ltr'} value={this.state.value1} readOnly/>
            <br/>
            <input type="text" dir={'ltr'} value={this.state.value1_formatted} readOnly/>
          </label>
          <br/>
          <br/>
          <label>ورودی تاریخ با پاپ‌آپ
            <br/>
            <DateInputSimple
              value={this.state.value2}
              name={'value2'}
              onChange={this.handleChange}
              placeholder="فیلد تاریخ فقط تایپی" />
            <br/>
            خروجی
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value2} readOnly/>
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value2_formatted} readOnly/>
          </label>
          <br/>
          <br/>
          <br/>
          <label>
            ورود زمان
            <br/>
            <DateTimeInput
              value={this.state.value3}
              name={'value3'}
              onChange={this.handleChange}/>
            <br/>
            خروجی
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value3} readOnly/>
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value3_formatted} readOnly/>
          </label>
          <br/>
          <br/>
          <label>
            ورود زمان با پاپ‌آپ
            <br/>
            <DateTimeInputSimple
              value={this.state.value4}
              name={'value4'}
              onChange={this.handleChange}/>
            <br/>
            خروجی
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value4} readOnly/>
            <br/>
            <input type="text" dir={'ltr'}  value={this.state.value4_formatted} readOnly/>
          </label>
          <br/>
          <br/>
          <br/>
          <p style={{height: 1000}}>
          خروجی زمان استاندارد را در دیتابیس استفاده کنید
          </p>
          <br/>
        </div>
      </React.Fragment>
    );
  }
}

export default Example;
