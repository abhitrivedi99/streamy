import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import flv from 'flv.js'

import { fetchStream } from '../../actions'

const StreamShow = ({ match }) => {
	const dispatch = useDispatch()
	const { streams } = useSelector((state) => state)

	const { id } = match.params

	let stream = streams[id]

	const videoRef = useRef()

	useEffect(() => {
		dispatch(fetchStream(id))
	}, [dispatch, id])

	useEffect(() => {
		const flvPlayer = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`,
		})

		if (stream) {
			flvPlayer.attachMediaElement(videoRef.current)
			flvPlayer.load()
		}

		return () => (stream ? flvPlayer.destroy() : null)
	}, [dispatch, id, stream])

	const renderList = () => {
		if (!stream) {
			return <div>Loading..</div>
		} else {
			return (
				<div>
					<video ref={videoRef} style={{ width: '100%' }} controls={true} />
					<h1>{stream.title}</h1>
					<h3 className="content">{stream.description}</h3>
				</div>
			)
		}
	}

	return <div>{renderList()}</div>
}

export default StreamShow
