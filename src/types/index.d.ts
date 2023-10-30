import type { Account, Profile, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

export interface NavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
}

export interface SessionCallbackParams {
  session: Session
  token: JWT
  user: User
}

export interface JWTCallbackParams {
  token: JWT
  user?: User | undefined
  account?: Account | null | undefined
  profile?: Profile | undefined
  isNewUser?: boolean | undefined
}

export interface SearchFilter {
  name: string
  value: string
}

export interface SearchParams {
  query: string | null
  type: string | null
}

export interface RecommendationParams {
  userId: string
  page?: number
  pageSize?: number
  searchQuery?: string
}

export interface JobFilterParams {
  query: string
  page: string
}

export interface GetAllQuestionsParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
  sort?: "desc" | "asc"
}

export interface CreateQuestionParams {
  userId: string
  title: string
  explanation: string
  tags: string[]
}

export interface GetAllUsersParams {
  page?: number
  pageSize?: number
  filter?: string
  searchQuery?: string
}

export interface GetTopTagsByUserParams {
  userId: string
  limit?: number
}
