// src/hooks/useProperty.ts
import { useQuery } from '@tanstack/react-query'
import { fetchProperty } from '@/lib/api'

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  })
}
