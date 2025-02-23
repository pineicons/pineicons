# Pine Icons for Vue

Beautifully hand-crafted Vue SVG icons designed to enhance your web applications with elegance and simplicity.

[**Browse all icons at pineicons.com →**](https://pineicons.com)

[![Latest Release](https://img.shields.io/npm/v/@pine-icons/vue)](https://github.com/pineicons/pineicons/releases)
[![License](https://img.shields.io/npm/l/@pine-icons/vue.svg)](https://github.com/pine-icons/pineicons/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@pine-icons/vue)](https://www.npmjs.com/package/@pine-icons/vue)
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
npm install @pine-icons/vue
```

## Usage

Import icons as Vue components:

```vue
<template>
  <div>
    <BeakerIcon class="h-6 w-6 text-blue-500" />
    <p>Explore science</p>
  </div>
</template>

<script setup>
import { BeakerIcon } from "@pine-icons/vue/24/solid";
</script>
```

Each icon can be imported from its respective size and style directory. Pine Icons work seamlessly with Tailwind CSS classes for styling.

## Icon Sizes and Styles

Pine Icons are available in multiple sizes and styles:

- 16x16 solid: `@pine-icons/vue/16/solid`
- 20x20 solid: `@pine-icons/vue/20/solid`
- 24x24 outline: `@pine-icons/vue/24/outline`
- 24x24 solid: `@pine-icons/vue/24/solid`

Choose the appropriate import path based on your desired size and style.

## Icon Naming Convention

Icons follow upper camel case naming with an Icon suffix:

```vue
<script setup>
import { BeakerIcon } from "@pine-icons/vue/24/solid";
import { ArrowRightIcon } from "@pine-icons/vue/20/solid";
import { UserCircleIcon } from "@pine-icons/vue/24/outline";
</script>
```

## Accessibility

Pine Icons components accept standard HTML attributes including ARIA attributes:

```vue
<template>
  <BeakerIcon class="h-6 w-6 text-blue-500" role="img" aria-label="Science experiment" />
</template>

<script setup>
import { BeakerIcon } from "@pine-icons/vue/24/solid";
</script>
```

For decorative icons, set `aria-hidden="true"`:

```vue
<template>
  <BeakerIcon class="h-6 w-6 text-blue-500" aria-hidden="true" />
</template>

<script setup>
import { BeakerIcon } from "@pine-icons/vue/24/solid";
</script>
```

## Customization

### Basic Styling

Use Tailwind CSS classes or standard CSS to customize icons:

```vue
<!-- With Tailwind CSS -->
<BeakerIcon class="h-6 w-6 text-blue-500 hover:text-blue-600" />

<!-- With standard CSS -->
<BeakerIcon class="icon-custom" />
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

```vue
<BeakerIcon class="h-8 w-8 text-purple-600 transform rotate-45 transition-all duration-300 hover:scale-110" />
```

## Examples

### Button with Icon

```vue
<template>
  <button class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
    <span>Next</span>
    <ArrowRightIcon class="h-5 w-5" />
  </button>
</template>

<script setup>
import { ArrowRightIcon } from "@pine-icons/vue/20/solid";
</script>
```

### Navigation Item

```vue
<template>
  <a href="/" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
    <HomeIcon class="h-6 w-6" />
    <span>Home</span>
  </a>
</template>

<script setup>
import { HomeIcon } from "@pine-icons/vue/24/outline";
</script>
```

### Loading State

```vue
<template>
  <button :disabled="isLoading" class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
    <template v-if="isLoading">
      <SpinnerIcon class="h-5 w-5 animate-spin" />
      <span>Loading...</span>
    </template>
    <span v-else>Submit</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { SpinnerIcon } from "@pine-icons/vue/24/outline";

const isLoading = ref(false);
</script>
```

### List with Icons

```vue
<template>
  <ul class="space-y-2">
    <li v-for="feature in features" :key="feature" class="flex items-center space-x-2">
      <CheckCircleIcon class="h-5 w-5 text-green-500" />
      <span>{{ feature }}</span>
    </li>
  </ul>
</template>

<script setup>
import { CheckCircleIcon } from "@pine-icons/vue/20/solid";

const features = ["Easy integration", "Customizable styles", "Accessibility support"];
</script>
```

### Dynamic Icon Component

```vue
<template>
  <component :is="icon" class="h-6 w-6" :class="iconColor" />
</template>

<script setup>
import { computed } from "vue";
import { CheckCircleIcon, XCircleIcon } from "@pine-icons/vue/24/solid";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  return props.status === "success" ? CheckCircleIcon : XCircleIcon;
});

const iconColor = computed(() => {
  return props.status === "success" ? "text-green-500" : "text-red-500";
});
</script>
```

### Icon with Badge

```vue
<template>
  <div class="relative">
    <BellIcon class="h-6 w-6 text-gray-600" />
    <span
      v-if="unreadCount"
      class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
    >
      {{ unreadCount }}
    </span>
  </div>
</template>

<script setup>
import { BellIcon } from "@pine-icons/vue/24/outline";

defineProps({
  unreadCount: {
    type: Number,
    default: 0,
  },
});
</script>
```
