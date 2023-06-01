import axios from "axios";
import React, { useEffect, useState } from "react";

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [allContactsClicked, setAllContactsClicked] = useState(false);
  const [onlyUsData, setOnlyUsData] = useState(false);
  const [usaData, setUsaData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);
  const [showEvenIds, setShowEvenIds] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://contact.mediusware.com/api/contacts/?page=${page}&page_size=20`;

        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }
        const { data } = await axios.get(url);
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsData = async () => {
      try {
        const { data } = await axios.get(
          "https://contact.mediusware.com/api/country-contacts/United States/"
        );
        setUsaData(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsData();
    fetchData();
  }, [allContactsClicked, page, onlyUsData, searchTerm]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleClick = () => {
    setAllContactsClicked((prevState) => !prevState);
    setModalShow(true);
  };

  const handleClickOnlyUs = () => {
    setOnlyUsData((prevState) => !prevState);
    setPage(1);
    setContacts([]);
    setModalShow(true);
  };

  const handleCheckboxChange = () => {
    setShowEvenIds((prevState) => !prevState);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const showModal = allContactsClicked || (onlyUsData && modalShow);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={handleClick}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={handleClickOnlyUs}
            className={`btn btn-lg ${
              onlyUsData ? "btn-outline-primary" : "btn-outline-warning"
            }`}
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className={`modal fade ${modalShow ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: modalShow ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
              </div>
              <div className="modal-body card" onScroll={handleScroll}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {contacts &&
                  contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between card-body"
                    >
                      <p>Phone: {contact.phone}</p>
                      <p>Country: {contact.country.name}</p>
                    </div>
                  ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalShow(false)}
                  style={{ backgroundColor: "#46139f" }}
                >
                  Button A
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalShow(false)}
                  style={{ backgroundColor: "#ff7f50" }}
                >
                  Button B
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalShow(false)}
                  style={{
                    backgroundColor: "#fff",
                    borderBlockColor: "#46139f",
                    color: "black",
                  }}
                >
                  Button C
                </button>
              </div>
              ;
            </div>
          </div>
        </div>
      )}

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked={showEvenIds}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Checked checkbox
        </label>
      </div>
    </div>
  );
};

export default Problem2;
