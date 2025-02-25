# Introducing Pineicons

Beautifully hand-crafted SVG icons designed to enhance your web applications with elegance and simplicity. Available as basic SVG icons and through first-party [React](#react-usage) and [Vue](#vue-usage) libraries for seamless integration.

[**Browse all icons at pineicons.com →**](https://pineicons.com)

[![Latest Release](https://img.shields.io/npm/v/pineicons)](https://github.com/pineicons/pineicons/releases)
[![License](https://img.shields.io/npm/l/pineicons.svg)](https://github.com/pineicons/pineicons/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@pine-icons/react)](https://www.npmjs.com/package/@pine-icons/react)
[![GitHub Stars](https://img.shields.io/github/stars/pineicons/pineicons)](https://github.com/pineicons/pineicons)

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [React Usage](#react-usage)
- [Vue Usage](#vue-usage)
- [Icon Sizes and Styles](#icon-sizes-and-styles)
- [Icon Naming Convention](#icon-naming-convention)
- [License](#license)
- [Contributing](#contributing)
- [Accessibility](#accessibility)
- [Customization](#customization)
- [Examples](#examples)

## Installation

Before installing Pineicons, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. Refer to the [Node.js installation guides](https://nodejs.org/en/download/package-manager) if needed.

### React

To install the React library, run:

```sh
npm install @pine-icons/react
```

### Vue

To install the Vue library, run:

```sh
npm install @pine-icons/vue
```

## Basic Usage

The simplest way to use Pineicons is to copy the SVG source from pineicons.com and embed it directly in your HTML:

```html
<svg class="size-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

Icons (outline and solid) are styled using the color CSS property (e.g., text-gray-500 with Tailwind CSS). Adjust size with width and height properties or use advanced styling with SVG attributes or CSS filters.

## React Usage

Import icons individually as React components to minimize bundle size. Example with Home:

```jsx
import { Home } from "@pine-icons/react/24/solid";

function MyComponent() {
  return (
    <div>
      <Home className="size-6 text-blue-500" />
      <p>Explore science</p>
    </div>
  );
}
```

### Button Example

```jsx
import { Home } from "@pine-icons/react/24/solid";

function MyButton() {
  return (
    <button className="flex items-center space-x-2">
      <Home className="size-6 text-blue-500" />
      <span>Click me</span>
    </button>
  );
}
```

## Vue Usage

Import icons as Vue components. Example with Home:

```vue
<template>
  <div>
    <Home class="size-6 text-blue-500" />
    <p>Explore science</p>
  </div>
</template>

<script setup>
import { Home } from "@pine-icons/vue/24/solid";
</script>
```

### Card Example

```vue
<template>
  <div class="card flex items-center space-x-2">
    <Home class="size-6 text-blue-500" />
    <p>Card content goes here</p>
  </div>
</template>

<script setup>
import { Home } from "@pine-icons/vue/24/solid";
</script>
```

## Icon Sizes and Styles

Pineicons are available in multiple sizes and styles:

- 16x16 solid:
  - React: `@pine-icons/react/16/solid`
  - Vue: `@pine-icons/vue/16/solid`
- 20x20 solid:
  - React: `@pine-icons/react/20/solid`
  - Vue: `@pine-icons/vue/20/solid`
- 24x24 outline:
  - React: `@pine-icons/react/24/outline`
  - Vue: `@pine-icons/vue/24/outline`
- 24x24 solid:
  - React: `@pine-icons/react/24/solid`
  - Vue: `@pine-icons/vue/24/solid`

## Icon Naming Convention

Icons use upper camel case naming (e.g., Home). Browse icon names on UNPKG:

- [React (24x24 outline)]()
- [Vue (24x24 outline)]()

## License

Pineicons is licensed under the MIT License, allowing free use, modification, and distribution with the original copyright notice.

## Contributing

We welcome contributions! To add icons, fix bugs, or improve docs, see our contributing guide or visit the issue tracker.

## Accessibility

Enhance accessibility with ARIA attributes:

```html
<svg
  role="img"
  aria-label="Beaker icon"
  class="size-6 text-blue-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

This ensures screen readers can interpret the icon.

## Customization

Customize icons with SVG attributes or CSS:

```html
<svg class="size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

Add effects with CSS:

```css
.custom-icon {
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
}
```

## Examples

### React Button

```jsx
import { Home } from "@pine-icons/react/24/solid";

function MyButton() {
  return (
    <button className="flex items-center space-x-2">
      <Home className="size-6 text-blue-500" />
      <span>Click me</span>
    </button>
  );
}
```

### Vue List

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="flex items-center space-x-2">
      <Check class="size-5 text-green-500" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script setup>
import { Check } from "@pine-icons/vue/20/solid";
const items = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
];
</script>
```

### HTML Decorative Icon

```html
<div class="relative">
  <img src="background.jpg" alt="Background" class="w-full h-64 object-cover" />
  <svg
    class="absolute top-4 right-4 size-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</div>
```
