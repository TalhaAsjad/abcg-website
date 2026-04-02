import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Has Dropdown',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown,
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              admin: {
                description: 'Optional short description shown below the label',
              },
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
