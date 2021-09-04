
/* eslint-disable camelcase */
export interface BoardResponse {
  id: number,
  name: string,
  description: string,
  created_at: Date,
  updated_at: Date,
  created_by_user_id: number,
  links: number[],
}
/* eslint-enable camelcase */

export interface Board {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
  createdByUserId: number,
  links: number[],
}
