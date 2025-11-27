# Right-Click Datastream Popup Feature

## Overview

This feature enables users to right-click on buildings in the 3D city model to add sensory datastreams from real-life counterparts.

## How to Use

### Adding a Datastream

1. **Right-click on any building** in the 3D canvas
2. A popup modal will appear with the building's location coordinates
3. **Fill in the datastream details:**

   - **Sensor Type** (required): Choose from predefined types (Temperature, Humidity, Air Quality, etc.) or Custom
   - **Datastream Name** (required): Unique identifier for the datastream
   - **Sampling Frequency**: How often the sensor reads data (in seconds, default: 60s)
   - **Unit of Measurement**: Automatically populated based on sensor type
   - **Description**: Optional notes about the datastream

4. Click **"Add Datastream"** to save
5. The datastream appears in the **Active Datastreams** panel on the right side

### Managing Datastreams

- **View Active Datastreams**: The right sidebar shows all active datastreams
- **Remove a Datastream**: Click the "Remove" button on any datastream card
- **Track Count**: The header displays the total number of active datastreams

## Available Sensor Types

- Temperature (°C)
- Humidity (%)
- Air Quality - PM2.5 (µg/m³)
- Noise Level (dB)
- Light Intensity (lux)
- Occupancy Count (persons)
- Energy Consumption (kWh)
- Water Usage (m³)
- CO2 Level (ppm)
- Vibration (Hz)
- Custom (user-defined unit)

## Component Structure

### `Popup.jsx`

- Modal form for adding datastreams
- Form validation
- Auto-population of measurement units based on sensor type
- Responsive design for mobile and desktop

### `cityModel.jsx`

- Enhanced with raycasting for right-click detection
- Detects clicks on 3D buildings
- Passes intersection point data to parent component

### `App.jsx`

- State management for popup and datastreams
- Datastream list management
- Integration of all components

## Technical Details

### Raycasting Implementation

- Uses Three.js Raycaster for 3D intersection detection
- Captures right-click events on the canvas
- Converts 2D mouse coordinates to 3D world coordinates using the camera

### Data Structure

Each datastream stores:

```javascript
{
  id: timestamp,
  sensorType: string,
  dataStreamName: string,
  frequency: string (seconds),
  unit: string,
  description: string,
  timestamp: ISO string,
  location: [x, y, z] coordinates
}
```

### Event Handling

- Right-click is prevented from showing browser context menu
- Events are properly stopped to avoid bubbling
- Canvas context menu listener is cleaned up on unmount

## Styling

- **Popup**: Centered modal with fade-in animation
- **Datastreams Panel**: Sticky right sidebar with hover effects
- **Responsive**: Hidden on screens narrower than 1024px (mobile optimization)

## Future Enhancements

- Real-time datastream visualization on the 3D model
- Data export/import functionality
- Integration with backend API for datastream persistence
- Advanced filtering and search for datastreams
- Datastream performance monitoring dashboard
