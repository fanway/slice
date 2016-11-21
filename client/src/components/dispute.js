import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Select, {Creatable} from 'react-select';
import axios from 'axios';

const getOptions = (value) => {
    if (value !== "") {
      return (axios.get('/dispute/options/' + value)
      .then((response) => {
        let options = response.data.map((user) => {
          let option = Object.assign({}, {value: user.username, label: user.username})
            return option;
        });
        return options;
      })
      .then((options) => {
        let result = Object.assign({}, {options: options});
        return result;
      }))
    } else {
      return Promise.resolve({ options: [] });
    };
};
const renderField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderSelect = (props) => (<div>
  <Select
    {...props}
    value={props.input.value || ''}
    onChange={(event) => {
      if (props.input.onChange(event)) {
        props.input.onChange(event.value); // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      }
      else props.input.onChange();
    }}
    options={props.options}
    label={props.label}
    autosize={true}
  />
</div>);

const renderAsyncCreatableSelect = (props) => (<div>
  <Creatable
    {...props}
    value={props.input.value || ''}
    onChange={(event) => {
      if (props.input.onChange(event)) {
        props.input.onChange(event.value); // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      }
      else props.input.onChange();
    }}
    options={props.options}
    label={props.label}
    autosize={true}
  />
</div>);

const renderAsyncSelect = (props) => (<div>
  <Select.Async
    {...props}
    value={props.input.value || ''}
    onChange={(event) => {
      if (props.input.onChange(event)) {
        props.input.onChange(event.value); // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      }
      else props.input.onChange();
    }}
    loadOptions={getOptions}
    label={props.label}
    autosize={true}
    multi={true}
  />
</div>);

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

class Dispute extends Component {
  render() {
    const { handleSubmit } = this.props;
    return <div className="container">
      <div className="row">
        <div className="col-md-3 col-md-offset-3 v-centred">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="name">
                <Field name="name" component={renderField} type="text" label="Name" className="form-control"/>
              </div> <br />
              <div className="discription">
                <Field name="discription" component={renderField} type="text" label="Discription" className="form-control"/>
              </div> <br />
              <div className="sides">
                <label htmlFor="sides">Sides</label>
                <Field name="sides" component={renderAsyncCreatableSelect} type="text" label="Sides" options={options}/>
              </div> <br />
              <div className="timer">
                <Field name="timer" type="datetime-local" label="Deadline" component={renderField} className="form-control" />
              </div> <br />
              <div className="referee">
                <label htmlFor="referee">Referee</label>
                <Field name="referee" component={renderAsyncSelect} type="text" label="Referee"/>
              </div> <br />
              <button type="submit" className="btn btn-lg">Submit</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  }
};

Dispute = reduxForm({
  form: 'Dispute'
})(Dispute);

export default Dispute;
