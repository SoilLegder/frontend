import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTheme } from '../../context/ThemeContext';

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

export default function MapComponentNoDrawing({ projects, loading }) {
  const { theme } = useTheme();
  const [mapLayer, setMapLayer] = useState(null);

  useEffect(() => {
    // Ensure Leaflet markers have the correct icon
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/icons/marker-icon-2x.png',
      iconUrl: '/icons/marker-icon.png',
      shadowUrl: '/icons/marker-shadow.png',
    });
    
    // Apply custom styles to map based on theme
    if (mapLayer) {
      const container = mapLayer.getContainer();
      if (container) {
        if (theme === 'dark') {
          container.style.filter = 'invert(92%) hue-rotate(180deg) brightness(95%) contrast(85%)';
        } else {
          container.style.filter = 'none';
        }
      }
    }
  }, [mapLayer, theme]);

  if (loading) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 dark:border-green-500"></div>
      </div>
    );
  }

  // Default to US center if no projects
  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
      whenCreated={setMapLayer}
      className="rounded-md overflow-hidden"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        
        {projects && projects.map((project) => (
          <Marker 
            key={project.id} 
            position={project.coordinates} 
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-sm dark:bg-gray-800 dark:text-white p-2 rounded">
                <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.location}</p>
                <p className="text-gray-700 dark:text-gray-300">Area: {project.area}</p>
                <p className="text-gray-700 dark:text-gray-300">Carbon: {project.carbon}</p>
                <p className="text-gray-700 dark:text-gray-300">Status: {project.status}</p>
                <a 
                  href={`/projects/${project.id}`} 
                  className="mt-2 block text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </LayersControl>
    </MapContainer>
  );
} 