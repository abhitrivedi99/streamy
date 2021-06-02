import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchStream } from '../../actions'

const StreamShow = ({ match }) => {
	const dispatch = useDispatch()
	const { streams } = useSelector((state) => state)

	const { id } = match.params

	let stream = streams[id]

	useEffect(() => {
		dispatch(fetchStream(id))
	}, [dispatch, id])

	const renderList = () => {
		if (!stream) {
			return <div>Loading..</div>
		} else {
			return (
				<div>
					<h1>{stream.title}</h1>
					<h3 className="content">{stream.description}</h3>
				</div>
			)
		}
	}

	return (
		<div>
			Stream Show
			{renderList()}
		</div>
	)
}

export default StreamShow
