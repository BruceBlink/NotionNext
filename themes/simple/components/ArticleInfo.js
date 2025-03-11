import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

/**
 * 文章描述
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post } = props

  const { locale } = useGlobal()

  return (
    <section className='mt-2 leading-8 text-gray-600 dark:text-gray-400'>
      <h2 className='mb-5 text-xl font-bold text-black no-underline blog-item-title md:text-2xl'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {post?.title}
      </h2>

      <div className='flex flex-wrap text-gray-700 dark:text-gray-300'>
        {post?.type !== 'Page' && (
          <div className='mr-4 space-x-3'>
            <span>
              {' '}
              <i className='fa-regular fa-user'></i>{' '}
              <a href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)}>
                {siteConfig('AUTHOR')}
              </a>
            </span>
            <span>
              {' '}
              <i className='fa-regular fa-clock'></i>{' '}
              {`${formatDateFmt(post?.publishDate, 'yyyy-MM-dd hh:mm:ss')}`}
            </span>
            {post?.category && (
              <span>
                {' '}
                <i className='fa-regular fa-folder'></i>{' '}
                <a
                  href={`/category/${post?.category}`}
                  className='transition-all duration-200 hover:text-red-400'>
                  {post?.category}
                </a>
              </span>
            )}
            {post?.tags &&
              post?.tags?.length > 0 &&
              post?.tags.map(t => (
                <span key={t}>
                  {' '}
                  /{' '}
                  <Link href={`/tag/${t}`}>
                    <span className='transition-all duration-200 hover:text-red-400'>
                      {t}
                    </span>
                  </Link>
                </span>
              ))}
          </div>
        )}

        {post?.type !== 'Page' && (
          <div className=''>
            <span>
              {locale.COMMON.POST_TIME}:
              <Link
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                passHref
                className='pl-1 mr-2 border-b border-dashed cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 dark:border-gray-500'>
                {post?.publishDay}
              </Link>
            </span>
            <span className='mr-2'>|</span>
            <span className='mx-2 dark:text-gray-500'>
              {locale.COMMON.LAST_EDITED_TIME}: {post?.lastEditedDay}
            </span>
            <span className='mr-2'>|</span>
            <span className='hidden mr-2 font-light busuanzi_container_page_pv'>
              <i className='mr-1 fas fa-eye' />
              &nbsp;
              <span className='mr-2 busuanzi_value_page_pv' />
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
