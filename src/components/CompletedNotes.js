import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import noteContext from '../context/notes/noteContext'
const CompletedNotes = (props) => {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { completeNote } = props;
	return (
		<div>
			<div className="todo-list-item" >
				<div className="small-head">
					<h3>{completeNote.title}</h3>
					<span className="material-symbols-outlined del" onClick={() => { deleteNote(completeNote._id) }}>
						delete
					</span>
				</div>
				<p>{completeNote.description}</p>
				<small className='cmpltd'>Completed on: {moment(completeNote.date).format('MMMM DD, YYYY h:mm:ss A')}</small>
			</div>
		</div>
	)
}
export default CompletedNotes