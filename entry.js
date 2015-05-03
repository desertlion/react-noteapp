'use strict';

var React    = require("react");
var _        = require("lodash");
var NotesApp = require('./src/js/notesapp.js');
var marked   = require('marked');

//console.info('Isi Notes App',NotesApp);
//window.NotesApp = new NotesApp();

// instantiate a new NotesApp
// load the initial notes
var Notes = new NotesApp();
Notes.loadNotes();

var Note   = React.createClass({
	render: function(){
		return (
			<div className="note">
				<h3>{this.props.title}</h3>
            <span dangerouslySetInnerHTML={{ __html:marked(this.props.children.toString())}} />
			</div>
		);
	}
});
var NoteTitle = React.createClass({
    render: function(){
        return (
            <h3 className="note-title">{this.props.title}</h3>
        );
    }
});
var NoteForm = React.createClass({
    render: function(){
    }
});
var NoteList = React.createClass({
	  render: function(){
		    var notes     = _.map(Notes.notes, function(note){
            var title = note.content.substring(0,note.content.indexOf('\n'));
            title     = title || content;
            // return <NoteTitle title={title} />
            return <Note title={title}>{note.content}</Note>
		    });
		    return (
            <div className="note-lists">
                <h2>Note Taking App</h2>
                <hr />
                {notes}
            </div>
		    );
	  }
});

React.render(<NoteList />, document.getElementById('container'));
