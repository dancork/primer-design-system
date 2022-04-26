# Primer Design System

## Technical Decisions

I decided to setup the project as a monorepo using [nx](https://nx.dev). For speed I created only two packages for now, `foundations` and `components`. If this project were to continue I would consider having others such as `hooks` and possibly a package per larger "pattern" component.

I used [headlessui](https://headlessui.dev/) and [rooks (react hooks)](https://react-hooks.org/) to give some interactions, a11y and other functionality.

## Dependencies

```
yarn install
```

## Development

### Testing and Code Style

One of the benefits of using `nx` is that it largely gives testing and linting out-of-the-box.

Testing used `jest` and `testing-library`.

```
# run all tests
yarn test

# run tests only for changed code
yarn affected:test
```

Linting and code formatting uses `eslint` and `prettier`

```
# lints all files
yarn lint

# lint only changed code
yarn affected:lint
```

To automatically fix some code styling issues add the flag `--fix` after either lint command.

### Storybook

Storybook has been added to the components package for development and documentation.

```
$ yarn storybook
```

## What More I Would Do

- Currently the docs in storybook are auto-generated. I'd update the DocsPage in storybook to use custom MDX for better documentation.
- I've only added tests for the functionality mentioned in figma, I'd add more around the placeholder and adornment text.
- I'd implement a better solution for handling round-off errors, currently just using string manipulation which works but feels hacky
- Setup [Storybook composition](https://nx.dev/storybook/storybook-composition-setup) to have per-package stories
- Some of the styling is using logic and props, would prefer to extract this to the lower-level component
