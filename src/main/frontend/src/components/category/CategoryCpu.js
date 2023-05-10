import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faList, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';


// import { faSquareRight } from '@fortawesome/free-solid-svg-icons';
// import { faSquareChevronLeft, faSquareChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { solid } from '@fortawesome/fontawesome-svg-core';

function CategoryCpu() {
  const [cpuList, setCpuList] = useState([]);
  const [data2, setData2] = useState("AMD Ryzen 5 5600X");
  const [cpuOption, setCpuOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const [selectedCpu, setSelectedCpu] = useState({
      value : localStorage.getItem('cpuData'),
      label : localStorage.getItem('cpuData')
  });
  const [flag, setFlag] = useState(true);
  const [cpu, setCpu] = useState({});

  const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
  };

  const slicedData = cpuList.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/category/cpu1');
        setCpuList(response.data);
        setData2(localStorage.getItem('cpuData'));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
        axios.get('/category/cpu_name')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus,
                    label: cpus
                }));
                setCpuOption(cpus);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

  const convertPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sortProduct = (type) => {
      // 이름순 수정
      // if (type === "name") {
      //     const newProduct = [...cpuList];
      //     newProduct.sort((a, b) => a.cpu_name - b.cpu_name);
      //     setCpuList(newProduct);
      // }
      if (type === "low") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => {
              if (a.cpuPrice === 0 && b.cpuPrice === 0) {
                  return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
              } else if (a.cpuPrice === 0) {
                  return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
              } else if (b.cpuPrice === 0) {
                  return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
              } else {
                  return a.cpuPrice - b.cpuPrice; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
              }
          });
          setCpuList(newProduct);
      } else if (type === "high") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => b.cpuPrice - a.cpuPrice);
          setCpuList(newProduct);
      } else if (type === "rankLow") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => b.cpuRank - a.cpuRank);
          setCpuList(newProduct);
      } else if (type === "rankHigh") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => a.cpuRank - b.cpuRank);
          setCpuList(newProduct);

      }
    };

    function handleGpuChange(selectedGpu) {
        setSelectedCpu(selectedGpu);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchCpu = (cpu) => {
        setFlag(false);
        {cpuList.map((list) => {
            if(list.cpuName === cpu.value){
                setCpu(list);
            }
        })
        }
    }

    const showTotalList = () => {
        setFlag(true);
        setSearchValue("");
    }

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    const filteredProducts = cpuOption.filter((product) =>
        product.value.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
      <div>


          <form onSubmit={handleSubmit} className={styles.formTag}>
              <p onClick={() => searchCpu(selectedCpu)} className={styles.buttonSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#ffffff",backgroundColor:"#151515"}} /></p> &emsp;
              <input
                  className={styles.input}
                  type="text"
                  placeholder="원하는 CPU를 입력해주세요."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          searchCpu(selectedCpu);
                      }
                  }}
              />
          </form>

          <div className={styles.filter}>
              <button className={styles.filterButton} onClick={() => sortProduct("low")}>낮은 가격</button>
              <button className={styles.filterButton} onClick={() => sortProduct("high")}>높은 가격</button>
              <button className={styles.filterButton} onClick={() => sortProduct("rankHigh")}>cpu 높은 순️</button>
              <button className={styles.filterButton} onClick={() => sortProduct("rankLow")}>cpu 낮은 순️</button>
              <button className={styles.buttonTotalList} onClick={() => showTotalList()}>검색 초기화</button>
          </div>
          {flag ? (
              <div className={styles.cssTable}>
                  <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                              <th className={styles.cssTh}>Image</th>
                              <th className={styles.cssTh}>Name</th>
                              <th className={styles.cssTh}>Mark</th>
                              <th className={styles.cssTh}>Rank</th>
                              <th className={styles.cssTh}>Value</th>
                              <th className={styles.cssTh}>Price</th>
                              {/*<th>Image</th>*/}
                              {/*<th>Name</th>*/}
                              {/*<th>Rank</th>*/}
                              {/*<th>Value</th>*/}
                              {/*<th>Price</th>*/}
                          </tr>
                      </thead>
                      <tbody>
                          {slicedData.map((cpu) => (
                              <tr>
                                  {/*<td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>*/}
                                  {/*<td className={styles.cssTd}><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>*/}
                                  {/*<td className={styles.cssTd}>{cpu.cpuRank}</td>*/}
                                  {/*<td className={styles.cssTd}>{cpu.cpuValue}</td>*/}
                                  {/*<td className={styles.cssTd}>{convertPrice(cpu.cpuPrice)}원</td>*/}
                                  <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                  <td><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>
                                  <td>{cpu.cpuMark}</td>
                                  <td>{cpu.cpuRank}</td>
                                  <td>{cpu.cpuValue}</td>
                                  <td>{convertPrice(cpu.cpuPrice)}원</td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </div>)
               :
              <div className={styles.cssTable}>
                  <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                              <th className={styles.cssTh}>Image</th>
                              <th className={styles.cssTh}>Name</th>
                              <th className={styles.cssTh}>Mark</th>
                              <th className={styles.cssTh}>Rank</th>
                              <th className={styles.cssTh}>Value</th>
                              <th className={styles.cssTh}>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                      {filteredProducts.map((product) => (
                          cpuList.map((cpu) =>(
                              cpu.cpuName=== product.value &&(
                          <tr>
                              <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                              <td><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>
                              <td>{cpu.cpuMark}</td>
                              <td>{cpu.cpuRank}</td>
                              <td>{cpu.cpuValue}</td>
                              <td>{convertPrice(cpu.cpuPrice)}원</td>
                          </tr>
                              )))))}
                      </tbody>
                  </Table>
              </div>
          }
      </div>
      <br/>
        <div className={styles.page}>
          {flag &&
              <ReactPaginate
                  previousLabel={<span className={styles.paginationIconLeft}>
                                    <FontAwesomeIcon icon={faSquareCaretLeft} beat size="2xl" />
                                </span>}
                  nextLabel={<span className={styles.paginationIconRight}>
                                    <FontAwesomeIcon icon={faSquareCaretRight} beat size="2xl" />
                            </span>}
                  pageCount={Math.ceil(cpuList.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link spaced"}
              />
          }
      </div>
    </>
  );
}

export default CategoryCpu;

// previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
// nextLabel={<FontAwesomeIcon icon={faChevronRight} />}