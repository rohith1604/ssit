import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigation } from './navigation'
import { DataProvider } from './context/DataContext'
import { useCustomFonts } from './config/fonts'
import { Loading } from './components/Loding'

export default function App() {
  const fontsLoaded = useCustomFonts()

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
      <SafeAreaProvider>
          <DataProvider>
            <Navigation />
          </DataProvider>
      </SafeAreaProvider>
  )
}

