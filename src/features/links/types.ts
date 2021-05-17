
/* eslint-disable camelcase */
export interface LinkResponse {
  id: number,
  description: string,
  icon_url: string,
  url: string,
  created_at: Date,
  created_by_user_id: number,
  labels: number[],
}
/* eslint-enable camelcase */

export interface Link {
  id: number,
  description: string,
  iconUrl: string,
  url: string,
  createdAt: Date,
  createdByUserId: number,
  labels: number[],
}
