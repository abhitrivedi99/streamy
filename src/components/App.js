import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import StreamCreate from './Streams/StreamCreate'
import StreamDelete from './Streams/StreamDelete'
import StreamEdit from './Streams/StreamEdit'
import StreamList from './Streams/StreamList'
import StreamShow from './Streams/StreamShow'
import Header from './Header'

const App = () => {
	// There are two more router.
	// 1) Memory Router
	// 2) Hash Router

	return (
		<div className="ui container">
			<Router>
				<div>
					<Header />
					<Route path="/" exact component={StreamList}></Route>
					<Route
						path="/stream/new"
						exact
						component={StreamCreate}
					></Route>
					<Route
						path="/stream/edit"
						exact
						component={StreamEdit}
					></Route>
					<Route
						path="/stream/delete"
						exact
						component={StreamDelete}
					></Route>
					<Route
						path="/stream/show"
						exact
						component={StreamShow}
					></Route>
				</div>
			</Router>
		</div>
	)
}

export default App
