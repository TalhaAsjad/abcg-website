import React from 'react'

import type { FeatureImageBlock as FeatureImageBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const FeatureImageBlock: React.FC<FeatureImageBlockProps> = ({ richText, image }) => {
  return (
    <div className="container mt-40">
      <div className="flex flex-col gap-8">
        {richText && (
          <div className="text-center">
            <RichText
              className="[&_h2]:text-3xl [&_h2]:lg:text-5xl [&_h2]:font-medium [&_h2]:leading-tight"
              data={richText}
              enableGutter={false}
            />
          </div>
        )}

        {image && typeof image === 'object' && (
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <Media resource={image} imgClassName="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  )
}
