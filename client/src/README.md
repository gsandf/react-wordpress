# Overview

This component library for LP Corp follows atomic design patterns while fitting
into the mold and needs of the site and micro sites that use these components.

The folder structure contains a README outlining what, when, and why the react
components live in that folder and should adhere to those conventions outlined.

List of components: [Component Library FRD](https://docs.google.com/document/d/1uR7NzouTt462l5OvIms6SLqg7S20aO-PBBz_kLVjl0k/edit?usp=sharing)

## Component File

A component file should contain the following outline and order, although not
every component needs each part of course and can be left out as necessary.

### Layout

- imports
- styled components
- properties/state definitions (flow)
- component (the component itself)

#### Import Order:

- hocs - higher order components
- components - used in other components or within sections
- elements - building blocks of components
- typography - global type definitions/components
- types - static type checking
- utilities - global utilities

#### Styled Components:

Styled components are pretty self explanatory except for when using prettier,
for some reason when doing string interpolation inside a styled component it
adds a trailing semi-cologne as if it were a line of css itself (probably).

So we need to in those cases add a inline comment directly above it:

`// prettier-ignore`

Example:

```
const Example = styled.div`
  width: 500px;
  height: 200px;
  background-color: ${p => p.theme.color.black};

  ${p => fontGen(p.theme.type.body)}
`;
```

That last line in the example above, without adding `prettier-ignore` directly
above the styled component, will output a semi-cologne at the end. If you
built this css it would output with a semi-cologne within the css statement.

Another example being our dynamic media queries:

```
const AnotherExample = styled.div`
  width: 500px;
  height: 200px;
  background-color: ${p => p.theme.color.black};

  @{media.down.md`
    width: 100%;
  `}
`;
```

#### Properties & State

This is pretty simple, we're currently using flow so if you need a pre-existing
type then pull it in or else define a new one.

> Check out the docs here: [Flow + React Docs](https://flow.org/en/docs/react/)

#### Component

This section of the file is where you'd write the component you're exporting.
