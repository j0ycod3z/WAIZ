import { useState, useRef } from 'react';
import redux from 'seed/redux';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import { lcs } from "components/util/Locales"
import { Formik } from "formik";
import { API_URL } from "settings/Config";

import c from 'resources/css/project_admin/Bulk.module.css'

function Bulk(props) {
  const { url: redirectUrl, bulkLoad } = props;

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const fileRef = useRef();
  
  let url = (` ${API_URL}`).slice(1);
  let to = url.lastIndexOf('/');
  to = to === -1 ? url.length : to;
  url = url.substring(0, to);

  const handleInputFileChange = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const re = /(\.csv)$/i;
    if (file && re.exec(file.name)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Failed to load data");
    }
  };
  
  const onSubmit = () => {
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : null;
    const userId = parseInt(sessionStorage.getItem('id'));

    let data = input;
    let table = data.split("\n");

    table.shift();

    let projects = {};
    
    for (let row of table) {
      let cols = row.split(",");
      if (cols.length < 3) continue;
      let project = cols[0];
      let email = cols[1];
      let rol = cols[2].length > 4 ? cols[2] : "MEMBER";
      if (projects[project] == null) projects[project] = [];
      projects[project].push({
        email: email,
        rol: rol
      });
    }

    let res = [];
    for (let project in projects) {
      res.push({
        project: project,
        members: projects[project]
      });
    }

    setLoading(true);
    bulkLoad(userId, cohortId, res, () => {
      setLoading(false);
      window.location.href = redirectUrl;
    });
  };

  return (
    <div className={c.module}>
      <div className={c.header}>{lcs("bulk_load")}</div>
      <div className={c.content}>
        {loading &&
          <CircularProgress className={c.loading} size="20" />
        }
        <Formik
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={c.instructions}>
                {lcs("template_title")}
                <ol>
                  <li>{
                    lcs("template_notice_1")}: <a href={`${url}/static/template.csv`}>{lcs("download_template")}</a>
                  </li>
                  <li>{lcs("template_notice_2")}</li>
                  <li>{lcs("template_notice_3")}</li>
                </ol>
              </div>
              <input
                name="key"
                type="file"
                ref={fileRef}
                placeholder="Select a file"
                accept=".csv"
                className={cx(c.input)}
                onChange={handleInputFileChange}
                required
              />
              {error &&
                <div className={c.error}>
                  <div>{error}</div>
                </div>
              }
              <button type="submit" className={c.call}>
                {lcs("add")}
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default redux(Bulk);