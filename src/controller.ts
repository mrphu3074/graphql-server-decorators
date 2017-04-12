import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql';
interface IController<T> {
	getQueries: Function;
	getMutations: Function;
}
export function controller(target?: any): any {
	/**
	 * Method to get all queries of controller
	 */
	target.prototype.getQueries = function () {
		let methods = {
			...Object.getPrototypeOf(this)
		};

		// remove functions not graphql resolvers
		delete methods['constructor'];
		delete methods['getMutations'];
		delete methods['getQueries'];

		let queries = {};
		for (let name in methods) {
			if (typeof this[name] === 'function') {
				let result = this[name]();
				if (result && result['queries']) {
					queries = { ...queries, ...result['queries'] };
				}
			}
		}
		return queries;
	}
	/**
	 * Method to get all mutations of controller
	 */
	target.prototype.getMutations = function () {
		let methods = {
			...Object.getPrototypeOf(this)
		};

		// remove functions not graphql resolvers
		delete methods['constructor'];
		delete methods['getMutations'];
		delete methods['getQueries'];

		let mutations = {};
		for (let name in methods) {
			if (typeof this[name] === 'function') {
				let result = this[name]();
				if (result && result['mutations']) {
					mutations = { ...mutations, ...result['mutations'] };
				}
			}
		}
		return mutations;
	}

	// return new constructor (will override original)
	return target;
}