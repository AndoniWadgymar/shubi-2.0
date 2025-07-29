import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const DashboardPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    // Dummy sales data by location and month
    setSalesData([
      {
        month: "Jan",
        BLK: 4000,
        BLD: 2400,
        BUN: 2400,
      },
      {
        month: "Feb",
        BLK: 3000,
        BLD: 1398,
        BUN: 2210,
      },
      {
        month: "Mar",
        BLK: 2000,
        BLD: 9800,
        BUN: 2290,
      },
    ]);

    // Dummy client data by location
    setClientsData([
      { location: "BLK", clients: 300 },
      { location: "BLD", clients: 250 },
      { location: "BUN", clients: 180 },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Dashboard</h2>

      <div className="mb-5">
        <h4 className="fw-bold mb-3">Sales by Location and Month</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={salesData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="BLK" stackId="a" fill="#FDCEDF" />
            <Bar dataKey="BLD" stackId="a" fill="#F2BED1" />
            <Bar dataKey="BUN" stackId="a" fill="#F8E8EE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 className="fw-bold mb-3">Locations with Most Clients</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={clientsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clients" fill="#FDCEDF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
