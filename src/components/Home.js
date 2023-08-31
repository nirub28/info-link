import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import styles from "../styles/home.module.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://cdm.onrender.com/api/customers");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://cdm.onrender.com/api/customers/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [editModes, setEditModes] = useState([]);

  const toggleEditMode = (index) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };

  const handleSave = async (updatedData) => {
    try {

      // console.log("updated data is", updatedData);
      const response = await axios.put(
        `https://cdm.onrender.com/api/customers/${updatedData.id}`,
        updatedData
      );

      setData(response.data);
      toggleEditMode(updatedData.index);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleNameChange = (index, newName) => {
    const newData = [...data];
    newData[index].name = newName;
    setData(newData);
  };
  
  const handleMobileChange = (index, newMobile) => {
    const newData = [...data];
    newData[index].mobile = newMobile;
    setData(newData);
  };
  
  const handleEmailChange = (index, newEmail) => {
    const newData = [...data];
    newData[index].email = newEmail;
    setData(newData);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalCustomers = data.length;

  return (
    <div className={styles.home}>

       <div className={styles.dashboardDiv}>
       <div className={styles.dashboard}>
        <div className={styles.dis} >Total Customers </div> 
        <div>
        <b>{totalCustomers} </b>
        </div>
      </div>

      <div className={styles.dashboardInner}>
      <div className={styles.centerContent}>
      <b className={styles.bTag}>Empty</b>
    </div>
      </div>

      <div className={styles.dashboardInner}>
      <div className={styles.centerContent}>
      <b className={styles.bTag}>Empty</b>
       </div>
      </div>


      </div>

      <div className={styles.searchDiv}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th className={styles.sNo}>S.No</th>
              <th className={styles.name}>Name</th>
              <th className={styles.mobile}>Mobile</th>
              <th className={styles.email}>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editModes[index] ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editModes[index] ? (
                    <input
                      type="text"
                      value={item.mobile}
                      onChange={(e) =>
                        handleMobileChange(index, e.target.value)
                      }
                    />
                  ) : (
                    item.mobile
                  )}
                </td>
                <td>
                  {editModes[index] ? (
                    <input
                      type="text"
                      value={item.email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {editModes[index] ? (
                    <button className={styles.editBtn} onClick={() => handleSave({ ...item, index })}>
                      Save
                    </button>
                  ) : (
                    <button className={styles.editBtn} onClick={() => toggleEditMode(index)}>Edit</button>
                  )}
                  <button className={styles.delBtn} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination className={styles.customPagination}>
          {Array.from({
            length: Math.ceil(filteredData.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? styles.currentPage : ""}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
