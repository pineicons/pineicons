# Pine Icons for React Native

A set of free MIT-licensed high-quality SVG icons for use with React Native.

## Installation

```sh
npm install @pine-icons/react-native react-native-svg
# or
yarn add @pine-icons/react-native react-native-svg
# or 
bun add @pine-icons/react-native react-native-svg
```

Note: This package requires `react-native-svg` as a peer dependency.

## Usage

```jsx
import { ActivityIcon } from '@pine-icons/react-native/icons/outline';
// or
import { ActivityIcon } from '@pine-icons/react-native/icons/solid';

export default function App() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {/* Default settings (size: 24, color: currentColor, strokeWidth: 1.5) */}
      <ActivityIcon />
      
      {/* Customized */}
      <ActivityIcon 
        size={36}
        color="blue" 
        strokeWidth={2}
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </View>
  );
}
```

## Props

- `color` (string): The color of the icon (default: "currentColor")
- `size` (number): The size of the icon (default: 24)
- `strokeWidth` (number): The stroke width of the icon (default: 1.5)
- `strokeLinecap` (string): The stroke line cap of the icon (default: "round")
- `strokeLinejoin` (string): The stroke line join of the icon (default: "round")
- All other props are passed to the underlying SVG component

## License

MIT