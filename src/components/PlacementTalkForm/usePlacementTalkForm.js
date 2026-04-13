import { useState } from "react";
import { DEPARTMENTS } from "../IcebreakerForm/departments";

export const usePlacementTalkForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    branch: "",
    question: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterDepartments = (input) => {
    if (!input) return [];
    const regex = new RegExp(input, "i");
    return DEPARTMENTS.filter(
      (dept) => regex.test(dept.name) || regex.test(dept.short)
    ).slice(0, 6);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "usn":
        return !/^1MS\d{2}[A-Z]{2}\d{3}$/i.test(value)
          ? "Invalid USN format. Expected format: 1MS24CS067" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email" : "";
      case "branch":
        return value.trim().length < 2 ? "Please select your branch" : "";
      case "question":
        return value.length > 500 ? "Question cannot exceed 500 characters" : "";
      default:
        return "";
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    ["name", "usn", "email", "branch"].forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (submitStatus.message) setSubmitStatus({ type: "", message: "" });
  };

  const handleBranchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFormData((prev) => ({ ...prev, branch: value }));
    setShowSuggestions(value.length > 0);
    const error = validateField("branch", value);
    setErrors((prev) => ({ ...prev, branch: error }));
  };

  const selectDepartment = (dept) => {
    setFormData((prev) => ({ ...prev, branch: dept.short }));
    setSearchTerm(dept.name);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/placement-talk-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({ name: "", usn: "", email: "", branch: "", question: "" });
        setSearchTerm("");
        setErrors({});
      } else {
        setSubmitStatus({ type: "error", message: data.message });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    searchTerm,
    showSuggestions,
    filteredDepts: filterDepartments(searchTerm),
    handleChange,
    handleBranchInputChange,
    selectDepartment,
    setShowSuggestions,
    handleSubmit,
  };
};
