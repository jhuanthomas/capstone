import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import HRDashboard from './pages/HRDashboard'
import AccessManagement from './pages/AccessManagement'

type ViewType = 'employee-dashboard' | 'hr-dashboard' | 'access-management'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('employee-dashboard')
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string>('')

  useEffect(() => {
    requestUserLocation()
  }, [])

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        setLocationError(`Location error: ${error.message}`)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">HR System</h1>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentView('employee-dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === 'employee-dashboard'
                ? 'bg-blue-500'
                : 'hover:bg-blue-500'
            }`}
          >
            Employee Dashboard
          </button>
          <button
            onClick={() => setCurrentView('hr-dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === 'hr-dashboard' ? 'bg-blue-500' : 'hover:bg-blue-500'
            }`}
          >
            HR Dashboard
          </button>
          <button
            onClick={() => setCurrentView('access-management')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentView === 'access-management'
                ? 'bg-blue-500'
                : 'hover:bg-blue-500'
            }`}
          >
            Access Management
          </button>
        </nav>
        <div className="p-4 border-t border-blue-500 mt-8">
          {location ? (
            <div className="bg-blue-500 rounded-lg p-4 text-xs">
              <p className="font-semibold mb-2">📍 Location Detected</p>
              <p>Lat: {location.lat.toFixed(4)}</p>
              <p>Lon: {location.lon.toFixed(4)}</p>
            </div>
          ) : locationError ? (
            <div className="bg-red-500 rounded-lg p-4 text-xs">
              <p className="font-semibold">Error</p>
              <p>{locationError}</p>
            </div>
          ) : (
            <div className="bg-blue-500 rounded-lg p-4 text-xs animate-pulse">
              <p>Getting location...</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white">
        {currentView === 'employee-dashboard' && <Dashboard />}
        {currentView === 'hr-dashboard' && <HRDashboard />}
        {currentView === 'access-management' && <AccessManagement />}
      </div>
    </div>
  )
}

export default App
