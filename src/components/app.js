import React, { Component } from 'react';

import Note from './note';
import NoteBar from './notebar';
import * as firebasedb from '../firebasedb';


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
    this.add = this.add.bind(this);
    this.fetchState = this.fetchState.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes(this.fetchState);
  }

  add(title, text) {
    const newNote = {
      title,
      text,
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 400),
      zIndex: this.state.notes.size + 1,
    };

    firebasedb.add(newNote);
    console.log(newNote);
  }

  delete(id) {
    console.log(id);
    firebasedb.destroy(id);
  }

  update(id, fields) {
    console.log(id, fields);
    firebasedb.update(id, fields);
  }

  fetchState(notes) {
    this.setState({
      notes: Immutable.Map(notes),
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
        <div id="notebar-container">
          <NoteBar onCreate={this.add} />
        </div>
        <div className="notes_container">
          {this.renderNotes()}
        </div>
      </div>

    );
  }
}

export default App;
