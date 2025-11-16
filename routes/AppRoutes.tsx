// routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../src/Pages/Dashboard";
import Appointments from "../src/Pages/Appointments";
import Patients from "../src/Pages/Patients";
import Doctors from "../src/Pages/Doctors";
import Pharmacy from "../src/Pages/Pharmacy";
import Billing from "../src/Pages/Billing";
import Login from "../src/Auth/Login";
import Layout from "../components/Layout";
import Settings from "../src/Pages/Settings";
import React from "react";


import NotFound from "../src/Pages/NotFound";


export default function AppRoutes() {
    
  return (
    <Router>
      <Routes>
   
        <Route path="/login" element={<Login />} />
       

       
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="billing" element={<Billing />} />
          <Route path="Settings" element={<Settings />} />
          
        </Route>

   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
