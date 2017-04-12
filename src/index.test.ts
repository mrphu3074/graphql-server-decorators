import * as chai from 'chai';
import { controller, query, mutation } from './index';
import {GraphQLString} from 'graphql';
const expert = chai.expect;

@controller
class Product {
	@query({
		name: 'find',
		type: GraphQLString
	})
	find() {
		return 'Find';
	}

	@query({
		name: 'findOne',
		type: GraphQLString
	})
	findOne() {
		return 'findOne';
	}
// =============================================================================
// Mutations
// =============================================================================
	@mutation({
		name: 'create',
		type: GraphQLString
	})
	create() {
		return 'create';
	}


	@mutation({
		name: 'update',
		type: GraphQLString
	})
	update() {
		return 'update';
	}
}

const product = new Product();

describe('Graphql server decorators', function () {
	let methods = Object.getPrototypeOf(product);

	it('should have method getQueries', function () {
		expert(methods).haveOwnProperty('getQueries');
	});

	it('can create graphql queries', function () {
		const queries = product['getQueries']();
		expert(queries).haveOwnProperty('find');
		expert(queries).haveOwnProperty('findOne');
	});

	it('should have method getMutations', function () {
		expert(methods).haveOwnProperty('getMutations');
	});

	it('can create graphql mutations', function () {
		const mutations = product['getMutations']();
		expert(mutations).haveOwnProperty('create');
		expert(mutations).haveOwnProperty('update');
	});

})

