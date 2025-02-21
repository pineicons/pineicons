# Pine Icons for React

Beautifully hand-crafted React SVG icons designed to enhance your web applications with elegance and simplicity.

[**Browse all icons at pineicons.com →**](https://pineicons.com)

[![Latest Release](https://img.shields.io/npm/v/@pine-icons/react)](https://github.com/pine-icons/pine-icons/releases)
[![License](https://img.shields.io/npm/l/@pine-icons/react.svg)](https://github.com/pine-icons/pine-icons/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@pine-icons/react)](https://www.npmjs.com/package/@pine-icons/react)
[![GitHub Stars](https://img.shields.io/github/stars/pine-icons/pine-icons)](https://github.com/pine-icons/pine-icons)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Icon Sizes and Styles](#icon-sizes-and-styles)
- [Icon Naming Convention](#icon-naming-convention)
- [Accessibility](#accessibility)
- [Customization](#customization)
- [Examples](#examples)

## Installation

Before installing Pine Icons, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

```sh
npm install @pine-icons/react
```

## Usage

Import icons individually as React components to minimize bundle size:

```jsx
import { HomeIcon } from "@pine-icons/react/24/solid";

function MyComponent() {
  return (
    <div>
      <HomeIcon className="h-6 w-6 text-blue-500" />
      <p>Explore science</p>
    </div>
  );
}
```

Each icon can be imported from its respective size and style directory. Pine Icons work seamlessly with Tailwind CSS classes for styling.

## Icon Sizes and Styles

Pine Icons are available in multiple sizes and styles:

- 16x16 solid: `@pine-icons/react/16/solid`
- 20x20 solid: `@pine-icons/react/20/solid`
- 24x24 outline: `@pine-icons/react/24/outline`
- 24x24 solid: `@pine-icons/react/24/solid`

Choose the appropriate import path based on your desired size and style.

## Icon Naming Convention

Icons follow upper camel case naming with an Icon suffix:

```jsx
import { HomeIcon } from "@pine-icons/react/24/solid";
import { ArrowRightIcon } from "@pine-icons/react/20/solid";
import { UserCircleIcon } from "@pine-icons/react/24/outline";
```

## Accessibility

Pine Icons components accept standard HTML attributes including ARIA attributes:

```jsx
function AccessibleIcon() {
  return <HomeIcon className="h-6 w-6 text-blue-500" aria-label="Science experiment" role="img" />;
}
```

For decorative icons, set `aria-hidden="true"`:

```jsx
function DecorativeIcon() {
  return <HomeIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />;
}
```

## Customization

### Basic Styling

Use Tailwind CSS classes or standard CSS to customize icons:

```jsx
// With Tailwind CSS
<HomeIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />

// With standard CSS
<HomeIcon className="icon-custom" />
```

```css
.icon-custom {
  height: 1.5rem;
  width: 1.5rem;
  color: #3b82f6;
}

.icon-custom:hover {
  color: #2563eb;
}
```

### Advanced Styling

Apply transformations and effects:

```jsx
<HomeIcon className="h-8 w-8 text-purple-600 transform rotate-45 transition-all duration-300 hover:scale-110" />
```

## Examples

### Button with Icon

```jsx
import { ArrowRightIcon } from "@pine-icons/react/20/solid";

function Button() {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      <span>Next</span>
      <ArrowRightIcon className="h-5 w-5" />
    </button>
  );
}
```

### Navigation Item

```jsx
import { HomeIcon } from "@pine-icons/react/24/outline";

function NavItem() {
  return (
    <a href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
      <HomeIcon className="h-6 w-6" />
      <span>Home</span>
    </a>
  );
}
```

### Loading State

```jsx
import { SpinnerIcon } from "@pine-icons/react/24/outline";

function LoadingButton({ isLoading }) {
  return (
    <button disabled={isLoading} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
      {isLoading ? (
        <>
          <SpinnerIcon className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <span>Submit</span>
      )}
    </button>
  );
}
```

### List with Icons

```jsx
import { CheckCircleIcon } from "@pine-icons/react/20/solid";

function FeatureList() {
  const features = ["Easy integration", "Customizable styles", "Accessibility support"];

  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
```
