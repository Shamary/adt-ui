"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { DatePicker, Button } from "antd";
import { PackageStatus } from "@/common/constants";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiClient from "@/utils/apiClient";

const columns = [
  { name: "Tracking Number", selector: (row) => row.trackingNumber, sortable: true },
  { name: "Description", selector: (row) => row.description, sortable: true },
  { name: "Weight (lb)", selector: (row) => row.weight, sortable: true },
  { name: "Shipper", selector: (row) => row.shipper, sortable: true },
  { name: "House Number", selector: (row) => row.houseNumber, sortable: true },
  {
    name: "Date Received",
    selector: (row) => dayjs(row.dateReceived).format("MMM D, YYYY h:mm A"),
    sortable: true
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
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

  useEffect(() => {
    fetchPackages();
  }, [dateFilter]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const houseno = Cookies.get("houseno");
      if (!houseno) {
        throw new Error("House number not found in cookies");
      }

      // Only include date parameter if we're not showing all AND dateFilter exists
      const dateParam = !showAll && dateFilter
        ? `&date=${dateFilter.format("YYYY-MM-DD")}`
        : '';

      const response = await apiClient(`/api/package?houseno=${houseno}${dateParam}`);

      if (!response.ok) {
        toast.error("Failed to get packages");
      }

      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      toast.error("Failed to get packages");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateChange = (date) => {
    // setDateFilter(date);
    // setShowAll(false); // Switch to date-filtered view when date is selected

    if (date) {
      setDateFilter(date);
      setShowAll(false);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setDateFilter(null);
  };

  const filteredData = packages.filter((pkg) => {
    const matchesSearch = search
      ? Object.values(pkg).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
      : true;

    const matchesStatus = statusFilter
      ? pkg.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
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
          allowClear={false} // Disable the clear button
          disabled={showAll}
          onPanelChange={(value) => {
            if (!showAll) {
              setDateFilter(value);
            }
          }}
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
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
        noDataComponent={
          <p className="py-6 text-gray-400">
            {loading ? "Loading packages..." : "No packages found"}
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