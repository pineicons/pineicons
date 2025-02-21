export default {
  plugins: [
    'preset-default',
    'removeDimensions',
    'sortAttrs',
    'cleanupListOfValues',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['stroke', 'path:stroke-width'],
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
            'stroke-width': '1.5',
            stroke: 'currentColor',
            'aria-hidden': 'true',
            'data-slot': 'icon',
          },
        ],
      },
    },
  ],
}
