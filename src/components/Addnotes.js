import React, { useContext } from 'react'
import { useState } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnotes = (props) => {
	const context = useContext(noteContext);
	const { addNote } = context;
	const [note, setNote] = useState({ title: "", description: "" })
	const handleOnchange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}
	const handleAdd = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.completed = false);
		props.alertFunc('Note added successfully', 'success')
		setNote({ title: "", description: "" })
	}
	return (
		<form className='total-inp'>
			<div className="input-title">
				<input type="text" value={note.title} className="" id="title" placeholder='Enter task title' name='title' onChange={handleOnchange} />
			</div>
			<div className="input-desc">
				<input type="text" value={note.description} className="" name='description' placeholder='Enter task description' id="description" onChange={handleOnchange} />
			</div>
			<div className="input-add">
			</div>
			<button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="my-btn" onClick={handleAdd}>Add</button>
		</form>
	)
}

export default Addnotes
