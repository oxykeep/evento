import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import Button from "../components/UI/Button";
import carpetImage from "../assets/carpet2.jpg";
import EventsList from "../components/Events/EventsList";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const PREFERENCES_STORAGE_KEY = "userEventPreferences";

/**
 * HomePage component displays upcoming events with filtering options.
 * It fetches user preferences, user categories, events, locations, and categories from backend,
 * and manages filter states including location, date range, and category.
 */
const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [welcomeMessage, setWelcomeMessage] = useState("Odkrywaj nadchodzące wydarzenia");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    location: "",
    date_from: "",
    date_to: "",
    category_id: ""
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const [userCategories, setUserCategories] = useState([]);

  const [userPreferences, setUserPreferences] = useState({});

  /**
   * Load user preferences from localStorage on component mount.
   */
  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)) || {};
    setUserPreferences(savedPrefs);
  }, []);

  /**
   * Convert user preferences to a list of category IDs (as strings).
   */
  const userCategoriesFromPrefs = Object.entries(userPreferences)
    .filter(([catId, enabled]) => enabled)
    .map(([catId]) => catId);

  /**
   * If no category filter is set, initialize it from user preferences.
   */
  useEffect(() => {
    if (!filters.category_id && userCategoriesFromPrefs.length > 0) {
      setFilters(prev => ({ ...prev, category_id: userCategoriesFromPrefs.join(",") }));
    }
  }, [userCategoriesFromPrefs]);

  /**
   * Format date value for display in input placeholders (dd.mm.yyyy).
   * @param {string} value - Date string in ISO format (yyyy-mm-dd).
   * @returns {string} Formatted date string.
   */
  const formatDateDisplay = (value) => {
    if (!value) return "";
    const [yyyy, mm, dd] = value.split("-");
    return `Data ${value === filters.date_from ? "od" : "do"}: ${dd}.${mm}.${yyyy}`;
  };

  /**
   * Format date value for input field display (dd.mm.yyyy).
   * @param {string} value - Date string in ISO format (yyyy-mm-dd).
   * @returns {string} Formatted date string.
   */
  const formatDate = (value) => {
    if (!value) return "";
    const [yyyy, mm, dd] = value.split("-");
    return `${dd}.${mm}.${yyyy}`;
  };

  /**
   * Fetch user categories from backend if authenticated.
   */
  const fetchUserCategories = async () => {
    if (!isAuthenticated) {
      setUserCategories([]);
      return;
    }

    try {
      const res = await fetch("/routes/api/user_categories.php");
      if (!res.ok) throw new Error("Failed to fetch user categories");
      const data = await res.json();
      setUserCategories(data.map(cat => cat.id.toString()));
    } catch (err) {
      console.error("Error fetching user categories:", err);
      setUserCategories([]);
    }
  };

  /**
   * Fetch events from backend with applied filters.
   * If authenticated and no category filter set manually, uses user categories.
   */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      let categoryFilter = filters.category_id;
      if (isAuthenticated && !categoryFilter && userCategories.length > 0) {
        categoryFilter = userCategories.join(",");
      }

      const paramsObj = {
        ...filters,
        category_id: categoryFilter,
        date_from: filters.date_from || "",
        date_to: filters.date_to || ""
      };
      const params = new URLSearchParams(paramsObj);
      const response = await fetch(`/routes/api/events.php?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("An error occurred while loading events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCategories();
  }, [isAuthenticated]);

  useEffect(() => {
    fetchEvents();
  }, [filters, userCategories]);

  /**
   * Fetch available locations and categories from backend.
   */
  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("/routes/api/locations.php");
      const data = await res.json();
      setLocations(data);
    };

    const fetchCategories = async () => {
      const res = await fetch("/routes/api/categories.php");
      const data = await res.json();
      setCategories(data);
    };

    fetchLocations();
    fetchCategories();
  }, []);

  /**
   * Handle changes in filter inputs.
   * @param {object} e - Input change event.
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * On focus, switch date input type to "date" and set value.
   * @param {object} e - Input focus event.
   */
  const handleDateFocus = (e) => {
    e.target.type = "date";
    const name = e.target.name;
    if (filters[name]) {
      e.target.value = filters[name];
    }
  };

  /**
   * On blur, switch date input type to "text" and format value for display.
   * @param {object} e - Input blur event.
   */
  const handleDateBlur = (e) => {
    const name = e.target.name;
    if (!e.target.value) {
      e.target.type = "text";
      setFilters((prev) => ({
        ...prev,
        [name]: ""
      }));
    } else {
      e.target.type = "text";
      e.target.value = `Data ${name === "date_from" ? "od" : "do"}: ${formatDate(filters[name])}`;
    }
  };

  /**
   * Clear all filter inputs.
   */
  const clearFilters = () => {
    setFilters({
      location: "",
      date_from: "",
      date_to: "",
      category_id: ""
    });
  };

  return (
    <div className="text-center py-12">
      <div className="main-image">
        <img src={carpetImage} alt="carpet" className="main-image__img" />
      </div>

      <div className="title-smaller flex flex-col items-center justify-center mt-8 mb-8">
        <p className="title-smaller-text text-xl font-medium mb-2">{welcomeMessage}</p>
      </div>

      <div className="homepage-arrow">
        <FiChevronDown className="text-2xl animate-bounce text-gray-600" />
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <form className="flex-form items-start gap-4">
          <button
            type="button"
            onClick={() => setFiltersVisible((prev) => !prev)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition h-fit"
          >
            {filtersVisible ? "Ukryj filtry" : "Pokaż filtry"}
          </button>

          {filtersVisible && (
            <>
              <div className="fields-container">
                <input
                  list="location-list"
                  name="location"
                  id="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Miasto lub lokalizacja"
                />
                <datalist id="location-list">
                  {locations.map((loc, i) => (
                    <option key={i} value={loc} />
                  ))}
                </datalist>
              </div>

              <div>
                <input
                  type="text"
                  name="date_from"
                  id="date_from"
                  onChange={handleFilterChange}
                  placeholder="Data od: wybierz"
                  onFocus={handleDateFocus}
                  onBlur={handleDateBlur}
                  defaultValue={
                    filters.date_from
                      ? `Data od: ${formatDate(filters.date_from)}`
                      : ""
                  }
                />
              </div>

              <div>
                <input
                  type="text"
                  name="date_to"
                  id="date_to"
                  onChange={handleFilterChange}
                  placeholder="Data do: wybierz"
                  onFocus={handleDateFocus}
                  onBlur={handleDateBlur}
                  defaultValue={
                    filters.date_to
                      ? `Data do: ${formatDate(filters.date_to)}`
                      : ""
                  }
                />
              </div>

              <div>
                <select
                  name="category_id"
                  id="category_id"
                  value={filters.category_id}
                  onChange={handleFilterChange}
                >
                  <option value="">Wybierz kategorię</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition h-fit"
              >
                Wyczyść
              </button>
            </>
          )}
        </form>
      </div>

      <section className="mb-12 mt-12">
        <h2 className="text-2xl font-bold mb-6">Najbliższe wydarzenia</h2>
        {loading && <p>Ładowanie wydarzeń...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <EventsList events={events} />}
      </section>

      <div className="container mx-auto px-4 py-8">
        {isAuthenticated && (
          <div className="add-event-btn">
            <Button onClick={() => navigate("/add-event")} className="bg-green-600 text-white">
              + Dodaj nowe wydarzenie
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
