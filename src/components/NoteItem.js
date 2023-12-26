import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
	const context = useContext(noteContext);
	const { deleteNote, markComplete } = context;
	const { note, updateNote } = props;
	return (

		<div className="todo-list-item" >
			<div className="small-head">
				<h3>{note.title}</h3>
				<div className="icons">
					<span className="material-symbols-outlined right" onClick={() => {
						markComplete(note._id);
					}}>
						check_circle
					</span>
					<span className="material-symbols-outlined update" onClick={() => { updateNote(note) }}>
						edit
					</span>
					<span className="material-symbols-outlined del" onClick={() => { deleteNote(note._id) }}>
						delete
					</span>
				</div>
			</div>
			<p>{note.description}</p>
		</div>
	)
}

export default NoteItem
