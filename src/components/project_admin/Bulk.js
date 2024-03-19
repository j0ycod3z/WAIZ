import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import { lcs, lc } from "components/util/Locales"
import { Formik, Field } from "formik";
import { API_URL } from "settings/Config";

import c from 'resources/css/project_admin/Bulk.module.css'


class Bulk extends React.Component
{
  render()
  {
    let url = (' ' + API_URL).slice(1);
    var to = url.lastIndexOf('/');
    to = to == -1 ? url.length : to;
    url = url.substring(0, to);

    return (
      <div className={c.module}>
        <div className={c.header}>
          {lcs("bulk_load")}
        </div>
        <div className={c.content}>
          {this.state.loading ?
            <CircularProgress className={c.loading} size="20" /> : null
          }
          <Formik
            onSubmit={this.onSubmit}
            render={props => (
              <form onSubmit={props.handleSubmit}>

                <div className={c.instructions}>
                  {lcs("template_title")}<br />
                  <ol>
                    <li>{lcs("template_notice_1")}
                      <br /><a href={`${url}/static/template.csv`}>{lcs("download_template")}</a></li>
                    <li>{lcs("template_notice_2")}</li>
                    <li>{lcs("template_notice_3")}</li>
                  </ol>
                </div>
                <input name="key"
                  type="file"
                  ref={this.fileRef}
                  placeholder="Select a file"
                  accept=".csv"
                  className={cx("form-control", c.input)}
                  onChange={this.handleInputFileChange}
                  required />

                {this.state.error ?
                  <div className={c.error + ' animated fadeIn'}><div> {this.state.error}</div></div> : null}
                <button type="submit" className={c.call}>{lcs("add")}</button>
              </form>
            )}

          />
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      input: "",
      loading: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.fileRef = React.createRef();
  }

  handleInputFileChange = e =>
  {
    e.preventDefault();
    let file = this.fileRef.current.files[0];
    let re = /(\.csv)$/i;
    if (file && re.exec(file.name)) {
      let reader = new FileReader();
      reader.onload = event =>
      {
        let data = event.target.result;
        this.setState({ input: data });
      }
      reader.readAsText(file);
    } else {
      alert("Failed to load data")
    }
  }

  onSubmit(values)
  {
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : null
    const userId = parseInt(sessionStorage.getItem('id'));

    let data = this.state.input;
    let table = data.split("\n");
    table.shift()
    let projects = {}
    for (let row of table) {
      let cols = row.split(",")
      if (cols.length < 3) continue;
      let project = cols[0];
      let email = cols[1];
      let rol = cols[2].length > 4 ? cols[2] : "MEMBER";
      if (projects[project] == null) projects[project] = []
      projects[project].push({
        email: email,
        rol: rol
      })
    }

    let res = []
    for (let project in projects) {
      res.push({
        project: project,
        members: projects[project]
      })
    }

    const callback = res =>
    {
      this.setState(s => ({ loading: false }));
      window.location.href = this.props.url;
    }
    this.setState(s => ({ loading: true }));
    this.props.bulkLoad(userId, cohortId, res, callback)
  }
}

export default redux(Bulk);