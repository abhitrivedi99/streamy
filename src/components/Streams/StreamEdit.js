import _ from 'lodash'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

const StreamEdit = ({ match }) => {
	const dispatch = useDispatch()
	let { streams } = useSelector((state) => state)

	useEffect(() => {
		dispatch(fetchStream(match.params.id))
	}, [dispatch, match])

	let stream = streams[match.params.id]

	const onSubmit = (formValues) => {
		dispatch(editStream(match.params.id, formValues))
	}

	const renderList = () => {
		if (!stream) {
			return <div>Loading..</div>
		} else {
			return (
				<div>
					<StreamForm
						initialvalues={_.pick(stream, 'title', 'description')}
						onSubmit={onSubmit}
					/>
				</div>
			)
		}
	}

	return (
		<div>
			<h3>Edit a Stream</h3>
			{renderList()}
		</div>
	)
}

export default StreamEdit
// export default connect(null, { fetchStream, editStream })(StreamEdit)
