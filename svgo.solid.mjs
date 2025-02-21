export default {
  plugins: [
    'preset-default',
    'removeDimensions',
    'sortAttrs',
    'cleanupListOfValues',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['fill'],
      },
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: 'path',
        attributes: ['fill'],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            fill: 'currentColor',
            'aria-hidden': 'true',
            'data-slot': 'icon',
          },
        ],
      },
    },
  ],
}
