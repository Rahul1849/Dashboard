import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "./redux/categorySlice";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./styles.css";

const App = () => {
   // Access categories from Redux store
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  // State to manage modal visibility and widget input data
  const [showModal, setShowModal] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: "", text: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to manage search term and filter menu visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterMenuRef = useRef(null); // Reference to detect clicks outside the filter menu

  // Function to open the modal and select a category for adding a widget
  const openModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowModal(true);
  };

  // Function to close the modal and reset widget input data
  const closeModal = () => {
    setShowModal(false);
    setNewWidget({ name: "", text: "" });
  };

  // Function to add a widget to the selected category
  const handleAddWidget = () => {
    if (selectedCategory && newWidget.name && newWidget.text) {
      dispatch(
        addWidget({
          categoryId: selectedCategory,
          widget: {
            id: Date.now(), // Unique ID for the widget
            name: newWidget.name,
            text: newWidget.text,
          },
        })
      );
      setNewWidget({ name: "", text: "" });
    }
  };

  // Function to remove a widget from a specific category
  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  // Filter categories based on search term
  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  // Function to close filter menu when clicking outside
  const handleClickOutside = (event) => {
    if (
      filterMenuRef.current &&
      !filterMenuRef.current.contains(event.target)
    ) {
      setShowFilterMenu(false);
    }
  };

  // Effect to add/remove event listener for detecting clicks outside the filter menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Data for pie charts and bar charts
  const halfPieData = [{ value: 50 }, { value: 50 }];
  const multiColorPieData = [
    { value: 70, color: "#00C49F" },
    { value: 15, color: "#FF8042" },
    { value: 10, color: "#FFBB28" },
    { value: 5, color: "#8884D8" },
  ];

  const horizontalStackedBarData1 = [
    { name: "", value: 50, color: "#FF6347" },
    { name: "", value: 30, color: "#4682B4" },
    { name: "", value: 20, color: "#32CD32" },
    { name: "", value: 25, color: "#FFD700" },
  ];

  const horizontalStackedBarData2 = [
    { name: "", value: 15, color: "#FF6347" },
    { name: "", value: 25, color: "#4682B4" },
    { name: "", value: 20, color: "#32CD32" },
    { name: "", value: 10, color: "#FFD700" },
    { name: "", value: 30, color: "#8A2BE2" },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item dashboard-item">Dashboard V2</li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search widgets..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="header-icons">
          <button className="notification-button">🔔</button>
          <button className="profile-button">👤</button>
        </div>
      </header>

      <div className="content-container">
        <div className="dashboard-header">
          <h2>CNAPP Dashboard</h2>
          <div className="dashboard-actions">
            <button
              className="add-button"
              onClick={() => openModal(categories[0]?.id)}
            >
              {" "}
              Add Widget +
            </button>
            <button className="refresh-button">⟳</button> &nbsp; &nbsp;
            <button className="filter-button">Last 2 Days</button>
            <button
              className="menu-button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              ⋮
            </button>
            {showFilterMenu && (
              <div className="filter-menu" ref={filterMenuRef}>
                <p>Filter by:</p>
                <ul>
                  <li>Last 2 Days</li>
                  <li>Last Week</li>
                  <li>Last Month</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="cards-header">
          <h3>CSPM Executive Dashboard</h3>
        </div>

        <div className="cards-container">
          <div className="card">
            <PieChart width={170} height={170}>
              <Pie
                data={halfPieData}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={450}
                innerRadius={45}
                outerRadius={70}
                fill="#0088FE"
                dataKey="value"
              >
                <Cell key="half" fill="#0088FE" />
                <Cell key="half" fill="#E0E0E0" />
              </Pie>
            </PieChart>
            <div className="card-content">
              <h6 className="total-text">Cloud Accounts</h6>
              <div className="checkboxes">
                <label>
                  <input type="checkbox" /> Connected (2)
                </label>
                <label>
                  <input type="checkbox" /> Not Connected (2)
                </label>
              </div>
            </div>
          </div>

          <div className="card">
            <PieChart width={170} height={170}>
              <Pie
                data={multiColorPieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {multiColorPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="card-content">
              <h6 className="total-text">Cloud Account Risk Assessment</h6>
              <div className="checkboxes">
                <label>
                  <input type="checkbox" /> Failed (1689)
                </label>
                <label>
                  <input type="checkbox" /> Warning (681)
                </label>
                <label>
                  <input type="checkbox" /> Not Available (36)
                </label>
                <label>
                  <input type="checkbox" /> Paased (7253)
                </label>
              </div>
            </div>
          </div>

          {/* Add Widget Card */}
          <div className="card add-widget-card">
            <button className="add-widget-button">+ Add Widget</button>
          </div>
        </div>

        <div className="cards-header">
          <h3>CWPP Dashboard</h3>
        </div>

        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <h6 className="total-text">Top 5 Namespace Specific Alerts</h6>
              <h4>No Graph Data Available</h4>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h6 className="total-text">Workload Alerts</h6>
              <h4>No Graph Data Available</h4>
            </div>
          </div>

          <div className="card add-widget-card">
            <button className="add-widget-button">+ Add Widget</button>
          </div>
        </div>

        <div className="cards-header">
          <h3>Registry Scan</h3>
        </div>

        {/* Horizontal Stacked Bar Charts */}
        <div className="cards-container">
          <div className="card">
            <BarChart
              width={300}
              height={150}
              layout="vertical"
              data={horizontalStackedBarData1}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#FF6347" />
              <Bar dataKey="value" stackId="a" fill="#4682B4" />
              <Bar dataKey="value" stackId="a" fill="#32CD32" />
              <Bar dataKey="value" stackId="a" fill="#FFD700" />
            </BarChart>
            <div className="card-content">
              <h6 className="total-text-align=center">Image Risk Assessment</h6>
              <div className="checkboxes">
                <label>
                  <input type="checkbox" /> Critical (50)
                </label>
                <label>
                  <input type="checkbox" /> High (30)
                </label>
                <label>
                  <input type="checkbox" /> Moderate (20)
                </label>
                <label>
                  <input type="checkbox" /> Low (25)
                </label>
              </div>
            </div>
          </div>

          <div className="card">
            <BarChart
              width={300}
              height={150}
              layout="vertical"
              data={horizontalStackedBarData2}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#FF6347" />
              <Bar dataKey="value" stackId="a" fill="#4682B4" />
              <Bar dataKey="value" stackId="a" fill="#32CD32" />
              <Bar dataKey="value" stackId="a" fill="#FFD700" />
              <Bar dataKey="value" stackId="a" fill="#8A2BE2" />
            </BarChart>
            <div className="card-content">
              <h6 className="total-text-align=center">Image Security Issues</h6>
              <div className="checkboxes">
                <label>
                  <input type="checkbox" /> Critical (15)
                </label>
                <label>
                  <input type="checkbox" /> High (25)
                </label>
                <label>
                  <input type="checkbox" /> Moderate (20)
                </label>
                <label>
                  <input type="checkbox" /> Low (10)
                </label>
                <label>
                  <input type="checkbox" /> Considerable (30)
                </label>
              </div>
            </div>
          </div>

          <div className="card add-widget-card">
            <button className="add-widget-button">+ Add Widget</button>
          </div>
        </div>

        {/* Modals and Popups */}
        <div className={`modal ${showModal ? "show" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Add New Widget</h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) =>
                setNewWidget({ ...newWidget, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Widget Text"
              value={newWidget.text}
              onChange={(e) =>
                setNewWidget({ ...newWidget, text: e.target.value })
              }
            />
            <button className="save-button" onClick={handleAddWidget}>
              Add Widget
            </button>

            <div className="added-widgets-list">
              <h4>Added Widgets</h4>
              <ul>
                {filteredCategories.map((category) =>
                  category.id === selectedCategory &&
                  category.widgets.length > 0 ? (
                    category.widgets.map((widget) => (
                      <li key={widget.id}>
                        <span>
                          {widget.name}: {widget.text}
                        </span>
                        <button
                          className="remove-button"
                          onClick={() =>
                            handleRemoveWidget(category.id, widget.id)
                          }
                        >
                          ✖
                        </button>
                      </li>
                    ))
                  ) : (
                    <li key={category.id}>No widgets added yet.</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
