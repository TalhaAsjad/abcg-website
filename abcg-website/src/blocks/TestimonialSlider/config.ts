import type { Block } from 'payload'

import { link } from '../../fields/link'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TestimonialSlider: Block = {
  slug: 'testimonialSlider',
  dbName: 'tsSlider',
  interfaceName: 'TestimonialSliderBlock',
  labels: {
    singular: 'Testimonial Slider',
    plural: 'Testimonial Sliders',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: 'Heading',
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
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      dbName: 'ts_items',
      minRows: 1,
      fields: [
        {
          name: 'feedback',
          type: 'textarea',
          label: 'Feedback',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
          required: true,
        },
        {
          name: 'caseStudyLabel',
          type: 'text',
          label: 'Case Study Text',
          defaultValue: 'Case Study',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'caseStudyLink',
            label: 'Case Study Link',
            dbName: 'cs_link',
          },
        }),
      ],
    },
  ],
}
