import { useAuth } from "../context/AuthContext";
import Button from "../components/UI/Button";
import { useState, useEffect } from "react";

const PREFERENCES_STORAGE_KEY = "userEventPreferences";

/**
 * UserProfilePage component allows users to view their basic account info,
 * manage event category preferences, and logout.
 */
const UserProfilePage = () => {
  const { userData, logout } = useAuth();

  // State for event categories fetched from API
  const [categories, setCategories] = useState([]);
  // State to track user preferences for event categories
  const [preferences, setPreferences] = useState({});

  /**
   * Fetch event categories from the server and initialize preferences state.
   * If preferences exist in localStorage, use them; otherwise, initialize with false.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/routes/api/categories.php");
        if (!res.ok) throw new Error("Błąd pobierania kategorii");
        const data = await res.json();
        setCategories(data);

        setPreferences((prev) => {
          if (Object.keys(prev).length > 0) return prev;
          const savedPrefs = JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)) || {};
          const prefsFromSaved = {};
          data.forEach((cat) => {
            prefsFromSaved[cat.id] = savedPrefs[cat.id] ?? false;
          });
          return prefsFromSaved;
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  /**
   * Handle checkbox change for preferences.
   * Updates preferences state and syncs changes to localStorage.
   */
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => {
      const updated = { ...prev, [name]: checked };
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Save changes handler (currently logs preferences and shows alert).
   * Could be extended to send preferences to backend if needed.
   */
  const saveChanges = () => {
    console.log("Zapisano zmiany preferencji:", preferences);
    alert("Preferencje zostały zapisane.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Twoje konto</h1>
          <p className="opacity-90">Zarządzaj swoim profilem i preferencjami</p>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Informacje podstawowe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Imię i nazwisko:</label>
              <span className="data-value">{userData?.name || "Nie ustawiono"}</span>
            </div>
            <div>
              <label>Email:</label>
              <span className="data-value">{userData?.email || "Nie ustawiono"}</span>
            </div>
            <div>
              <label>Data dołączenia:</label>
              <span className="data-value">
                {new Date(userData?.joinDate || Date.now()).toLocaleDateString("pl-PL")}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Preferencje wydarzeń</h2>
          <p className="text-gray-600 mb-4">
            Zaznacz kategorie wydarzeń, które Cię interesują:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.length === 0 && <p>Ładowanie kategorii...</p>}
            {categories.map(({ id, name }) => (
              <label key={id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={id}
                  checked={preferences[id] || false}
                  onChange={handlePreferenceChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-gray-800">{name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col sm:flex-row justify-end gap-4">
          <Button onClick={saveChanges} className="bg-green-600 text-white">
            Zapisz zmiany
          </Button>
          <Button onClick={logout} className="bg-red-600 text-white">
            Wyloguj się
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
