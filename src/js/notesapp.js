'use strict';

var _    = require('lodash');
var Note = require('./note.js');

var notes = [
	{id:1,content:'This is a note\n And it is `awesome`'},
	{id:2,content:'React is awesome\n Go **use it!!!**'},
	{id:3,content:'Domain Driven Design\n DDD is the way to go \n > This is a blockquote \n \n ``` console.info(\'askldfjalsdfjkaslkdfj\', notes);```'}
];

var NotesApp = function(notes){
	this.notes = notes || [];
};

NotesApp.prototype.loadNotes = function(){
	var _this = this;
	// push the notes data
	_.each(notes, function(note){
		_this.notes.push(new Note(note.id, note.content));
	});
};

NotesApp.prototype.getIndex    = function(id){
	// get the index of selected id
	var index = _.findIndex(notes, function(note){
		return note.id = id;
	});
	return index;
};

NotesApp.prototype.deleteNote = function(id){
	// get the Index of the selected id
	var index = this.getIndex(id);
	// splice the data
	this.notes.splice(index,-1);
};

NotesApp.prototype.createNote = function(content){
	// get the latest maximum id, and add 1
	var id = parseInt(this.notes.length)+1;
	this.notes.push(new Note(id, content));
};

NotesApp.prototype.updateNote = function(id, content){
	// get the index of the selected id
	var index = this.getIndex(id);
	this.notes[index].content = content;
};

module.exports = NotesApp;
