import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import CONFIG from '../config'

export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig('SIMPLE_POST_COVER_ENABLE', false, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap

  return (
    <div
      key={post.id}
      className='pb-12 my-6 border-b h-42 dark:border-gray-800'>
      {/* 文章标题 */}

      <div className='flex'>
        <div className='h-full article-cover'>
          {/* 图片封面 */}
          {showPageCover && (
            <div className='w-56 h-full mr-2 overflow-hidden'>
              <Link href={post.href} passHref legacyBehavior>
                <LazyImage
                  src={post?.pageCoverThumbnail}
                  className='object-cover object-center w-56 h-full duration-500 group-hover:scale-110'
                />
              </Link>
            </div>
          )}
        </div>

        <article className='article-info'>
          <h2 className='mb-2'>
            <Link
              href={post.href}
              className='text-2xl font-bold text-black blog-item-title menu-link'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              {post.title}
            </Link>
          </h2>

          {/* 文章信息 */}
          <header className='flex flex-wrap mb-5 leading-6 text-gray-700 text-md dark:text-gray-300'>
            <div className='space-x-2'>
              <span>
                {' '}
                <a
                  href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)}
                  className='p-1 transition-all duration-200 hover:text-red-400'>
                  <i className='fa-regular fa-user'></i> {siteConfig('AUTHOR')}
                </a>
              </span>
              <span>
                <Link
                  className='p-1 transition-all duration-200 hover:text-red-400'
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
                  <i className='fa-regular fa-clock' /> {post?.publishDay}
                </Link>
              </span>
              <span>
                <TwikooCommentCount post={post} />
              </span>
            </div>

            <div>
              {post.category && (
                <Link href={`/category/${post.category}`} className='p-1'>
                  {' '}
                  <span className='transition-all duration-200 hover:text-red-400'>
                    <i className='fa-regular fa-folder mr-0.5' />
                    {post.category}
                  </span>
                </Link>
              )}
              {post?.tags &&
                post?.tags?.length > 0 &&
                post?.tags.map(t => (
                  <Link
                    key={t}
                    href={`/tag/${t}`}
                    className='transition-all duration-200 hover:text-red-400'>
                    <span> /{t}</span>
                  </Link>
                ))}
            </div>
          </header>

          <main className='mb-6 leading-normal text-gray-700 dark:text-gray-300'>
            {!showPreview && (
              <>
                {post.summary}
                {post.summary && <span>...</span>}
              </>
            )}
            {showPreview && post?.blockMap && (
              <div className='truncate overflow-ellipsis'>
                <NotionPage post={post} />
                <hr className='py-4 border-dashed' />
              </div>
            )}
          </main>
        </article>
      </div>

      <div className='block'>
        <Link
          href={post.href}
          className='inline-block px-5 text-xs leading-8 text-blue-600 transition-all duration-200 border rounded-sm dark:text-blue-300 dark:border-gray-800 hover:text-red-400 hover:border-red-300 h-9'>
          Continue Reading{' '}
          <i className='align-middle fa-solid fa-angle-right'></i>
        </Link>
      </div>
    </div>
  )
}
