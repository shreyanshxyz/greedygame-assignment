import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Table.scss";
import _ from "lodash";

function Paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

function Table() {
  // State changers for our dates
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  //   State changers for toggling our table filters
  const [ad_request, setAd_request] = useState(true);
  const [ad_response, setAd_response] = useState(true);
  const [impression, setImpression] = useState(true);
  const [clicks, setClicks] = useState(true);
  const [revenue, setRevenue] = useState(true);
  const [fillrate, setFillrate] = useState(true);
  const [CTR, setCTR] = useState(true);

  // State to store our fetched values from the API
  const [values, setValues] = useState([]);

  const currentPage = 1;

  //   Functions for toggling our states which work with filters
  const updateRequest = () => {
    setAd_request((prevState) => !prevState);
  };
  const updateResponse = () => {
    setAd_response((prevState) => !prevState);
  };
  const updateImpression = () => {
    setImpression((prevState) => !prevState);
  };
  const updateClick = () => {
    setClicks((prevState) => !prevState);
  };
  const updateRevenue = () => {
    setRevenue((prevState) => !prevState);
  };
  const updateFillrate = () => {
    setFillrate((prevState) => !prevState);
  };
  const updateCTR = () => {
    setCTR((prevState) => !prevState);
  };

  // API Call
  useEffect(() => {
    axios
      .get(
        `https://go-dev.greedygame.com/v3/dummy/report?startDate=${from}&endDate=${to}`
      )
      .then((res) => setValues(res.data.data))
      .catch((err) => console.log(err));
  }, [from, to]);

  // App Names (Localised since there were issues fetching the API)
  const fetchedApps = (id) => {
    switch (id) {
      case "789652":
        return "Number Ninja";

      case "986321":
        return "Brain Quiz";

      case "741553":
        return "Word Crush";

      case "320248":
        return "Age Calculator";

      case "123456":
        return "Panda Draw";

      default:
        return id;
    }
  };

  const alldata = Paginate(values, currentPage, 20);
  return (
    <div>
      {/* Date Picker For Our Table */}
      <label htmlFor="from" class="style">
        From:
      </label>
      <input
        style={{ margin: 20 }}
        type="date"
        name="from"
        value={from}
        id="from"
        onChange={(e) => {
          return setFrom(e.target.value);
        }}
      />
      <label htmlFor="to">To:</label>
      <input
        style={{ margin: 20 }}
        type="date"
        name="to"
        value={to}
        id="to"
        onChange={(e) => setTo(e.target.value)}
      />

      {/* Filters for our table */}
      <div className="setting-change">
        <h3 className="filter">Dimensions and Metrics</h3>
        <div className="boxes">
          <div className="box">
            <label
              className="control control-checkbox control-logo"
              htmlFor="Request"
            >
              Request
              <input
                type="checkbox"
                onChange={updateRequest}
                id="ad_request"
                name="AD Request"
                checked={ad_request === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="Response">
              Response
              <input
                type="checkbox"
                onChange={updateResponse}
                id="Response"
                name="Response"
                checked={ad_response === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="Impression">
              Impression
              <input
                type="checkbox"
                onChange={updateImpression}
                id="Impression"
                name="Impression"
                checked={impression === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="Click">
              Clicks
              <input
                type="checkbox"
                onChange={updateClick}
                id="Click"
                name="Click"
                checked={clicks === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="Revenue">
              Revenue
              <input
                type="checkbox"
                onChange={updateRevenue}
                id="Revenue"
                name="Revenue"
                checked={revenue === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="Fill_Rate">
              Fill Rate
              <input
                type="checkbox"
                onChange={updateFillrate}
                id="Fill_Rate"
                name="Fill_Rate"
                checked={fillrate === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
          <div className="box">
            <label className="control control-checkbox" htmlFor="CTR">
              CTR
              <input
                type="checkbox"
                onChange={updateCTR}
                id="CTR"
                name="CTR"
                checked={CTR === true}
              />
              <div class="control_indicator"></div>
            </label>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="header-text" scope="col">
              Date
            </th>
            <th className="header-text" scope="col">
              App Name
            </th>
            {ad_request ? (
              <th className="header-text" scope="col">
                Requests
              </th>
            ) : null}
            {ad_response ? (
              <th className="header-text" scope="col">
                Response
              </th>
            ) : null}
            {impression ? (
              <th className="header-text" scope="col">
                Impression
              </th>
            ) : null}
            {clicks ? (
              <th className="header-text" scope="col">
                Click
              </th>
            ) : null}
            {revenue ? (
              <th className="header-text" scope="col">
                Revenue
              </th>
            ) : null}
            {fillrate ? (
              <th className="header-text" scope="col">
                Fill Rate
              </th>
            ) : null}
            {CTR ? (
              <th className="header-text" scope="col">
                CTR
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => {
            return (
              <tr className="table-row" key={index}>
                <td className="table-data">{item.date}</td>
                <td className="table-data">{fetchedApps(item.app_id)}</td>
                {ad_request ? (
                  <td className="table-data">{item.requests}</td>
                ) : null}
                {ad_response ? (
                  <td className="table-data">{item.responses}</td>
                ) : null}
                {impression ? (
                  <td className="table-data">{item.impressions}</td>
                ) : null}
                {clicks ? <td className="table-data">{item.clicks}</td> : null}
                {revenue ? (
                  <td className="table-data">{item.revenue.toFixed(2)}</td>
                ) : null}
                {fillrate ? (
                  <td className="table-data">
                    {((item.requests / item.responses) * 100).toFixed(2)}
                  </td>
                ) : null}
                {CTR ? (
                  <td className="table-data">
                    {((item.clicks / item.impressions) * 100).toFixed(2)}
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
