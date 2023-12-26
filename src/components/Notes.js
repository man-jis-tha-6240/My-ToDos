import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'
import Addnotes from './Addnotes';
import CompletedNotes from './CompletedNotes';
import NoteItem from './NoteItem'
const Notes = (props) => {
	let navigate = useNavigate();
	const context = useContext(noteContext);
	const { notes, getNotes, getCompletedNotes, editNote, completeNotes } = context;
	const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })
	const ref = useRef(null)
	const closeref = useRef(null);
	const handleOnchange = (e) => {
		setNotes({ ...note, [e.target.name]: e.target.value })
	}
	const handleClk = () => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		closeref.current.click();
		props.alertFunc('Updated successfully', 'success')
	}
	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			getNotes();
			getCompletedNotes();
		}
		else {
			navigate('/login')

		}
		// eslint-disable-next-line
	}, [])

	const updateNote = (currentnote) => {
		ref.current.click();
		setNotes({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.etag });
	}
	console.log({ completeNotes }, { notes });
	return (
		<div className='todo-whole'>
			<Addnotes alertFunc={props.alertFunc} />
			<button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
				Launch demo modal
			</button>
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog " role="document">
					<div className="modal-content my-edit-modal">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit note</h5>

						</div>
						<div className="modal-body">
							<form>
								<div className="input-title">
									<input type="text" value={note.etitle} minLength={5} className="" id="etitle" name='etitle' placeholder='Enter task title' onChange={handleOnchange} required />
								</div>


								<div className="input-title">
									<input type="text" value={note.edescription} className="" name='edescription' minLength={5} id="edescription" placeholder='Enter task description' onChange={handleOnchange} required />
								</div>

								<div className="row mb-3">
								</div>

							</form>
						</div>
						<div className="modal-footer">
							<button ref={closeref} type="button" className="my-btn" data-bs-dismiss="modal">Close</button>
							<button type="button" className="my-btn" onClick={handleClk}>Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flexidiv">
				<div className="to-do">
					<h3 className="head">To Do</h3>
					<div className="another-div">
						{notes && notes.map((note) => {
							return completeNotes.find(el => el._id === note._id) ? <div></div> : <NoteItem key={note._id} alertFunc={props.alertFunc} updateNote={updateNote} note={note} />
						})}
					</div>
				</div>
				<div className="complete">
					<h3 className="head">Completed</h3>
					<div className="another-div">
						{
							completeNotes && completeNotes.map((completeNote) => {
								return notes.find(el => el._id === completeNote._id) ? <CompletedNotes key={completeNote._id} completeNote={completeNote} /> : <div></div>
							})}
					</div>
				</div>
			</div>
		</div>

	)
}

export default Notes
