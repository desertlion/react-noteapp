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
window.Notes = Notes;

var Note   = React.createClass({
	render: function(){
        console.info('testing');
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
var NotesForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var text = React.findDOMNode(this.refs.noteinput).value;
        if (!text) return;
        // TODO: send request to the server
        React.findDOMNode(this.refs.noteinput).value = '';
        Notes.createNote(text, onChangeCb);
        return;
    },
    render: function(){
        return (
            <form ref="noteform" onSubmit={this.handleSubmit} className="note-form">
                <textarea ref="noteinput"></textarea>
                <input type="submit" value="Add Note" />
            </form>
        );
    }
});
var NoteList = React.createClass({
	  render: function(){
		    var notes     = _.map(Notes.notes, function(note){
                var title = note.content.substring(0,note.content.indexOf('\n'));
                title     = title || note.content;
                // return <NoteTitle title={title} />
                return <Note key={note.id} title={title}>{note.content}</Note>
		    });
		    return (
                <div id="container" className="markdown-body">
                    <h2>Note Taking App</h2>
                    <div className="note-lists">
                        {notes}
                    </div>
                    <NotesForm />
                </div>
		    );
	  }
});
window.onChangeCb = function(){
    React.render(<NoteList />, document.body);
}

onChangeCb();
