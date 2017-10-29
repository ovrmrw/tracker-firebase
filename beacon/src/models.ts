export interface Namespace {
  res?: TrackerResponse
  topLevelDomain?: string
}

export interface TrackerResponse {
  uid: string
  generated: boolean
}
