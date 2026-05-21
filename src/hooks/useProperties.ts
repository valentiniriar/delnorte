import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProperties } from '@/lib/api'
import type { PropertyFilters } from '@/types'

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
  })
}

export function useMapProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['map-properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 15_000,
    placeholderData: keepPreviousData,
  })
}
