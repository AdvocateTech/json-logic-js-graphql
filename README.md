# jsonLogic GraphQL Query Keys


[![NPM](https://nodei.co/npm/json-logic-js-graphql.png?downloads=true)](https://nodei.co/npm/json-logic-js-graphql/)


Exposes immutable useful functions from [Lodash](https://lodash.com/docs/) to [jsonLogic](https://github.com/jwadhams/json-logic-js)

## The Problem 
Unsupported GraphQL keys: `==`, `===`, `!=`, `!==`, `>`, `>=`, ` <`, `<=`, `!!`, ` !`, ` %`, ` +`, ` *`, ` -`, `/`

## The Solution
Use any of `_eq`, `_gt`, `_gte`, `_lt`, `_lte` etc from Lodash methods


## Installation

```bash
# PNPM
$ pnpm add json-logic-js-graphql
```


# Usage
 
```javascript

import { jsonLogic } from 'json-logic-js-graphql'

const rules = {
  _eq: [{ var: 'foo' }, { var: 'bar' }],
}
const data = { foo: 'bar', bar: 'bar' }

jsonLogic.apply(rules, data)
 
```
 
## GraphQL 

jsonLogic's equal operator is `"==="` so it can't be used as a GraphQL key. 
We expose the `eq` lodash method as `_eq` to jsonLogic.

```graphql
mutation {
  updateResource(
    id: "609ce9dbec9fb60004087784"
    logic: { _eq: [{ var: "foo" }, "bar"] }
  ) {
    id
  }
}

```

>  All Lodash methods exposed with the `_` namespace to avoid overwriting the default jsonLogic's functionality 

## Date functions using momentJs 

`_gteDate`, `_gtDate`, `_lteDate`, `_ltDate`, `_eqDate`, `_getDate`

example: 

```javascript
const rules = {
  _gteDate: [
    [{ var: 'from' }, { var: 'to' }],
    [364, 'days'],
  ],
}
const data = { from: '2020-10-01', to: '2021-10-01' }

jsonLogic.apply(rules, data)

```

## Tests
Install dependencies with `pnpm install` and then run the tests `pnpm test`

## Inpired
Inpired from  [formio](https://github.com/formio/formio.js) utils
