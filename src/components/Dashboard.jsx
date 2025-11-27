import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import CityModel from '../cityModel'
import Popup from './Popup'
import '../App.css'

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedBuildingLocation, setSelectedBuildingLocation] = useState(null)
  const [popupPosition, setPopupPosition] = useState(null)
  const [datastreams, setDatastreams] = useState([])

  const handleBuildingRightClick = (data) => {
    setSelectedBuildingLocation(data.position)
    setPopupPosition(data.screenPosition)
    setShowPopup(true)
  }

  const handleAddDatastream = (datastreamData) => {
    const newDatastream = {
      id: Date.now(),
      ...datastreamData
    }
    setDatastreams((prev) => [newDatastream, ...prev])
    console.log('Datastream added:', newDatastream)
  }

  return (
    <>
      <div className='header-section'>
        <img
          src='/images/ltts_logo.png'
          alt='L&T Technology Services'
          className='ltts-logo'
        />
        <h2>City Level Digital Reconstruction for Multi Level Analysis</h2>
        <div className='datastream-counter'>
          {datastreams.length} datastream{datastreams.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className='canvas-container'>
        <div className='canvas'>
          <Canvas camera={{ position: [0, 50, 150], fov: 45 }}>
            {/* basic lights */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[50, 100, 50]}
              intensity={0.8}
            />
            {/* fallback while model loads */}
            <Suspense fallback={null}>
              <CityModel onBuildingRightClick={handleBuildingRightClick} />
              {/* optional HDR/sky for nicer lighting (if you want later) */}
              <Environment preset='city' />
            </Suspense>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
            />
          </Canvas>
        </div>

        {/* Datastreams Sidebar */}
        {datastreams.length > 0 && (
          <div className='datastreams-panel'>
            <h3>Active Datastreams</h3>
            <div className='datastreams-list'>
              {datastreams.map((ds) => (
                <div
                  key={ds.id}
                  className='datastream-item'
                >
                  <div className='datastream-name'>{ds.endPoint}</div>
                  <div className='datastream-meta'>
                    <span className='badge'>{ds.sensorType}</span>
                    <span className='frequency'>{ds.frequency}s</span>
                  </div>
                  {ds.description && <div className='datastream-description'>{ds.description}</div>}
                  <button
                    className='btn-remove'
                    onClick={() => setDatastreams((prev) => prev.filter((item) => item.id !== ds.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && selectedBuildingLocation && (
        <Popup
          position={selectedBuildingLocation}
          screenPosition={popupPosition}
          onClose={() => setShowPopup(false)}
          onAddDatastream={handleAddDatastream}
        />
      )}

      <div className='footer'>Made with ❤️, coffee and tears by team Node @LTTS-Chennai</div>
    </>
  )
}

export default Dashboard
