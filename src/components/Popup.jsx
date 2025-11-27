import React, { useState } from "react";
import "./Popup.css";

export default function Popup({ position, onClose, onAddDatastream }) {
  const [formData, setFormData] = useState({
    sensorType: "",
    dataStreamName: "",
    frequency: "60", // seconds
    unit: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDatastream = () => {
    if (!formData.sensorType || !formData.dataStreamName) {
      alert("Please fill in required fields (Sensor Type and Datastream Name)");
      return;
    }

    onAddDatastream({
      ...formData,
      timestamp: new Date().toISOString(),
      location: position,
    });

    // Reset form
    setFormData({
      sensorType: "",
      dataStreamName: "",
      frequency: "60",
      unit: "",
      description: "",
    });

    onClose();
  };

  const sensorTypes = [
    "Temperature",
    "Humidity",
    "Air Quality (PM2.5)",
    "Noise Level",
    "Light Intensity",
    "Occupancy Count",
    "Energy Consumption",
    "Water Usage",
    "CO2 Level",
    "Vibration",
    "Custom",
  ];

  const units = {
    Temperature: "°C",
    Humidity: "%",
    "Air Quality (PM2.5)": "µg/m³",
    "Noise Level": "dB",
    "Light Intensity": "lux",
    "Occupancy Count": "persons",
    "Energy Consumption": "kWh",
    "Water Usage": "m³",
    "CO2 Level": "ppm",
    Vibration: "Hz",
    Custom: "",
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Add Datastream to Building</h3>
          <button className="popup-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="popup-content">
          <div className="location-info">
            <small>
              Building Location: [{position[0].toFixed(2)},{" "}
              {position[1].toFixed(2)}, {position[2].toFixed(2)}]
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="sensorType">Sensor Type *</label>
            <select
              id="sensorType"
              name="sensorType"
              value={formData.sensorType}
              onChange={handleInputChange}
            >
              <option value="">Select a sensor type</option>
              {sensorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dataStreamName">Datastream Name *</label>
            <input
              id="dataStreamName"
              type="text"
              name="dataStreamName"
              value={formData.dataStreamName}
              onChange={handleInputChange}
              placeholder="e.g., Building_A_Temperature_Sensor_1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Sampling Frequency (seconds)</label>
            <input
              id="frequency"
              type="number"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              min="1"
              step="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unit of Measurement</label>
            <input
              id="unit"
              type="text"
              name="unit"
              value={
                formData.unit ||
                (formData.sensorType ? units[formData.sensorType] || "" : "")
              }
              onChange={handleInputChange}
              placeholder="e.g., °C, %, ppm"
              disabled={formData.sensorType && formData.sensorType !== "Custom"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Optional: Additional details about this datastream"
              rows="3"
            />
          </div>
        </div>

        <div className="popup-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-add" onClick={handleAddDatastream}>
            Add Datastream
          </button>
        </div>
      </div>
    </div>
  );
}
