import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = [43.6532, -79.3832];
const DEFAULT_ZOOM = 6;

function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom ?? map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
}

function directionsUrl(clinic) {
  const dest = encodeURIComponent(
    `${clinic.address}, ${clinic.city}, ${clinic.province} ${clinic.postalCode}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

function ClinicMap({ clinics, selectedId, onSelectClinic }) {
  const center = useMemo(() => {
    if (selectedId) {
      const selected = clinics.find((c) => String(c._id) === String(selectedId));
      if (selected?.lat != null && selected?.lng != null) {
        return [selected.lat, selected.lng];
      }
    }
    if (clinics.length === 1) {
      return [clinics[0].lat, clinics[0].lng];
    }
    if (clinics.length > 0) {
      const avgLat =
        clinics.reduce((s, c) => s + c.lat, 0) / clinics.length;
      const avgLng =
        clinics.reduce((s, c) => s + c.lng, 0) / clinics.length;
      return [avgLat, avgLng];
    }
    return DEFAULT_CENTER;
  }, [clinics, selectedId]);

  const zoom = clinics.length === 1 || selectedId ? 14 : clinics.length < 4 ? 10 : 5;

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="clinic-locator-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapRecenter center={center} zoom={zoom} />
      {clinics.map((clinic) => (
        <Marker
          key={String(clinic._id)}
          position={[clinic.lat, clinic.lng]}
          eventHandlers={{
            click: () => onSelectClinic?.(clinic._id),
          }}
        >
          <Popup>
            <div className="clinic-popup-title">{clinic.name}</div>
            <div className="clinic-popup-meta">
              {clinic.address}, {clinic.city}, {clinic.province}{" "}
              {clinic.postalCode}
            </div>
            <div className="clinic-popup-meta">{clinic.phone}</div>
            <div className="clinic-popup-meta">{clinic.hoursSummary}</div>
            {clinic.openNow && (
              <div className="clinic-popup-meta" style={{ color: "#2e7d32" }}>
                Open now
              </div>
            )}
            <a
              href={directionsUrl(clinic)}
              target="_blank"
              rel="noopener noreferrer"
              className="clinic-popup-directions"
            >
              Directions
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ClinicMap;
