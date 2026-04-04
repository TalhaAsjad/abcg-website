import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FeatureImageBlock } from '@/blocks/FeatureImage/Component'
import { LogoGridBlock } from '@/blocks/LogoGrid/Component'
import { HoverHighlightsBlock } from '@/blocks/HoverHighlights/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSlider/Component'
import { BackgroundGrid } from '@/components/BackgroundGrid'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  featureImage: FeatureImageBlock,
  formBlock: FormBlock,
  hoverHighlights: HoverHighlightsBlock,
  logoGrid: LogoGridBlock,
  mediaBlock: MediaBlock,
  testimonialSlider: TestimonialSliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    const hoverIndex = blocks.findIndex((b) => b.blockType === 'hoverHighlights')

    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const isDark = hoverIndex !== -1 && index >= hoverIndex

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <div className={isDark ? 'relative bg-black' : ''} key={index}>
                  {isDark && <BackgroundGrid />}
                  {/* @ts-expect-error there may be some mismatch between the expected types here - block props are dynamically resolved */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
