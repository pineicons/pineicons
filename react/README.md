# Pine Icons for React

Beautifully hand-crafted React SVG icons designed to enhance your web applications with elegance and simplicity.

[**Browse all icons at pineicons.com →**](https://pineicons.com)

[![Latest Release](https://img.shields.io/npm/v/@pine-icons/react)](https://github.com/pineicons/pineicons/releases)
[![License](https://img.shields.io/npm/l/@pine-icons/react.svg)](https://github.com/pineicons/pineicons/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@pine-icons/react)](https://www.npmjs.com/package/@pine-icons/react)
[![GitHub Stars](https://img.shields.io/github/stars/pineicons/pineicons)](https://github.com/pineicons/pineicons)

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
import { Home } from "@pine-icons/react/icons/solid";

function MyComponent() {
  return (
    <div>
      <Home className="h-6 w-6 text-blue-500" />
      <p>Explore science</p>
    </div>
  );
}
```

Each icon can be imported from its respective style directory. Pine Icons work seamlessly with Tailwind CSS classes for styling.

## Icon Sizes and Styles

Pine Icons are available in multiple styles:

- Outline icons: `@pine-icons/react/icons/outline`
- Solid icons: `@pine-icons/react/icons/solid`

Choose the appropriate import path based on your desired style.

## Icon Naming Convention

Icons follow upper camel case naming:

```jsx
import { Home } from "@pine-icons/react/icons/solid";
import { ArrowRight } from "@pine-icons/react/icons/solid";
import { UserCircle } from "@pine-icons/react/icons/outline";
```

## Accessibility

Pine Icons components accept standard HTML attributes including ARIA attributes:

```jsx
function AccessibleIcon() {
  return <Home className="h-6 w-6 text-blue-500" aria-label="Science experiment" role="img" />;
}
```

For decorative icons, set `aria-hidden="true"`:

```jsx
function DecorativeIcon() {
  return <Home className="h-6 w-6 text-blue-500" aria-hidden="true" />;
}
```

## Customization

### Basic Styling

Use Tailwind CSS classes or standard CSS to customize icons:

```jsx
// With Tailwind CSS
<Home className="h-6 w-6 text-blue-500 hover:text-blue-600" />

// With standard CSS
<Home className="icon-custom" />
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
<Home className="h-8 w-8 text-purple-600 transform rotate-45 transition-all duration-300 hover:scale-110" />
```

## Examples

### Button with Icon

```jsx
import { ArrowRight } from "@pine-icons/react/icons/solid";

function Button() {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      <span>Next</span>
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}
```

### Navigation Item

```jsx
import { Home } from "@pine-icons/react/icons/outline";

function NavItem() {
  return (
    <a href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
      <Home className="h-6 w-6" />
      <span>Home</span>
    </a>
  );
}
```

### Loading State

```jsx
import { Spinner } from "@pine-icons/react/icons/outline";

function LoadingButton({ isLoading }) {
  return (
    <button disabled={isLoading} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
      {isLoading ? (
        <>
          <Spinner className="h-5 w-5 animate-spin" />
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
import { CheckCircle } from "@pine-icons/react/icons/solid";

function FeatureList() {
  const features = ["Easy integration", "Customizable styles", "Accessibility support"];

  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
```
