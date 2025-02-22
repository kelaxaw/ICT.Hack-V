export interface ICategory {
  _id: string
  name: string
}

export interface ICreator {
  _id: string
  email: string
  roles: any[]
  skills: any[]
  favorite: any[]
  userRole: string
  username: string
}

export interface IProject {
  _id: string
  name: string
  category: ICategory
  tags: string[]
  shortDescription: string
  longDescription: string
  investments: number
  webSite: string
  logoUrl: string
  coverUrl: string
  presentationUrl: string
  screenShotsUrl: string[]
  teamMembers: string[]
  moderated: boolean
  creator: ICreator
  demoUrl: string
  region: string
  walletAddress: string
  trendIndex: number
}

export interface ISignUpLogin {
  email: string
  password: string
}

export interface Country {
  _id: string
  name: string
}

export interface Location {
  country: Country
  city: string
}

export interface Socials {
  twitter: string
  telegram: string
  github: string
  linkedin: string
}

export interface Role {
  _id: string
  name: string
}

export interface IUser {
  location: Location
  socials: Socials
  _id: string
  email: string
  roles: Role[]
  skills: string[]
  favorite: any[]
  userRole: string
  username: string
  bio: string
  cvUrl: string
  firstName: string
  secondName: string
  avatarUrl: string
  coverUrl: string
}
