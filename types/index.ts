export type User = {
    id: string
    name: string
    email: string
    photoUrl?: string
    age?: number
    gender?: string
  }
  
  export type Spike = {
    id: string
    userId: string
    intensity: number
    hasSpasms: boolean
    symptoms?: string
    weather?: {
      temperature: number
      moonPhase: string
    }
    createdAt: Date
  }
  
  export type Medication = {
    id: string
    userId: string
    isFullTablet: boolean
    timeTaken: Date
    spikeReduction: boolean
    createdAt: Date
  }
  
  export type NavigationParamList = {
    Welcome: undefined
    Login: undefined
    Register: undefined
    ForgotPassword: undefined
    MainTabs: undefined
    LogSpike: undefined
    LogMedication: undefined
    Reports: undefined
    Settings: undefined
    EditProfile: undefined
    FAQ: undefined
  }
  
  export type TabParamList = {
    Home: undefined
    Reports: undefined
    Settings: undefined
  }