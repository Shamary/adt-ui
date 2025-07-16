"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { DatePicker, Button, Select } from "antd"; // Import Select for dropdown
import { PackageStatus } from "@/common/constants";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiClient from "@/utils/apiClient";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import { useAuthStore } from "@/stores/authStore";

const { Option } = Select; // Destructure Option from Select

// Define columns for all users (non-admin)
const defaultColumns = [
  { name: "Tracking Number", selector: (row: any) => row.trackingNumber, sortable: true },
  { name: "Description", selector: (row: any) => row.description, sortable: true },
  { name: "Weight (lb)", selector: (row: any) => row.weight, sortable: true },
  { name: "Shipper", selector: (row: any) => row.shipper, sortable: true },
  { name: "House Number", selector: (row: any) => row.houseNumber, sortable: true },
  {
    name: "Date Received",
    selector: (row: any) => dayjs(row.dateReceived).format("MMM D, YYYY h:mm A"),
    sortable: true
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
    cell: (row: any) => (
      <span className={`px-2 py-1 rounded ${row.status === PackageStatus.DELIVERED ? 'bg-green-500' :
        row.status === PackageStatus.IN_TRANSIT ? 'bg-blue-500' :
          'bg-gray-500'
        }`}>
        {row.status}
      </span>
    )
  },
];

const PackageList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [showAll, setShowAll] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  const { isAdmin } = useAuthStore();

  // useEffect(() => {
  //   // Check user role on component mount
  //   const accessToken = Cookies.get("access_token");
  //   if (accessToken) {
  //     try {
  //       const decodedToken: any = jwtDecode(accessToken);
  //       if (decodedToken.realm_access?.roles.includes("ADMIN")) {
  //         setIsAdmin(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to decode access token:", error);
  //     }
  //   }
  //   fetchPackages();
  // }, [dateFilter, isAdmin]); // Re-fetch if isAdmin changes

  useEffect(() => {
    fetchPackages();
  }, [dateFilter]); // Re-fetch if isAdmin changes

  const fetchPackages = async () => {
    try {
      setLoading(true);
      let response;
      if (isAdmin) {
        response = await apiClient("/api/package/all");
      } else {
        const houseno = Cookies.get("houseno");
        if (!houseno) {
          throw new Error("House number not found in cookies");
        }
        // Only include date parameter if we're not showing all AND dateFilter exists
        const dateParam = !showAll && dateFilter
          ? `&date=${dateFilter.format("YYYY-MM-DD")}`
          : '';
        response = await apiClient(`/api/package?houseno=${houseno}${dateParam}`);
      }

      if (!response.ok) {
        toast.error("Failed to get packages");
      }

      const data = await response.json();
      setPackages(data || []);
    } catch (error) {
      toast.error("Failed to get packages");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDateFilter(date);
      setShowAll(false);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setDateFilter(null);
  };

  const handleStatusUpdate = async (packageTrackingNumber: string, newStatus: PackageStatus) => {
    try {
      const response = await apiClient(`/api/package`, { // The endpoint is /api/package for PUT requests
        method: "PUT",
        body: JSON.stringify({ trackingNumber: packageTrackingNumber, status: newStatus }), // Send trackingNumber and status
      });

      if (!response.ok) {
        toast.error("Failed to update package status");
      } else {
        toast.success("Package status updated successfully!");
        fetchPackages(); // Re-fetch packages to update the table
      }
    } catch (error) {
      toast.error("Failed to update package status");
    }
  };

  // Admin-specific columns with action dropdown
  const adminColumns = [
    ...defaultColumns,
    {
      name: "Actions",
      cell: (row: any) => (
        <Select
          defaultValue={row.status}
          style={{ width: 200 }}
          onChange={(value: PackageStatus) => handleStatusUpdate(row.trackingNumber, value)} // Pass row.trackingNumber
        >
          {Object.values(PackageStatus).map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      ),
      ignoreRowClick: true, // Prevents row click from interfering with dropdown
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredData = packages.filter((pkg: any) => {
    const matchesSearch = search
      ? Object.values(pkg).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
      : true;

    const matchesStatus = statusFilter
      ? pkg.status === statusFilter
      : true;

    // Apply date filter only if not showing all and dateFilter is set
    const matchesDate = showAll || !dateFilter
      ? true
      : dayjs(pkg.dateReceived).isSame(dateFilter, 'day');

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen mt-52">
      <h1 className="text-2xl font-semibold mb-4">My Packages</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search packages..."
          className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
          value={search}
          onChange={handleSearch}
        />
        <select
          className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="">All Status</option>
          {Object.values(PackageStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <DatePicker
          className="p-2 bg-gray-800 border border-gray-700 rounded w-40"
          value={showAll ? null : dateFilter}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          allowClear={false}
          disabled={showAll}
        />
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={toggleShowAll}
        >
          {showAll ? "Show Date Filter" : "Show All Packages"}
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={isAdmin ? adminColumns : defaultColumns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
        noDataComponent={
          <p className="py-6 text-gray-400">
            {loading ? "Loading packages..." : "No packages found for you"}
          </p>
        }
        customStyles={{
          headCells: {
            style: { backgroundColor: "#1E1E1E", color: "white" },
          },
          cells: {
            style: { backgroundColor: "#292929", color: "white" },
          },
        }}
      />
    </div>
  );
};

export default PackageList;