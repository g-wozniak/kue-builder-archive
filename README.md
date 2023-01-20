# kue-builder
Pathway template builder allowing mentors to build their which later is going to be shared with the students. This component is primarrily embedded into web application being and independent part and package which gets deployed to npm registry and then sourced from there.

The package is a standalone ReactJS component which comes with the styling that should not collide with the external HTML elements.

## High-level functionality
<todo>

## Build process

This project supports two types of build:
- local
- distribution

### Local build and preview

Local build is using Webpack to locally preview the builder component, allowing further development. Webpack uses the top level file `index.tsx` to initialise the builder, as well as local styles that define the local container look. The files are then packed and distributed into `dist/.local` directory.

*Note:* This build has a watcher enabled by default. You can configure it in `webpack.config.js`.

You can run and preview the component using:

1) `yarn`
2) `yarn dev`
3) visit `http://localhost:3002`

### Distribution build

This build is part of the package release and publishing process. You can execute it using `yarn build` command. The files are then located in `dist/.build` directory, ready to be published. The build configuration, as well as build steps can be found in `./tools/build.sh` shell script.

## Publishing the package

You can publish the built package using `yarn push` command. The script is located in `./tools/publish.sh` file. The script will publish the code existing in `dist/.build` into NPM registry, making it accessible and installable in the other vinciway solutions.

*Note:* Make sure you have built your new package version first before publication.

## Testing

You can test the React components in the the following ways:.
- using Cypress, preferable for integration and end-end testing
- using React Testing Library (RTL) with Jest as the runner, for the unit testing
  All other modules and files you can test using solely Jest for assertions.

### Cypress tests

To make the tests intuitive and simple in implementation we have created a simple BDD supporting library which relies on `when/then/and/finally` pattern. If there is a test you can't write in it, consider that you may be approaching it in a wrong way or it's too complicated. Try to assert and operate on visible user interface elements such as headers, texts, boxes and inputs.

This framework is intentionally created to remain simple and allow for fast analysis what went wrong. Testing anything besides user interaction logic and the integrated components behaviour should be undertaken in the unit tests.

You can run Cypress in two ways:
- in the inline mode (terminal) by using `yarn cy`
- in the windowed, full scale way (slower) by using `yarn cypress open`

## CI/CD and delivery process

<todo>


## Technical limitations

The builder uses `react-flow` library to build the blocks. It seems to be the most up-to-date and constantly updated library that supports TypeScript and is built for React. React flow comes with certain limitations which aren't that obvious and not documented in the library itself.

The described cases might be results of our fast implementation or conceptual, caused by lack of time, mistakes or misusage but we are quite confident that the following improvements and solutions won't work with the current codebase:

1) No Redux
   React-flow is using its own provider to allow for the bespoke hooks usage. Regardless of being able to make Redux working in the project, we did not manage to get consistent results in refreshing the react-flow blocks passing the updated state. After a few days of trying we gave up on it.

2) `useDispatch` provided by React is not working right
   The similar situation with useDispatch which resultet in a very strange react-flow behaviour, preventing nodes children from re-rendering. This time, the main block rendering was fine but we could not force children to re-render even by changing their data structure directly. After a few days we decided to build our own state management system and dispatcher.

3) `setNodes` not always work as expected when used for nodes update
   The only way to update nodes that works for all known scenarios so far is using the implementation demonstrated in `updateNodeDataIterator` function. Trying any other way caused some nodes to not update at all. It's likely related to how react flow recognised changes in the nodes structure, possibly being quite fussy about cloning and deep cloning.

4) Passing state and events to nodes
   There are three key ogroups of perations you can potentially perform inside the blocks:
1) select it, drag & drop and use other built-in react-flow functionality
2) trigger a custom event inside a block
3) display the information, previously stored in a state

We managed to make most of it work but due to high complexity and low efficiency of this, we gave up on doing it and simplify our approach.
It all works perfect on the existing blocks or on newly created blocks as far as you don't create more children of the children without saving them first. It is because you need to pass setState, state and events to every node you create, even dynamically.

If you decide to reimplement it for some reason, remember about synchronising state and nodes using hooks, every time when state changes and beware infinite loops upon creating unsaved children.

Good luck with working on the project!