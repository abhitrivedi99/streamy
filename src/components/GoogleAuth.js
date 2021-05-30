import React, { useCallback, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

const KEY =
	'877762532052-dt6mahbefgpiuup3u7e1gcd9p7qdaol5.apps.googleusercontent.com'

const GoogleAuth = (props) => {
	const auth = useRef('')
	const { signIn, signOut, isSignedIn } = props

	const onAuthChange = useCallback(
		(isSignedIn) => {
			if (isSignedIn) {
				signIn(auth.current.currentUser.get().getId())
			} else {
				signOut()
			}
		},
		[signIn, signOut],
	)

	const onSignInClick = () => {
		auth.current.signIn()
	}

	const onSignOutClick = () => {
		auth.current.signOut()
	}

	const renderAuthButton = () => {
		if (isSignedIn === null) {
			return null
		} else if (isSignedIn) {
			return (
				<button
					className="ui red google button"
					onClick={onSignOutClick}
				>
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else {
			return (
				<button
					className="ui white google button"
					onClick={onSignInClick}
				>
					<i className="google icon" />
					Sign in with Google
				</button>
			)
		}
	}

	useEffect(() => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: KEY,
					scope: 'email',
				})
				.then(() => {
					console.log('Success')
					auth.current = window.gapi.auth2.getAuthInstance()
					onAuthChange(auth.current.isSignedIn.get())
					auth.current.isSignedIn.listen(onAuthChange)
				})
		})
	}, [onAuthChange])

	return <div>{renderAuthButton()}</div>
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(
	GoogleAuth,
)
