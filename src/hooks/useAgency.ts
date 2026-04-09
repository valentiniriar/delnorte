// src/hooks/useAgency.ts
import { useQuery } from '@tanstack/react-query'
import { fetchAgency } from '@/lib/api'

export function useAgency() {
  return useQuery({
    queryKey: ['agency'],
    queryFn: fetchAgency,
    staleTime: 60 * 60 * 1000,
  })
}
