import React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderInput = ({ input, label, meta }) => {
	// props = formProps in redux-form
	const className = `field ${
		meta.error && meta.touched ? 'error' : ''
	}`
	return (
		<div className={className}>
			<label>{label}</label>
			<input {...input} autoComplete="off" />
			{renderError(meta)}
		</div>
	)
}

const renderError = ({ error, touched }) => {
	if (touched && error) {
		return (
			<div className="ui error message">
				<div className="header">{error}</div>
			</div>
		)
	}
}

const onSubmit = (formValues) => {
	console.log(formValues)
}

const StreamCreate = (props) => {
	// console.log(props)
	return (
		<form
			onSubmit={props.handleSubmit(onSubmit)}
			className="ui form error"
		>
			<Field
				name="title"
				component={renderInput}
				label="Enter Title"
			/>
			<Field
				name="description"
				component={renderInput}
				label="Enter Description"
			/>
			<button className="ui button primary">Submit</button>
		</form>
	)
}

const validate = (formValues) => {
	const errors = {}

	if (!formValues.title) {
		errors.title = 'You must enter a title'
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description'
	}

	return errors
}

export default reduxForm({
	form: 'STREAM_CREATE',
	validate,
})(StreamCreate)
