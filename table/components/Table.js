"use client";

import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { employees } from "./data";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  designation: "",
  dateOfJoining: "",
  annualIncome: "",
  status: "Active",
};

const DataTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  useEffect(() => {
    setData(employees);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeePayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      designation: formData.designation,
      dateOfJoining: formData.dateOfJoining,
      annualIncome: Number(formData.annualIncome),
      active: formData.status,
    };

    if (editingId) {
      const updatedData = data.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            ...employeePayload,
          };
        }
        return item;
      });
      setData(updatedData);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...employeePayload,
      };
      setData((prev) => [...prev, newEmployee]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const employeeToEdit = data.find((item) => item.id === id);
    if (employeeToEdit) {
      setEditingId(id);
      setFormData({
        firstName: employeeToEdit.firstName || "",
        lastName: employeeToEdit.lastName || "",
        email: employeeToEdit.email || "",
        designation: employeeToEdit.designation || "",
        dateOfJoining: employeeToEdit.dateOfJoining || "",
        annualIncome: employeeToEdit.annualIncome ? employeeToEdit.annualIncome.toString() : "",
        status: employeeToEdit.active || "Active",
      });
      setShowForm(true);
    }
  };

  const handleView = (id) => {
    const employee = data.find((item) => item.id === id);
    if (employee) {
      setViewingEmployee(employee);
    }
  };

  return (
    <div className="p-4">
      <div className="sm:mt-10 lg:mt-14">
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
          className="flex justify-center items-center bg-primary p-4 rounded-xl text-white font-bold hover:opacity-90 transition"
        >
          {showForm ? "Close Form" : "Add Employee"}
          <IoPersonAddSharp className="ml-2 text-xl" />
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto mt-4 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              type="text"
              placeholder="First Name"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />

            {/* Last Name */}
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />

            {/* Email */}
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Email Address"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />

            {/* Designation */}
            <input
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              type="text"
              placeholder="Designation (e.g. Developer)"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />

            {/* Date of Joining */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1 ml-1">Date of Joining</label>
              <input
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                type="date"
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            {/* Annual Income */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1 ml-1">Annual Income ($)</label>
              <input
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleInputChange}
                type="number"
                placeholder="Annual Income"
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
          </div>

          {/* Status Radio Buttons */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={handleInputChange}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-200 transition duration-200"></div>
              <span className="text-gray-700 font-medium">Active</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === "Inactive"}
                onChange={handleInputChange}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-200 transition duration-200"></div>
              <span className="text-gray-700 font-medium">Inactive</span>
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center bg-primary hover:bg-muted-primary px-5 py-3 rounded-lg text-white font-semibold transition"
            >
              {editingId ? "Update" : "Add"}
              <IoPersonAddSharp className="ml-2 text-xl" />
            </button>
          </div>
        </form>
      )}

      {/* View Details Modal */}
      {viewingEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl space-y-3">
            <h3 className="text-xl font-bold border-b pb-2">
              {viewingEmployee.firstName} {viewingEmployee.lastName}
            </h3>
            <p><strong>Email:</strong> {viewingEmployee.email}</p>
            <p><strong>Designation:</strong> {viewingEmployee.designation}</p>
            <p><strong>Date of Joining:</strong> {viewingEmployee.dateOfJoining}</p>
            <p><strong>Annual Income:</strong> ${viewingEmployee.annualIncome?.toLocaleString()}</p>
            <p><strong>Status:</strong> {viewingEmployee.active}</p>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setViewingEmployee(null)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto mt-10">
        <Table className="min-w-full">
          <TableHeader className="bg-primary font-bold text-secondary">
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Date of Joining</TableHead>
              <TableHead>Annual Income</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.dateOfJoining}</TableCell>
                <TableCell>${item.annualIncome?.toLocaleString()}</TableCell>
                <TableCell className="flex gap-3">
                  <button
                    onClick={() => handleView(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-primary hover:opacity-90 text-white py-1 px-4 rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;