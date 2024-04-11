import { api } from '@/lib/axios'

interface LocationSchedule {
  weekdays: string;
  hour: string;
}

export interface Location {
  id: number;
  title: string;
  content: string;
  opened: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: LocationSchedule[];
  street?: string;
  region?: string;
  city_name?: string;
  state_name?: string;
  uf?: string;
}

export interface GetLocationsResponse {
  current_country_id: number;
  locations: Location[];
  wp_total: number;
  total: number;
  success: boolean;
}

export async function getLocations() {
  const response = await api.get<GetLocationsResponse>('/locations.json')

  return response.data
}
