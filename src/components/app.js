import React, { Component } from 'react';

import Note from './note';
import NoteBar from './notebar';

const Immutable = require('immutable');


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({
      }),
    };

    this.setState = this.setState.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  add(title) {
    const newNote = {
      id: this.state.notes.size + 1,
      title,
      text: 'new note',
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 400),
      zIndex: this.state.notes.size + 1,
    };

    this.setState({
      notes: this.state.notes.set(newNote.id, newNote),
    });

    console.log(newNote);
  }

  delete(id) {
    console.log(id);
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  update(id, fields) {
    console.log(id, fields);
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  renderNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return <Note id={id} key={id} note={note} delete={this.delete} update={this.update} />;
    });
  }

  render() {
    return (
      <div className="main">
        <div id="notebar">
          <NoteBar onCreate={title => this.add(title)} />
        </div>

        <div className="notes_container">
          {this.renderNotes()}
        </div>
      </div>

    );
  }
}

export default App;
