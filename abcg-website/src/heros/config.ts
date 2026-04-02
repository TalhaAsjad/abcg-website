import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'highImpact',
      label: 'Type',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        // {
        //   label: 'None',
        //   value: 'none',
        // },
        // {
        //   label: 'Medium Impact',
        //   value: 'mediumImpact',
        // },
        // {
        //   label: 'Low Impact',
        //   value: 'lowImpact',
        // },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'heroImage1',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image 1',
    },
    {
      name: 'heroImage2',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image 2',
    },
  ],
  label: false,
}
