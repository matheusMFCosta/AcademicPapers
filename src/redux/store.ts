import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/reducers";

declare var window: any

const toPlainObject = proto => {
	let jsoned = {}
	let toConvert = proto || this
	Object.getOwnPropertyNames(toConvert).forEach(prop => {
		const val = toConvert[prop]
		// don't include those
		if (prop === 'toPlainObject' || prop === 'constructor') {
			return
		}
		if (typeof val === 'function') {
			jsoned[prop] = val.bind(jsoned)
			if (prop == 'payload') jsoned['function-' + prop] = val.toString()
			return
		}
		jsoned[prop] = val
	})

	const inherited = Object.getPrototypeOf(toConvert)
	if (inherited !== null) {
		Object.keys(toPlainObject(inherited)).forEach(key => {
			if (!!jsoned[key] || key === 'constructor' || key === 'toPlainObject') return
			if (typeof inherited[key] === 'function') {
				jsoned[key] = inherited[key].bind(jsoned)
				if (key == 'payload') jsoned['function-' + key] = inherited[key].toString()

				return
			}
			jsoned[key] = inherited[key]
		})
	}
	return jsoned
}

const customMiddleware = store => next => action => {
	let validated: boolean = true
	if (action.validate) {
		validated = action.validate(store.getState, action)
	}
	if (validated === true) {
		next(toPlainObject(action))
	}

	if (action.process && validated) {
		action.process(store.getState, store.dispatch, action)
	}
	return store
}

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(customMiddleware))