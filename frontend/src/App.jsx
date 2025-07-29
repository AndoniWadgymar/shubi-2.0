import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CoachesPage from "./pages/CoachesPage";
import LocationsPage from "./pages/LocationsPage";
import { ClassTypesPage } from "./pages/ClassTypePage";
import { TiersPage } from "./pages/TiersPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/class-type" element={<ClassTypesPage />} />
        <Route path="/tiers" element={<TiersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
