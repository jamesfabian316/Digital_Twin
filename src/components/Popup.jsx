import { useState, useRef, useEffect } from "react";
import "./Popup.css";

export default function Popup({
  position,
  screenPosition,
  onClose,
  onAddDatastream,
}) {
  const [formData, setFormData] = useState({
    sensorType: "",
    endPoint: "",
    port: "", // seconds
    unit: "",
    description: "",
  });

  const containerRef = useRef(null);

  // Adjust position to keep popup on screen
  const [adjustedStyle, setAdjustedStyle] = useState({ visibility: "hidden" });

  useEffect(() => {
    if (screenPosition && containerRef.current) {
      const { x, y } = screenPosition;
      const { offsetWidth, offsetHeight } = containerRef.current;
      const padding = 20;

      let left = x + 10;
      let top = y + 10;

      // Check right edge
      if (left + offsetWidth > window.innerWidth - padding) {
        left = x - offsetWidth - 10;
      }

      // Check bottom edge
      if (top + offsetHeight > window.innerHeight - padding) {
        top = y - offsetHeight - 10;
      }

      // Check left edge (if flipped)
      if (left < padding) {
        left = padding;
      }

      // Check top edge (if flipped)
      if (top < padding) {
        top = padding;
      }

      const newStyle = {
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        margin: 0,
        transform: "none",
        visibility: "visible",
      };

      const raf = requestAnimationFrame(() => {
        setAdjustedStyle(newStyle);
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [screenPosition]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDatastream = () => {
    if (!formData.sensorType || !formData.endPoint) {
      alert("Please fill in required fields (Data Source and Datastream Name)");
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
      endPoint: "",
      port: "",
      unit: "",
      description: "",
    });

    onClose();
  };

  const dataSources = [
    "OPC UA",
    "SQL",
    "WebSocket",
    "REST API",
    "MQTT",
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
      <div
        ref={containerRef}
        className="popup-container"
        style={screenPosition ? adjustedStyle : {}}
        onClick={(e) => e.stopPropagation()}
      >
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
            <label htmlFor="sensorType">Data Source *</label>
            <select
              id="sensorType"
              name="sensorType"
              value={formData.sensorType}
              onChange={handleInputChange}
            >
              <option value="">Select a Data Source</option>
              {dataSources.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="endPoint">Endpoint *</label>
            <input
              id="endPoint"
              type="text"
              name="endPoint"
              value={formData.endPoint}
              onChange={handleInputChange}
              placeholder="e.g., Building_A_Temperature_Sensor_1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="port">Port</label>
            <input
              id="port"
              type="text"
              name="port"
              value={formData.port}
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
