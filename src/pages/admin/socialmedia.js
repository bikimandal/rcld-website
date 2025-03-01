import { useState, useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import Spinner1 from "@/components/spinners/Spinner1";
import RotateLoader from "react-spinners/RotateLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [saving, setSaving] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsPageLoading(true);
    try {
      const response = await fetch("/api/socialmedia/supabase.socialmedia");
      const data = await response.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts. Try again!", { autoClose: 2000 });
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchContacts();
      toast.success("Data refreshed successfully!", {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to refresh data!", {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
      });
    }
    setRefreshing(false);
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };

  const handleInputChange = (e, index, field) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: e.target.value,
    };
    setContacts(updatedContacts);
  };

  const handleSave = async () => {
    if (editableRow === null) return;
    setSaving(true);

    const updatedContact = contacts.find(
      (contact) => contact.id === editableRow
    );
    if (!updatedContact) {
      toast.error("Invalid contact selection!");
      setSaving(false);
      return;
    }
    try {
      const response = await fetch("/api/socialmedia/supabase.updatedata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Update failed");

      setSaving(false);
      setEditableRow(null);
      toast.success("Update Successful", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error(
        error.message || "An error occurred while updating the contact.",
        {
          theme: "dark",
          autoClose: 5000,
        }
      );
      setSaving(false);
    }
  };

  // This function handles keyboard events globally
  const handleKeyDown = async (event) => {
    if (event.key === "Escape") {
      setEditableRow(null);
    } else if (event.key === "Enter" && editableRow !== null) {
      await handleSave();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setEditableRow(null); // Reset editable row
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editableRow, handleSave]); // Added handleSave to dependencies

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Contact List</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`flex items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-md transition-all cursor-pointer ${
              refreshing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-violet-600"
            }`}
          >
            {refreshing && <Spinner1 color="#ffffff" size={25} />}
            <span>Refresh Data</span>
          </button>
        </div>
        {isPageLoading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <RotateLoader color="#2563eb" size={30} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="w-full max-w-4xl mx-auto border-collapse border border-gray-700 text-left"
              ref={tableRef}
            >
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th className="p-3 border border-gray-700">#</th>
                  <th className="p-3 border border-gray-700">Name</th>
                  <th className="p-3 border border-gray-700">Type</th>
                  <th className="p-3 border border-gray-700">Link</th>
                  <th className="p-3 border border-gray-700">Update</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className={`transition-all ${
                      index % 2 === 0
                        ? "bg-gray-200 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-700"
                    } hover:bg-blue-200 dark:hover:bg-blue-200 hover:text-gray-800`}
                  >
                    <td className="p-3 border border-gray-700 text-center">
                      {contact.id}
                    </td>
                    <td className="p-3 border border-gray-700 text-center">
                      {/* <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                        readOnly={true}
                        className="w-full p-2 border border-gray-500 rounded-md transition-all cursor-default bg-transparent"
                      /> */}
                      {contact.name}
                    </td>
                    <td className="p-3 border border-gray-700 text-center">
                      {/* <input
                        type="text"
                        value={contact.type}
                        onChange={(e) => handleInputChange(e, index, "type")}
                        readOnly={true}
                        className="w-full p-2 border border-gray-500 rounded-md transition-all cursor-default bg-transparent"
                      /> */}
                      {contact.type}
                    </td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={contact.link}
                        onChange={(e) => handleInputChange(e, index, "link")}
                        readOnly={editableRow !== contact.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === contact.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700 text-center">
                      {editableRow === contact.id ? (
                        <button
                          onClick={handleSave}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                          {saving ? (
                            <Spinner1 color="#ffffff" size={20} />
                          ) : (
                            "Save"
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(contact.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer"
                        >
                          Update
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactTable;
