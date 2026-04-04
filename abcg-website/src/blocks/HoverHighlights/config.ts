import type { Block } from 'payload'

import { link } from '../../fields/link'

export const HoverHighlights: Block = {
  slug: 'hoverHighlights',
  interfaceName: 'HoverHighlightsBlock',
  labels: {
    singular: 'Hover Highlights',
    plural: 'Hover Highlights',
  },
  fields: [
    {
      name: 'beforeHighlights',
      type: 'textarea',
      label: 'Text Before Highlights',
      admin: {
        description: 'Small text shown above the highlight links',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights',
      minRows: 1,
      maxRows: 4,
      admin: {
        description:
          'Each highlight has a link text, two images (top and bottom), and a destination link.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'media',
          type: 'group',
          label: 'Media',
          admin: {
            hideGutter: true,
          },
          fields: [
            {
              name: 'top',
              type: 'upload',
              relationTo: 'media',
              label: 'Top Image',
              required: true,
            },
            {
              name: 'bottom',
              type: 'upload',
              relationTo: 'media',
              label: 'Bottom Image',
              required: false,
            },
          ],
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
    {
      name: 'afterHighlights',
      type: 'textarea',
      label: 'Text After Highlights',
      admin: {
        description: 'Small text shown below the highlight links (optional)',
      },
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          description: 'Bottom link (e.g. "Schedule a demo")',
        },
      },
    }),
  ],
}
