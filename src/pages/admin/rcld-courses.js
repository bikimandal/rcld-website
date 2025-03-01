import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import withAuth from "../../../utils/withAuth";
import Spinner1 from "@/components/spinners/Spinner1";
import { toast } from "react-toastify";
import { RotateLoader } from "react-spinners";

function RcldCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [idtodelete, setidToDelete] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const tableRef = useRef(null);

  const refreshData = () => {
    setRefreshing(true);
    fetch("/api/rcld-courses/supabase.courses")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data
          .map((course) => ({
            ...course,
            subjects:
              typeof course.subjects === "string"
                ? JSON.parse(course.subjects)
                : course.subjects,
          }))
          .sort((a, b) => a.id - b.id);

        setCourses(formattedData);
        setRefreshing(false);
        setIsPageLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);
  const handleInputChange = (e, index, field) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: e.target.value };
    setCourses(newCourses);
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };

  const handleSave = async () => {
    if (editableRow === null) return;

    setSaving(true);

    const updatedCourse =
      courses.find((course) => course.id === editableRow) ||
      courses[editableRow];

    if (!updatedCourse) {
      toast.error("Invalid course selection!");
      setSaving(false);
      return;
    }

    const formattedCourse = {
      ...updatedCourse,
      subjects: Array.isArray(updatedCourse.subjects)
        ? updatedCourse.subjects
        : updatedCourse.subjects.split(",").map((s) => s.trim()),
    };

    try {
      const response = await fetch("/api/rcld-courses/supabase.updaterow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedCourse),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Update failed");
      }

      setSaving(false);
      setEditableRow(null);

      toast.success("Update Successful", {
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating course:", error);

      toast.error(
        error.message || "An error occurred while updating the course.",
        {
          theme: "dark",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setSaving(false);
    }
  };

  //
  const handleConfirmDelete = async (id) => {
    setDeleting(true);

    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/rcld-courses/supabase.deleterow", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const result = await response.json();

        if (response.ok) {
          setDeleting(false);
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== id)
          );
          resolve("Course deleted successfully");
          refreshData();
        } else {
          setDeleting(false);
          reject("Deletion failed: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        setDeleting(false);
        reject("An error occurred while deleting the course.");
      }
    });

    toast.promise(deletePromise, {
      pending: {
        render: "Deleting course...",
        theme: "dark",
      },
      success: {
        render({ data }) {
          return data;
        },
        theme: "dark",
        autoClose: 3000,
      },
      error: {
        render({ data }) {
          return data;
        },
        theme: "dark",
        autoClose: 3000,
      },
    });

    setSaving(false);
  };

  const handleDelete = async (id) => {
    setidToDelete(id);
    setShowModal(true);
  };
  const handleRefresh = () => {
    refreshData();
    toast.success("Data Refreshed!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const getAbbreviationById = (id, courses) => {
    const course = courses.find((course) => course.id === id);
    return course ? course.abbreviation : null;
  };
  //
  const getMaxId = (courses) => {
    if (!courses.length) return 1;
    return Math.max(...courses.map((course) => course.id)) + 1;
  };

  //
  const handleNewRow = async () => {
    setIsAddingNewRow(true);
    const newId = getMaxId(courses);

    try {
      const response = await fetch("/api/rcld-courses/supabase.addingnewrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      refreshData();
      setEditableRow(newId);
      setIsAddingNewRow(false);

      // Success toast
      toast.success("Row added successfully!", {
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding row:", error.message);

      // Error toast
      toast.error(`Error: ${error.message}`, {
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
        setEditableRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editableRow, handleSave]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Available Courses
        </h1>

        {/* Refresh Button */}
        <div className="flex justify-center mb-4 gap-5">
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

          <button
            onClick={handleNewRow}
            className="flex justify-center items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all cursor-pointer"
          >
            {isAddingNewRow ? <Spinner1 color="#ffffff" size={25} /> : ""}
            Add New row
          </button>
        </div>
        {/*  */}
        {isPageLoading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <RotateLoader color="#2563eb" size={30} />
          </div>
        ) : (
          <div className="overflow-x-auto ">
            <table
              className="w-full max-w-6xl mx-auto border-collapse border border-gray-700 text-left"
              ref={tableRef}
            >
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th className="p-3 border border-gray-700">#</th>
                  <th className="p-3 border border-gray-700">Abbr</th>
                  <th className="p-3 border border-gray-700">Course Name</th>
                  <th className="p-3 border border-gray-700">Subjects</th>
                  <th className="p-3 border border-gray-700">Description</th>
                  <th className="p-3 border border-gray-700">Fees</th>
                  <th className="p-3 border border-gray-700">Duration</th>
                  <th className="p-3 border border-gray-700">Update</th>
                  <th className="p-3 border border-gray-700">Delete</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-200 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-700"
                    } hover:bg-gray-500 dark:hover:bg-gray-200 hover:text-gray-800`}
                  >
                    <td className="p-3 border border-gray-700">{course.id}</td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.abbreviation}
                        onChange={(e) =>
                          handleInputChange(e, index, "abbreviation")
                        }
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.title}
                        onChange={(e) => handleInputChange(e, index, "title")}
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500  rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.subjects}
                        onChange={(e) =>
                          handleInputChange(e, index, "subjects")
                        }
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>

                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.description}
                        onChange={(e) =>
                          handleInputChange(e, index, "description")
                        }
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.fees}
                        onChange={(e) => handleInputChange(e, index, "fees")}
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700">
                      <input
                        type="text"
                        value={course.duration}
                        onChange={(e) =>
                          handleInputChange(e, index, "duration")
                        }
                        readOnly={editableRow !== course.id}
                        className={`w-full p-2 border border-gray-500 rounded-md transition-all cursor-default ${
                          editableRow === course.id
                            ? "bg-yellow-200 dark:bg-yellow-600 text-white cursor-text"
                            : "bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3 border border-gray-700 text-center">
                      {editableRow === course.id ? (
                        <button
                          onClick={handleSave}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all cursor-pointer flex justify-center items-center"
                        >
                          {saving ? (
                            <Spinner1 color="#ffffff" size={20} />
                          ) : (
                            "Save"
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all cursor-pointer"
                        >
                          Update
                        </button>
                      )}
                    </td>
                    <td className="p-3 border border-gray-700 text-center">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all ml-2 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Are you sure you want to delete this course?
              </p>
              <div className="w-auto flex justify-center items-center">
                <h2 className="mt-2 w-1/2 text-xl uppercase bg-red-500 text-amber-50 p-1 rounded-full font-bold">
                  {getAbbreviationById(idtodelete, courses)}
                </h2>
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => {
                    handleConfirmDelete(idtodelete);
                    setShowModal(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all cursor-pointer"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default withAuth(RcldCourses);
