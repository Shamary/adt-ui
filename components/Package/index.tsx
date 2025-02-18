"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";

const columns = [
  { name: "House", selector: (row) => row.aerotrack, sortable: true },
  { name: "Courier No.", selector: (row) => row.courierNo, sortable: true },
  { name: "Store", selector: (row) => row.store, sortable: true },
  { name: "Description", selector: (row) => row.description, sortable: true },
  { name: "Status", selector: (row) => row.status, sortable: true },
  { name: "Last Updated", selector: (row) => row.lastUpdated, sortable: true },
];

const initialData = [
  { aerotrack: "AT12345", courierNo: "CN987654", store: "Amazon", description: "Laptop", status: "Arrived", lastUpdated: "12/02/2025" },
  { aerotrack: "AT54321", courierNo: "CN123456", store: "eBay", description: "Phone", status: "Processed", lastUpdated: "10/02/2025" },
  { aerotrack: "AT67890", courierNo: "CN567890", store: "BestBuy", description: "Headphones", status: "Ready for Pickup", lastUpdated: "08/02/2025" },
];

const PackageList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    // Simulate API call for package updates
    fetchPackageUpdates();
  }, []);

  const fetchPackageUpdates = () => {
    // Placeholder for API integration to fetch updated package statuses
    console.log("Fetching package updates...");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterData(e.target.value, statusFilter, dateFilter);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    filterData(search, e.target.value, dateFilter);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    filterData(search, statusFilter, e.target.value);
  };

  const filterData = (searchTerm, status, date) => {
    let filtered = initialData;

    if (searchTerm) {
      filtered = filtered.filter((pkg) =>
        Object.values(pkg).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (status) {
      filtered = filtered.filter((pkg) => pkg.status === status);
    }

    if (date) {
      filtered = filtered.filter((pkg) => dayjs(pkg.lastUpdated, "DD/MM/YYYY").isSame(dayjs(date), "day"));
    }

    setFilteredData(filtered);
  };

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
          <option value="Arrived">Arrived</option>
          <option value="Processed">Processed</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="date"
          className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        noDataComponent={<p className="py-6 text-gray-400">There are no packages to display</p>}
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
