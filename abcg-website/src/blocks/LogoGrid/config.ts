import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'


export const LogoGrid: Block = {
  slug: 'logoGrid',
  interfaceName: 'LogoGridBlock',
  labels: {
    singular: 'Logo Grid',
    plural: 'Logo Grids',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: 'Tagline',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
{
      name: 'logos',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      admin: {
        description: 'Add logos to display in the grid. You can add more than 8 — they will rotate through the available slots.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'logoMedia',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
      ],
    },
  ],
}
