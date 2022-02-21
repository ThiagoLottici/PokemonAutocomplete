1. What is the difference between Component and PureComponent? give an example where it might break my app.
  React PureComponent implements 'shouldComponentUpdate' lifecyle method. It does a comparison between new props and old props and will only
    re-render when one of the props changes.
  Since complex data structure, such as objects and array, are the same when the data within them changes, this can cause a component not triggering the re-remder with new data.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
  When the context changes all components that uses this context will trigger a re-render to update with the new data. The consumer components can be any component in the tree, therefore if a parent component blocks the update with shouldComponentUpdate, if the child is a consumer of the context, the child will trigger a re-render on itself

3. Describe 3 ways to pass information from a component to its PARENT.
  1. Passing down a setState from the parent to the child allows the child to modify one of the parents state.
  2. Passin down a callback function as a prop allows the child to run this callback passing parameters to this to this function which belongs to the parent scope.
  3. Passing down a ref with forwardRef (in case of a functional component) or adding a ref to the child class component allows the parent to have access to children data.

4. Give 2 ways to prevent components from re-rendering.
  1. React useMemo, which will only trigger a re-render when one the props changes
  2. Adding an unique and fixed 'key' prop to the component

5. What is a fragment and why do we need it? Give an example where it might break my app.
  All react components must only return one parent node element. React fragment allows us to wrap our component and then it's possible to return two or more node elements from a component and those will be attached to the parent up in the three.
  Sometimes components need to have a direct child to work, for example, React Router Switch does not work with we use a frament wrapping the Route components. Fragment is still a container in the tree, but does not add any elements to the DOM.

6. Give 3 examples of the HOC pattern.
  HOC's are mainly used to re-use code/functionality, so:
  1. HOC when we need to do any logic before rendering a component, such as check if user is logged in.
  2. HOC can also be used to add/merge props and pass down to children, such as the 'connect' HOC from redux.
  3. HOC to add style to the child component

7. what's the difference in handling exceptions in promises, callbacks and async...await.  REFAZER
  In promises exceptions are handled by calling the reject callback, in callbacks exceptions might be handled by calling one of the argument of the callback function which is specific for error handlings while in async/await errors are handled by using try/catch function.

8. How many arguments does setState take and why is it async.
setState hook can take an argument to update the value, but it can also take a callback function that has the previous state value as an argument.
  setState is asynchronous because since it causes components to re-render and since in a single function the state can be updated multiple times, what react does is cluster all updates in a single re-render event.  

9. List the steps needed to migrate a Class to Function Component.
  1. Create a function components
  2. Migrate the states to useStates or useReducer (if many states within a component)
  3. Migrate the lifecyle methods to useEffect:
      componentDidMount to a useEffect with an empty dependency array.
      componentDidUpdate to a useEffect with a dependency array containing the interest variables
      comnentWillUnmount to a useEffect returning a callback function to do the apropriate cleanup.

10. List a few ways styles can be used with components.
  1. We can import a style from a css file
  2. We can add the styles by adding an object to the style prop of each element
  3. Creating a global style and adding to the index.

11. How to render an HTML string coming from the server.
  With the dangerouslySetInnerHtml attribute in React's elements.
