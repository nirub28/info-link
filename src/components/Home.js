import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import styles from '../styles/home.module.css'; 

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data'); 
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination>
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
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
