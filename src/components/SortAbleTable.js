import React, { useEffect, useState } from "react";
import tabledata from "../data.json";
import { GrPrevious, GrNext } from "react-icons/gr";

const SortAbleTable = () => {
  const [data, setData] = useState();
  const [num, setNum] = useState(10);
  const [fromRange, setFromRange] = useState(0);
  const [toRange, setToRange] = useState(9);

  useEffect(() => {
    const filteredData = tabledata.filter(
      (item, index) => index >= fromRange && index <= toRange
    );
    setData(filteredData);
  }, [toRange, fromRange]);

  useEffect(() => {
    setFromRange(0);
    setToRange(num - 1);
  }, [num]);

  const handlePrevious = () => {
    if (fromRange === 0 && toRange === num) {
      setFromRange(fromRange);
      setToRange(toRange);
    } else {
      setFromRange(fromRange - num);
      if (tabledata.length - 1 === toRange) {
        setToRange(fromRange - 1);
      } else {
        setToRange(toRange - num);
      }
    }
  };

  const handleNext = () => {
    if (toRange < tabledata.length - 1) {
      setFromRange(fromRange + num);
      if (tabledata.length - 1 - toRange > num) {
        setToRange(toRange + num);
      } else {
        setToRange(toRange + (tabledata.length - 1) - toRange);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto pt-5">
        <div className="w-100 d-flex justify-content-end">
          <select
            className="form-select w-25 my-2"
            aria-label="Default select example"
            value={num}
            onChange={(e) => setNum(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="cutome-scroll">
          <table className="table table-success table-striped text-left py-0">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row"> {item.id} </th>
                    <td> {item.first_name} </td>
                    <td>{item.last_name}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex align-items-center justify-content-end gx-3">
          <span>
            {" "}
            {fromRange + 1} - {toRange + 1} of {tabledata.length}{" "}
          </span>
          <button
            onClick={handlePrevious}
            className="btn btn-light btn-sm mx-2"
            disabled={fromRange < 10}
          >
            <GrPrevious />
          </button>
          <button
            onClick={handleNext}
            className="btn btn-light btn-sm"
            disabled={toRange === tabledata.length - 1}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default SortAbleTable;
