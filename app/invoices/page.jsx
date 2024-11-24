"use client";

import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import InvoiceNav from "../Components/InvoiceNav";
import axios from "axios";

const Page = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [invoices, setInvoices] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    const res = await axios.get("https://invoice-management-system-g91sw36rc-parthmandhares-projects.vercel.app/api/invoice");
    const data = await res.data;

    setInvoices(data.data);
  };

  const [newInvoice, setNewInvoice] = useState({
    Vendor_Name: "",
    Invoice_Number: "",
    Status: "",
    Net_Amount: "",
    Invoice_Date: "",
    Due_Date: "",
    Department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform further actions like API call, etc.

    try {
        const response = await axios.post("https://invoice-management-system-g91sw36rc-parthmandhares-projects.vercel.app/api/invoice", newInvoice);

        getInvoices()
        setModalOpen(false);
      } catch (error) {
        console.error("Error submitting invoice:", error.response?.data || error.message);
      }

  };

  

  const [filters, setFilters] = useState({
    Invoice_Number: "",
    Status: "",
    Vendor_Name: ""
  });


  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Function to apply filters
  const applyFilters = async () => {
    try {
      // Construct query parameters dynamically
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value) // Remove empty filters
      ).toString();

      const response = await axios.get(`https://invoice-management-system-g91sw36rc-parthmandhares-projects.vercel.app/api/invoice?${queryParams}`);
      const data = await response.data;

      
      setInvoices(data.data);

    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters])

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    updateFilter(selectedFilter, e.target.value);
  };

  const [selectedFilter, setSelectedFilter] = useState("Vendor_Name"); // Default to filter by Vendor Name
  const [searchValue, setSearchValue] = useState("");





  return (
    <>
      <div className="flex flex-col w-full">
        <InvoiceNav />
        {/* filter section  */}
        <div className="flex flex-col mt-5  px-4 py-3 gap-5">
          {/* default filters */}
          <div className="flex justify-evenly border-y-2 border-gray-300 py-3 overflow-x-auto gap-5">
  <button onClick={() => getInvoices()} className="flex-shrink-0">All</button>
  <button onClick={() => updateFilter("Status", "Open")} className="flex-shrink-0">Open</button>
  <button onClick={() => updateFilter("Status", "Awaiting Approval")} className="flex-shrink-0">Awaiting Approval</button>
  <button onClick={() => updateFilter("Status", "Approved")} className="flex-shrink-0">Approved</button>
  <button onClick={() => updateFilter("Status", "Processing")} className="flex-shrink-0">Processing</button>
  <button onClick={() => updateFilter("Status", "Paid")} className="flex-shrink-0">Paid</button>
  <button onClick={() => updateFilter("Status", "Rejected")} className="flex-shrink-0">Rejected</button>
  <button onClick={() => updateFilter("Status", "Vendor not found")} className="flex-shrink-0">Vendor not found</button>
  <button onClick={() => updateFilter("Status", "Duplicate")} className="flex-shrink-0">Duplicate</button>
  <button onClick={() => updateFilter("Status", "Void")} className="flex-shrink-0">Void</button>
</div>

          {/* custom filters */}
          <div className="flex flex-col md:flex-row gap-5 justify-between">
          <form className="w-full md:w-2/5">
              <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                  Search Filter
                </label>
                <button
                  id="dropdown-button"
                  onClick={toggleDropdown}
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                  type="button"
                >
                  <span className="hidden md:block">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </span>
                  <p className="ml-2">Search by {selectedFilter}</p>
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-12">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setSelectedFilter("Vendor_Name"); setDropdownOpen(false); }}
                        >
                          by Vendor
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setSelectedFilter("Invoice_Number"); setDropdownOpen(false); }}
                        >
                          by Invoice Number
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                <input
                  type="search"
                  id="search-dropdown"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search here..."
                  required
                />
              </div>
            </form>


            <button
              className="bg-cyan-700 text-white text-sm font-semibold px-2 py-0 rounded-md w-fit"
              onClick={() => setModalOpen(true)}
            >
              New Invoice
            </button>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add new invoice</h2>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="mt-4">
                {/* Content of the modal can be added here */}
                <form onSubmit={handleSubmit} className="">
                  <div className="flex gap-x-6 mb-6">
                    <div className="w-full relative">
                      <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Vendor Name
                      </label>
                      <input
                        type="text"
                        name="Vendor_Name"
                        value={newInvoice.Vendor_Name}
                        onChange={handleChange}
                        className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                        required
                      />
                    </div>
                    <div className="w-full relative">
                      <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Invoice Number
                      </label>
                      <input
                        type="text"
                        name="Invoice_Number"
                        value={newInvoice.Invoice_Number}
                        onChange={handleChange}
                        className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-6 mb-6">
                    <div className="w-full relative">
                      <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Status
                      </label>
                      <select
                        name="Status"
                        value={newInvoice.Status}
                        onChange={handleChange}
                        className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Open">Open</option>
                        <option value="Awaiting Approval">
                          Awaiting Approval
                        </option>
                        <option value="Approved">Approved</option>
                        <option value="Processing">Processing</option>
                        <option value="Paid">Paid</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="w-full relative">
                      <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Net Amount
                      </label>
                      <input
                        type="text"
                        name="Net_Amount"
                        value={newInvoice.Net_Amount}
                        onChange={handleChange}
                        className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      name="Invoice_Date"
                      value={newInvoice.Invoice_Date}
                      onChange={handleChange}
                      className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                      required
                    />
                  </div>

                  <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="Due_Date"
                      value={newInvoice.Due_Date}
                      onChange={handleChange}
                      className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                      required
                    />
                  </div>

                  <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                      Department
                    </label>
                    <input
                      type="text"
                      name="Department"
                      value={newInvoice.Department}
                      onChange={handleChange}
                      className="block w-full h-11 px-5 py-2.5 bg-white border rounded-full"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {invoices ? <Table data={invoices} func={getInvoices} /> : <div> <div role='status' aria-label='loading'>
<svg className='w-6 h-6 stroke-indigo-600 animate-spin ' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
<g clipPath='url(#clip0_9023_61563)'>
  <path d='M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444' stroke='stroke-current' strokeWidth='1.4' strokeLinecap='round' className='my-path'></path>
</g>
<defs>
  <clipPath id='clip0_9023_61563'>
    <rect width='24' height='24' fill='white'></rect>
  </clipPath>
</defs>
</svg>
<span className='sr-only'>Loading...</span>
</div></div>}
      </div>
    </>
  );
};

export default Page;
