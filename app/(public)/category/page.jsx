import { Suspense } from 'react'
import Loading from '@/components/Loading'
import CategoryContent from './CategoryContent'

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            <span className="text-red-600">Browse</span> Categories
          </h1>
          <p className="text-slate-600 mt-2">Explore our wide range of products by category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<Loading />}>
          <CategoryContent />
        </Suspense>
      </div>
    </div>
  )
}
