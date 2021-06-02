import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions'

const StreamList = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchStreams())
	}, [dispatch])

	let { streams, auth } = useSelector((state) => state)
	streams = Object.values(streams)
	const { userId, isSignedIn } = auth

	const renderAdmin = (stream) => {
		if (stream.userId === userId) {
			return (
				<div className="right floated content">
					<Link
						to={`streams/delete/${stream.id}`}
						className="ui button negative"
					>
						Delete
					</Link>
					<Link to={`streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
				</div>
			)
		}
	}

	const renderList = () => {
		return streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					<div>{renderAdmin(stream)}</div>
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream.id}`}>
							<div className="header">{stream.title}</div>
							<div className="description">{stream.description}</div>
						</Link>
					</div>
				</div>
			)
		})
	}

	const renderCreate = () => {
		if (isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
					{/* <button className="ui button primary">Create Stream</button> */}
				</div>
			)
		}
	}

	return (
		<div>
			<h2>Streams</h2>
			<div className="ui celled list">{renderList()}</div>
			<div className="right floated content ">{renderCreate()}</div>
		</div>
	)
}

export default StreamList
