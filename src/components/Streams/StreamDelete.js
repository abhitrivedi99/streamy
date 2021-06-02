import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchStream, deleteStream } from '../../actions'

import Modal from '../Modal'
import history from '../../history'

const StreamDelete = ({ match }) => {
	const dispatch = useDispatch()
	const { id } = match.params

	const { streams } = useSelector((state) => state)
	let stream = streams[id]

	useEffect(() => {
		dispatch(fetchStream(id))
	}, [dispatch, id])

	const actions = (
		<React.Fragment>
			<button
				onClick={() => dispatch(deleteStream(id))}
				className="ui button negative"
			>
				Delete
			</button>
			<Link to="/" className="ui button">
				Cancel
			</Link>
		</React.Fragment>
	)

	const renderList = () => {
		if (!stream) {
			return 'Are you sure you want to delete this stream?'
		} else {
			return `Are you sure you want to delete this stream with title: ${stream.title}?`
		}
	}

	return (
		<React.Fragment>
			<Modal
				title="Delete Stream"
				content={renderList()}
				actions={actions}
				onDismiss={() => history.push('/')}
			/>
		</React.Fragment>
	)
}

export default StreamDelete
