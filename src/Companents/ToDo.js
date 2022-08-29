import { Button } from "bootstrap";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.scss";

function ToDo() {
  
  let workers = JSON.parse(localStorage.getItem("workers"));

  if (!workers) {
    localStorage.setItem("workers", JSON.stringify(getEmployee));
  }
  const [showTable, setTable] = React.useState(false);
  React.useEffect(() => {
    
    if (getEmployee.length > 0) {
      setTable(true);
    } else {
      setTable(false);
    }
  });
  const [employeeId, setEmployeeId] = React.useState(0);

  const [getName, setName] = React.useState("");
  const employeeName = React.useCallback((e) => {
    setName(e.target.value);
  });

  const [getSurname, setSurname] = React.useState("");
  const employeeSurname = React.useCallback((e) => {
    setSurname(e.target.value);
  });

  const [getSalary, setSalary] = React.useState("");
  const employeeSalary = React.useCallback((e) => {
    setSalary(e.target.value);
  });

  const [getEmployee, setEmployee] = React.useState([]);

  const addEmploye = (ev) => {
    console.log(isNaN(getSalary));
    if(isNaN(getSalary)){
      alert('Zehmet Olmasa Salarini Duz Girin')
    }else{

      
      ev.preventDefault();
      ev.target.reset();
    
      getEmployee.push({
        id: employeeId,
        name: getName,
        surname: getSurname,
        salary: getSalary,
      });
      setEmployeeId(employeeId + 1);
      setEmployee(getEmployee);
      localStorage.setItem("workers", JSON.stringify(getEmployee));
    }
  };

  const Delete = (idEmp) => {
    const update = getEmployee.filter(({ id }) => idEmp !== id);
    setEmployee(update);
    localStorage.setItem("workers", JSON.stringify(update));
  };
  return (
    <>
      <Container>
        <form className="mt-4 mx-auto" action="#" onSubmit={addEmploye}>
          <label for="employee-name">Name</label>
          <input
            onChange={employeeName}
            placeholder="Enter Name"
            id="employee-name"
          ></input>
          <label for="employee-surname">Surname</label>
          <input
            onChange={employeeSurname}
            placeholder="Enter Surname"
            id="employee-surname"
          ></input>
          <label for="employee-salary">Salery</label>
          <input
            onChange={employeeSalary}
            type='number'
            placeholder="Enter Salary"
            id="employee-salary"
          ></input>
          <button>Add</button>
        </form>

        {showTable && (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Salary</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getEmployee.map(({ id, name, surname, salary }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{name}</td>
                  <td>{surname}</td>
                  <td>{salary} $</td>
                  <td>
                    <button onClick={() => Delete(id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </>
  );
}

export default ToDo;
