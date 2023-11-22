export type userType = {
  id: string,
  name: string,
  email?: string,
  emailVerified?: string,
  backgroundStyles: "",
  buttonStyles: ""
  question: string,
  membership?: null | "Divine Plan - Annually" | "Divine Plan - Monthly",
  membershipStartDate?: string,
  membershipEndDate?: string,
  image: string,
  messageType: "text" | "voice"
}

export interface Styles {
  backgroundStyles: string,
  buttonStyles: string
}

export interface UsersUpdatableProps {
  image: string,
  question: string
}

export interface MessagesType {
  id: string,
  status?: string,
  timestamp?: string,
  text_message: string | null,
  type?: string,
  voice_message_url?: string | null,
  userId?: string,
  hints?:string
}

export interface pageProps {
  params: { user: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export interface userAnalytics {
  id: string,
  page_views?: string,
  page_clicks?: string,
  responses?: string,
  spam?: string,
  userId: string
}

// [key: string]: string -> for all string type