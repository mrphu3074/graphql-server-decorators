![Circle CI](https://circleci.com/gh/mrphu3074/graphql-server-decorators.svg?style=shield&circle-token=5314936c26314cd5b677aa6eb9c0f72d5376a509)


! [Travis CI] (https://travis-ci.org/mrphu3074/graphql-server-decorators.svg?branch=master)

----

## graphql-server-decorators
Decorators that help creating graphql server easier
These decorators don't create types or input. 
It just help create domain's mutations or queries

## `@controller`
Add prototypes `getQueries` and `getMutations` into a class

## `@query(specs)`
- `specs`: Object
  + name: String. Optional. Default is generate from class name and method name. Ex: User_find, User_findOne
  + description: String. Optional
  + type: GraphqlType. Required
  + args: query arguments. Optional

## `@mutation(specs)`
- `specs`: Object
  + name: String. Optional. Default is generate from class name and method name. Ex: User_create, User_delete
  + description: String. Optional
  + type: GraphqlType. Required
  + args: mutation arguments. Optional

  


```js
@controller
class Product {
  @query({
    type: Products
  })
  find(root, args, context) {
    const collection = context.collections.Product;
    return collection.find();
  }

  @query({
    name: 'getProduct'
    type: Product,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  })
  findOne(root, args, context) {
    const collection = context.collections.Product;
    return collection.findOne({id: args.id});
  }
  // mutations
  @mutation({
    type: Product,
    args: CreateProductArgs
  })
  create(root, args, context) {
    const collection = context.collections.Product;
    return collection.save(args.data);
  }
}

// Add to schema
const product = new Product();

let schemaDef = {
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...product.getQueries()
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...product.getMutations()
    }
  }),
};
const schema =  new GraphQLSchema(schemaDef);
```

