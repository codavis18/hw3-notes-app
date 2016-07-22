import React, { Component } from 'react';

class NoteBar extends Component {
  constructor(props) {
    super(props);

    this.state = { inputterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ inputterm: event.target.value });
  }

  onCreateClick(event) {
    this.props.onCreate(this.state.inputterm);
  }

  render() {
    return (
      <div id="notebar">
        <input onChange={this.onInputChange} value={this.state.inputterm} />
        <button onClick={this.onCreateClick}>Create Note</button>
      </div>
    );
  }
}

export default NoteBar;
