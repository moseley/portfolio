import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const pageTitle = (path: string): string => {
  const words = path.replace('-', ' ').split(' ')
  const title = words.map(word => {
    return `${word[0].toUpperCase()}${word.substring(1)}`
  }).join(' ')
  return title
}

const Breadcrumb = () => {
  const router = useRouter()
  const pages = router.pathname.split('/')
  pages.shift()
  let currentPath = ''
  return (
    <>
      {router.pathname !== '/' && (
        <ChakraBreadcrumb separator=' / '>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pages.map((path: string, i: number) => {
            currentPath = `${currentPath}/${path}`
            return (
              <BreadcrumbItem isCurrentPage={i === (pages.length - 1) ? true : false}>
                <BreadcrumbLink href={currentPath}>{pageTitle(path)}</BreadcrumbLink>
              </BreadcrumbItem>
            )
          })}
        </ChakraBreadcrumb>
      )}
      
    </>
  )
}

export { Breadcrumb }