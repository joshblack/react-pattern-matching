# `react-pattern-matching`

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> `Pattern` and `Match` components, with generic matching tools, to
> assist you in all your conditional rendering needs.

## Install

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install react-pattern-matching --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add react-pattern-matching
```

## Usage

The main component exported by `react-pattern-matching` is the `<Pattern>` component.
`Pattern` takes in a couple props, namely:

- `match` which is an object that contains a mapping of the props and their
  values that you want to match against.
- `first`: by default, `Pattern` will render *every* child that matches the
  `match` criteria with the given matcher. If you don't want this behavior,
  setting the `first` prop to true will make `Pattern` render only the first match.
- `isMatch` an optional prop that allows you to implement your own matching
  logic, or use one of the strategies exported in `matchers`.

We can use `Pattern` in the following way:

```js
import { Pattern, Match } from 'react-pattern-matching';
const App = () => (
  <Pattern match={{ foo: 'bar' }}>
    <Match foo="bar">Bar</Match>
    <Match foo="baz">Baz</Match>
  </Pattern>
);
```

In this example, it would only render the first `Match` with `foo="bar"`. This
matches the object given to the `match` prop for `Pattern`, where the name of the
prop, `foo`, matches the value of the prop, `'bar'`.

`Pattern` also can be used to render all matches of the `match` prop, or just the
first match. This is what the `first` prop is used for. For example:

```js
import { Pattern, Match } from 'react-pattern-matching';

// In this case, `Pattern` renders both `Bar 1` and `Bar 2`
const AllMatches = () => (
  <Pattern match={{ foo: 'bar' }}>
    <Match foo="bar">Bar 1</Match>
    <Match foo="bar">Bar 2</Match>
  </Pattern>
);

// In this case, `Pattern` renders only `Bar 1` because of the `first` prop
const FirstMatch = () => (
  <Pattern match={{ foo: 'bar' }} first>
    <Match foo="bar">Bar 1</Match>
    <Match foo="bar">Bar 2</Match>
  </Pattern>
);
```

### Further Examples

- [Toggle based on state](https://codesandbox.io/embed/j312oq1ww3)
- [Toggle based on dynamic response](https://codesandbox.io/embed/ll58w8zm)

### Inspiration

- https://www.youtube.com/watch?v=MkdV2-U16tc
