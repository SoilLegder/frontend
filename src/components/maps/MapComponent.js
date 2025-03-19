import { useEffect, useState, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  LayersControl, 
  FeatureGroup,
  Circle
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import * as turf from '@turf/turf';

// Fix Leaflet marker icon issue in Next.js
const defaultIcon = L.icon({
  iconUrl: '/icons/marker-icon.png',
  iconRetinaUrl: '/icons/marker-icon-2x.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons based on project status
const icons = {
  Active: new L.Icon({
    iconUrl: '/icons/marker-green.png',
    iconRetinaUrl: '/icons/marker-green-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Pending: new L.Icon({
    iconUrl: '/icons/marker-yellow.png',
    iconRetinaUrl: '/icons/marker-yellow-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Completed: new L.Icon({
    iconUrl: '/icons/marker-blue.png',
    iconRetinaUrl: '/icons/marker-blue-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  default: new L.Icon({
    iconUrl: '/icons/marker-icon.png',
    iconRetinaUrl: '/icons/marker-icon-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

export default function MapComponent({ projects, loading, onAreaDraw = () => {} }) {
  const [map, setMap] = useState(null);
  const [drawnAreas, setDrawnAreas] = useState([]);
  const featureGroupRef = useRef(null);
  
  // Default to US center if no projects
  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  useEffect(() => {
    if (map) {
      // Add search control (this would require additional setup in a real app)
      // This is just a placeholder - in a real implementation you'd need geocoding
      const searchControl = L.control({position: 'topright'});
      searchControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        div.innerHTML = `
          <input 
            type="text" 
            placeholder="Search location..."
            style="padding: 8px; width: 200px; border: 1px solid #ccc; border-radius: 4px;" 
          />
        `;
        return div;
      };
      searchControl.addTo(map);
      
      // Add legend control
      const legendControl = L.control({position: 'bottomright'});
      legendControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '4px';
        div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
        
        div.innerHTML = `
          <h4 style="margin: 0 0 10px; font-weight: bold;">Project Status</h4>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="width: 12px; height: 12px; background-color: #4CAF50; border-radius: 50%; margin-right: 8px;"></div>
            <span>Active</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="width: 12px; height: 12px; background-color: #FFC107; border-radius: 50%; margin-right: 8px;"></div>
            <span>Pending</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="width: 12px; height: 12px; background-color: #2196F3; border-radius: 50%; margin-right: 8px;"></div>
            <span>Completed</span>
          </div>
        `;
        return div;
      };
      legendControl.addTo(map);
    }
  }, [map]);

  const handleCreated = (e) => {
    const { layerType, layer } = e;
    
    if (layerType === 'polygon' || layerType === 'rectangle') {
      const geoJson = layer.toGeoJSON();
      const area = turf.area(geoJson);
      const areaInAcres = (area / 4046.86).toFixed(2); // Convert m² to acres
      
      const newDrawnArea = {
        id: Date.now(),
        type: layerType,
        area: areaInAcres,
        coordinates: layer.getLatLngs()[0].map(latLng => [latLng.lat, latLng.lng])
      };
      
      setDrawnAreas([...drawnAreas, newDrawnArea]);
      onAreaDraw(newDrawnArea);
      
      // Add a popup to the layer with area information
      layer.bindPopup(`
        <b>${layerType === 'polygon' ? 'Polygon' : 'Rectangle'}</b><br>
        Area: ${areaInAcres} acres
      `).openPopup();
    }
  };

  if (loading) {
    return (
      <div className="h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      style={{ height: '600px', width: '100%' }}
      whenCreated={setMap}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Terrain">
          <TileLayer
            attribution='&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.Overlay checked name="Project Markers">
          <FeatureGroup>
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={project.coordinates} 
                icon={icons[project.status] || icons.default}
              >
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-gray-700">{project.location}</p>
                    <p className="text-gray-700">Area: {project.area}</p>
                    <p className="text-gray-700">Carbon: {project.carbon}</p>
                    <p className="text-gray-700">Status: {project.status}</p>
                    <a 
                      href={`/projects/${project.id}`} 
                      className="mt-2 block text-green-700 hover:text-green-800"
                    >
                      View Details
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
        
        <LayersControl.Overlay name="Project Areas">
          <FeatureGroup>
            {projects.map((project, index) => (
              project.boundary && (
                <Circle 
                  key={`area-${project.id}`}
                  center={project.coordinates}
                  radius={500} // This is just an example - real apps would use actual boundaries
                  pathOptions={{ 
                    fillColor: project.status === 'Active' ? '#4CAF50' : 
                               project.status === 'Pending' ? '#FFC107' : '#2196F3',
                    weight: 2,
                    opacity: 0.7,
                    fillOpacity: 0.4
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-gray-700">Area: {project.area}</p>
                    </div>
                  </Popup>
                </Circle>
              )
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
} 