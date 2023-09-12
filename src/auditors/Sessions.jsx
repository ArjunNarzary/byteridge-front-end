import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { sessionsActions } from '_store';
import { formatDate } from '_helpers';

export { Sessions };

function Sessions() {
    const sessions = useSelector(x => x.sessions.list);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageArr, setTotalPageArr] = useState([]);

    useEffect(() => {
        dispatch(sessionsActions.getAll(currentPage))
    }, [currentPage])
    
    useEffect(() => {
        //Create an dummy array with of length equal to totalPage as set keys as it element to render pagination
        if(sessions?.totalPages){
            const numbers = [...Array(sessions.totalPages).keys()]
            setTotalPageArr(numbers)
        }
    },[sessions])


    return (
      <div>
        <h1>User Sessions</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>First Name</th>
              <th style={{ width: "15%" }}>Last Name</th>
              <th style={{ width: "10%" }}>Username</th>
              <th style={{ width: "10%" }}>Role</th>
              <th style={{ width: "10%" }}>Type</th>
              <th style={{ width: "20%" }}>IP</th>
              <th style={{ width: "20%" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {sessions?.value?.map((session) => (
              <tr key={session?.id}>
                <td>{session?.user.firstName}</td>
                <td>{session?.user.lastName}</td>
                <td>{session?.user.username}</td>
                <td>{session?.user.role}</td>
                <td>{session?.type}</td>
                <td>{session?.ip}</td>
                <td>{formatDate(session?.createdDate)}</td>
              </tr>
            ))}
            {sessions?.loading && (
              <tr>
                <td colSpan="7" className="text-center">
                  <span className="spinner-border spinner-border-lg align-center"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                aria-label="Previous"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {totalPageArr.map((val) => (
              <li key={val} className={`page-item ${currentPage === val ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(val)}>
                  {val + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === sessions?.totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                aria-label="Next"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    )
}
