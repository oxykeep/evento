// src/pages/UserProfilePage.jsx
import { useAuth } from "../context/AuthContext";
import Button from "../components/UI/Button";
import { useState } from "react";

// user profile page with account info and preferences
const UserProfilePage = () => {
  // get user data and logout function from auth context
  const { userData, logout } = useAuth();

  // state for user's event preferences
  const [preferences, setPreferences] = useState({
    music: true,
    sports: false,
    food: true,
    technology: true,
    art: false,
  });

  // handle preference checkbox changes
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* main profile card */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* profile header with blue background */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Twoje konto</h1>{" "}
          {/* "Your account" */}
          <p className="opacity-90">
            Zarządzaj swoim profilem i preferencjami
          </p>{" "}
          {/* "Manage your profile and preferences" */}
        </div>

        {/* basic info section */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Informacje podstawowe</h2>{" "}
          {/* "Basic information" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Imię i nazwisko</p>{" "}
              {/* "Full name" */}
              <p className="font-medium">
                {userData?.name || "Nie ustawiono"}
              </p>{" "}
              {/* "Not set" */}
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">
                {userData?.email || "Nie ustawiono"} {/* "Not set" */}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Data dołączenia</p>{" "}
              {/* "Join date" */}
              <p className="font-medium">
                {new Date(userData?.joinDate || Date.now()).toLocaleDateString(
                  "pl-PL" // Polish date format
                )}
              </p>
            </div>
          </div>
        </div>

        {/* event preferences section */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Preferencje wydarzeń</h2>{" "}
          {/* "Event preferences" */}
          <p className="text-gray-600 mb-4">
            Zaznacz kategorie wydarzeń, które Cię interesują:{" "}
            {/* "Select event categories you're interested in:" */}
          </p>
          {/* preference checkboxes grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(preferences).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handlePreferenceChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="capitalize">{key}</span> {/* category name */}
              </label>
            ))}
          </div>
        </div>

        {/* action buttons section */}
        <div className="p-6 flex flex-col sm:flex-row justify-end gap-4">
          <Button
            onClick={() => console.log("Zapisano zmiany")} // "Changes saved"
            className="bg-green-600 text-white"
          >
            Zapisz zmiany {/* "Save changes" */}
          </Button>
          <Button onClick={logout} className="bg-red-600 text-white">
            Wyloguj się {/* "Log out" */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
