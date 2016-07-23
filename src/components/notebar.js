import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


class NoteBar extends Component {
  constructor(props) {
    super(props);

    this.state = { titleinput: '', bodyinput: '' };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onTitleChange(event) {
    console.log(event.target.value);
    this.setState({ titleinput: event.target.value });
  }

  onBodyChange(event) {
    console.log(event.target.value);
    this.setState({ bodyinput: event.target.value });
  }

  onCreateClick(event) {
    this.props.onCreate(this.state.titleinput, this.state.bodyinput);
  }

  render() {
    return (
      <div id="notebar">
        <Form inline>
          <FormGroup>
            <div className="pageTitle">PostIt!</div>
          </FormGroup>
          <FormGroup controlId="formInlineTitle">
            <ControlLabel>Title</ControlLabel>
            {' '}
            <FormControl onChange={this.onTitleChange} value={this.state.titleinput} placeholder="Note title" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineBody">
            <ControlLabel>Text</ControlLabel>
            {' '}
            <FormControl onChange={this.onBodyChange} value={this.state.bodyinput} placeholder="Note body" />
          </FormGroup>
          {' '}
          <Button bsStyle="primary" onClick={this.onCreateClick}>Create Note</Button>
        </Form>
      </div>
    );
  }
}

export default NoteBar;
