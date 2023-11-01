import AddEventCategory from '@/features/category/pages/category'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const AddCategoryPage = () => {
  return <AddEventCategory />
}

AddCategoryPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

AddCategoryPage.allowedRoles = [UserRole.ADMIN]

export default AddCategoryPage
