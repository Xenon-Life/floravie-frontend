import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Select,
  Button,
  Card,
  Checkbox,
  Slider,
  Tag,
  Spin,
  Empty,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import ClinicMap from "./ClinicMap";
import "./clinicLocator.css";

const { Search } = Input;

const apiBase = () => import.meta.env.VITE_BACKEND_URL || "";

const INITIAL_FILTERS = {
  searchQuery: "",
  city: null,
  specialty: null,
  insurance: null,
  openNow: false,
  telehealth: false,
  wheelchair: false,
  minRating: 0,
  maxDistance: 50,
  userLocation: null,
};

function ClinicLocator({ embedded = false }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(INITIAL_FILTERS.searchQuery);
  const [city, setCity] = useState(INITIAL_FILTERS.city);
  const [specialty, setSpecialty] = useState(INITIAL_FILTERS.specialty);
  const [insurance, setInsurance] = useState(INITIAL_FILTERS.insurance);
  const [openNow, setOpenNow] = useState(INITIAL_FILTERS.openNow);
  const [telehealth, setTelehealth] = useState(INITIAL_FILTERS.telehealth);
  const [wheelchair, setWheelchair] = useState(INITIAL_FILTERS.wheelchair);
  const [minRating, setMinRating] = useState(INITIAL_FILTERS.minRating);
  const [maxDistance, setMaxDistance] = useState(INITIAL_FILTERS.maxDistance);
  const [userLocation, setUserLocation] = useState(
    INITIAL_FILTERS.userLocation
  );
  const [selectedId, setSelectedId] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [totalInDb, setTotalInDb] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    specialties: [],
    insurances: [],
    cities: [],
  });

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await axios.get(`${apiBase()}/clinics/filters`);
        setFilterOptions({
          specialties: res.data.specialties || [],
          insurances: res.data.insurances || [],
          cities: res.data.cities || [],
        });
        setTotalInDb(res.data.totalClinics ?? null);
        setDataSource(res.data.source ?? null);
      } catch {
        setFilterOptions({
          specialties: [
            "Women's Health",
            "OB/GYN",
            "Pediatrics",
            "Mental Health",
            "Dental",
            "Cardiology",
          ],
          insurances: ["OHIP", "Sun Life", "Manulife", "Blue Cross"],
          cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
        });
      }
    };
    loadFilters();
  }, []);

  const buildSearchParams = useCallback(
    (overrides = {}) => {
      const q = overrides.searchQuery ?? searchQuery;
      const cityVal = overrides.city ?? city;
      const specialtyVal = overrides.specialty ?? specialty;
      const insuranceVal = overrides.insurance ?? insurance;
      const openNowVal = overrides.openNow ?? openNow;
      const telehealthVal = overrides.telehealth ?? telehealth;
      const wheelchairVal = overrides.wheelchair ?? wheelchair;
      const minRatingVal = overrides.minRating ?? minRating;
      const maxDistanceVal = overrides.maxDistance ?? maxDistance;
      const locationVal = overrides.userLocation ?? userLocation;

      const params = {};
      const trimmed = q.trim();
      if (trimmed) params.q = trimmed;
      if (cityVal) params.city = cityVal;
      if (specialtyVal) params.specialty = specialtyVal;
      if (insuranceVal) params.insurance = insuranceVal;
      if (openNowVal) params.openNow = "true";
      if (telehealthVal) params.telehealth = "true";
      if (wheelchairVal) params.wheelchair = "true";
      if (minRatingVal > 0) params.minRating = String(minRatingVal);
      if (locationVal) {
        params.lat = String(locationVal.lat);
        params.lng = String(locationVal.lng);
        params.maxDistance = String(maxDistanceVal);
      }
      return params;
    },
    [
      searchQuery,
      city,
      specialty,
      insurance,
      openNow,
      telehealth,
      wheelchair,
      minRating,
      maxDistance,
      userLocation,
    ]
  );

  const fetchClinics = useCallback(
    async (overrides = {}) => {
    setLoading(true);
    try {
      const params = buildSearchParams(overrides);

      const res = await axios.get(`${apiBase()}/clinics`, { params });
      setClinics(res.data.clinics || []);
      setDataSource(res.data.source ?? null);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      toast.error("Could not load clinics. Check that the backend is running.");
      setClinics([]);
    } finally {
      setLoading(false);
    }
  },
    [buildSearchParams]
  );

  useEffect(() => {
    fetchClinics();
  }, [fetchClinics]);

  const resetFilters = () => {
    setSearchQuery(INITIAL_FILTERS.searchQuery);
    setCity(INITIAL_FILTERS.city);
    setSpecialty(INITIAL_FILTERS.specialty);
    setInsurance(INITIAL_FILTERS.insurance);
    setOpenNow(INITIAL_FILTERS.openNow);
    setTelehealth(INITIAL_FILTERS.telehealth);
    setWheelchair(INITIAL_FILTERS.wheelchair);
    setMinRating(INITIAL_FILTERS.minRating);
    setMaxDistance(INITIAL_FILTERS.maxDistance);
    setUserLocation(INITIAL_FILTERS.userLocation);
    setSelectedId(null);
    fetchClinics(INITIAL_FILTERS);
    toast.info("Filters reset — showing all clinics.");
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        toast.success("Using your location for distance sorting.");
      },
      () => toast.error("Could not get your location.")
    );
  };

  const directionsUrl = (clinic) => {
    const dest = encodeURIComponent(
      `${clinic.address}, ${clinic.city}, ${clinic.province} ${clinic.postalCode}`
    );
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
  };

  return (
    <>
      <ToastContainer position="top-right" />
      {!embedded && (
        <div className="hero-section-color md:mb-6">
          <NavBar />
          <div className="w-11/12 m-auto pb-12 md:pb-8">
            <p className="mb-2 red-text md:text-center">Find care near you</p>
            <h2 className="text-5xl font-bold leading-snug primary-color md:text-3xl md:text-center">
              Clinic Locator
            </h2>
            <p className="mt-3 md:text-center text-base max-w-2xl">
              Search by city, postal code, address, or clinic name. Filter by
              specialty, insurance, hours, and more — then explore results on the
              map.
            </p>
          </div>
        </div>
      )}

      <div
        className={
          embedded ? "w-full py-2" : "services-page-bg py-12 w-full"
        }
      >
        <div className={embedded ? "w-full" : "w-11/12 m-auto"}>
          {embedded && (
            <p className="text-sm text-gray-600 mb-4">
              Search by city, postal code, address, or clinic name. Results
              appear on the map.
            </p>
          )}
          {totalInDb != null && (
            <p className="text-sm text-gray-500 mb-3">
              {totalInDb} clinic{totalInDb !== 1 ? "s" : ""} loaded from{" "}
              {dataSource === "database" ? "your database (seeded)" : "built-in seed data"}.
              {filterOptions.cities.length > 0 && (
                <>
                  {" "}
                  Try searching:{" "}
                  {filterOptions.cities.slice(0, 5).join(", ")}
                  {filterOptions.cities.length > 5 ? "…" : ""}.
                </>
              )}
            </p>
          )}
          <Card className="mb-6 shadow-sm">
            <Search
              placeholder="e.g. Toronto, M5H, Queen St, Floravie"
              allowClear
              size="large"
              enterButton={
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={fetchClinics}
              style={{ marginBottom: 16 }}
            />

            <div className="flex flex-wrap gap-3 mb-4">
              <Select
                placeholder="City"
                allowClear
                style={{ minWidth: 160 }}
                value={city}
                onChange={setCity}
                options={filterOptions.cities.map((c) => ({
                  label: c,
                  value: c,
                }))}
              />
              <Select
                placeholder="Specialty"
                allowClear
                style={{ minWidth: 180 }}
                value={specialty}
                onChange={setSpecialty}
                options={filterOptions.specialties.map((s) => ({
                  label: s,
                  value: s,
                }))}
              />
              <Select
                placeholder="Insurance accepted"
                allowClear
                style={{ minWidth: 180 }}
                value={insurance}
                onChange={setInsurance}
                options={filterOptions.insurances.map((i) => ({
                  label: i,
                  value: i,
                }))}
              />
              <Button
                icon={<EnvironmentOutlined />}
                onClick={useMyLocation}
                style={{ borderColor: "#8E5BA6", color: "#8E5BA6" }}
              >
                Use my location
              </Button>
              <Button
                type="primary"
                onClick={() => fetchClinics()}
                style={{ background: "#8E5BA6" }}
              >
                Apply filters
              </Button>
              <Button icon={<ReloadOutlined />} onClick={resetFilters}>
                Reset filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <Checkbox checked={openNow} onChange={(e) => setOpenNow(e.target.checked)}>
                Open now
              </Checkbox>
              <Checkbox
                checked={telehealth}
                onChange={(e) => setTelehealth(e.target.checked)}
              >
                Telehealth available
              </Checkbox>
              <Checkbox
                checked={wheelchair}
                onChange={(e) => setWheelchair(e.target.checked)}
              >
                Wheelchair accessible
              </Checkbox>
              <div className="flex items-center gap-2 min-w-[200px]">
                <span className="text-sm whitespace-nowrap">Min rating:</span>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={setMinRating}
                  style={{ width: 120 }}
                />
                <span className="text-sm">{minRating || "Any"}</span>
              </div>
              {userLocation && (
                <div className="flex items-center gap-2 min-w-[220px]">
                  <span className="text-sm whitespace-nowrap">Max distance (km):</span>
                  <Slider
                    min={5}
                    max={200}
                    step={5}
                    value={maxDistance}
                    onChange={setMaxDistance}
                    style={{ width: 140 }}
                  />
                  <span className="text-sm">{maxDistance} km</span>
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-6 md:flex-col">
            <div className="w-5/12 md:w-full">
              <h3 className="text-lg font-semibold primary-color mb-3">
                {loading ? "Searching…" : `${clinics.length} clinic${clinics.length !== 1 ? "s" : ""} found`}
              </h3>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Spin size="large" />
                </div>
              ) : clinics.length === 0 ? (
                <Empty description="No clinics match your search" />
              ) : (
                <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
                  {clinics.map((clinic) => (
                    <Card
                      key={String(clinic._id)}
                      size="small"
                      className={`clinic-list-card ${
                        String(selectedId) === String(clinic._id) ? "active" : ""
                      }`}
                      onClick={() => setSelectedId(clinic._id)}
                    >
                      <div className="font-semibold text-[#8e5ba6]">{clinic.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {clinic.address}, {clinic.city}, {clinic.province}{" "}
                        {clinic.postalCode}
                      </div>
                      <div className="text-sm mt-1">{clinic.phone}</div>
                      <div className="text-sm text-gray-500">{clinic.hoursSummary}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {clinic.openNow && <Tag color="green">Open now</Tag>}
                        {clinic.telehealthAvailable && (
                          <Tag color="purple">Telehealth</Tag>
                        )}
                        {clinic.wheelchairAccessible && (
                          <Tag>Accessible</Tag>
                        )}
                        <Tag>★ {clinic.rating}</Tag>
                        {clinic.distanceKm != null && (
                          <Tag>{clinic.distanceKm} km away</Tag>
                        )}
                      </div>
                      <Button
                        type="link"
                        size="small"
                        className="p-0 mt-1"
                        href={directionsUrl(clinic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Get directions →
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="w-7/12 md:w-full">
              {!loading && clinics.length > 0 && (
                <ClinicMap
                  clinics={clinics}
                  selectedId={selectedId}
                  onSelectClinic={setSelectedId}
                />
              )}
              {!loading && clinics.length === 0 && (
                <div
                  className="clinic-locator-map flex items-center justify-center bg-gray-100 rounded-xl"
                  style={{ height: 520 }}
                >
                  <Empty description="Map will appear when clinics are found" />
                </div>
              )}
              {loading && (
                <div
                  className="clinic-locator-map flex items-center justify-center bg-gray-50 rounded-xl"
                  style={{ height: 520 }}
                >
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!embedded && <Footer />}
    </>
  );
}

export default ClinicLocator;
