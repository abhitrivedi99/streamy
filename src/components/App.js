import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import StreamCreate from './Streams/StreamCreate'
import StreamDelete from './Streams/StreamDelete'
import StreamEdit from './Streams/StreamEdit'
import StreamList from './Streams/StreamList'
import StreamShow from './Streams/StreamShow'
import Header from './Header'
import history from '../history'

const App = () => {
	// There are three router.
	// 1) Memory Router
	// 2) Hash Router
	// 3) Browser Router

	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/" exact component={StreamList}></Route>
						<Route path="/streams/new" exact component={StreamCreate}></Route>
						<Route
							path="/streams/edit/:id"
							exact
							component={StreamEdit}
						></Route>
						<Route
							path="/streams/delete/:id"
							exact
							component={StreamDelete}
						></Route>
						<Route path="/streams/:id" exact component={StreamShow}></Route>
					</Switch>
				</div>
			</Router>
		</div>
	)
}

export default App
