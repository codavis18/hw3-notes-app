import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      id: this.props.note.id,
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }


  onDeleteClick(event) {
    console.log('DELETE');
    this.props.delete(this.props.note.id);
  }

  onEditClick(event) {
    if (this.state.isEditing === false) {
      console.log('EDITING');
      this.setState({ isEditing: true });
    } else {
      console.log(this.state.text);
      console.log(this.props.id);
      this.props.update(this.props.id, { text: this.state.text });
      // this.onUpdate({ text: this.state.text });
      this.setState({ isEditing: false });
    }
  }

  onUpdate(fields) {
    console.log(fields);
    this.props.update(this.props.id, fields);
  }

  onStartDrag() {
    // update z-index
  }

  onDrag(e, ui) {
    console.log(ui.x);
    console.log(ui.y);
    this.setState({ x: ui.x, y: ui.y });
  }

  onStopDrag() {
    this.onUpdate({ x: this.state.x, y: this.state.y });
  }

  renderNoteBody() {
    if (this.state.isEditing) {
      // the following from http://andreypopp.github.io/react-textarea-autosize/
      return (
        <div>
          <Textarea
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
        </div>
    );
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div id="note-title-bar">
            <span id="note-title-text">{this.props.note.title} &emsp; </span>
            <i className="fa fa-arrows icons note-mover" aria-hidden="true"></i>
            <i onClick={this.onEditClick} className="fa fa-pencil-square-o icons" aria-hidden="true"></i>
            <i onClick={this.onDeleteClick} className="fa fa-trash-o icons" aria-hidden="true"></i>
          </div>

          <div>
            {this.renderNoteBody()}
          </div>
        </div>
      </Draggable>


    );
  }

}

export default Note;
