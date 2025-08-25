import React, { Component } from "react";
import redux from 'seed/redux';
import cx from "classnames";
import { getBrText } from 'components/util/Format'
import { lcs } from 'components/util/Locales';
import { hasProfilePermission } from 'components/util/Permissions';

import "react-bootstrap";
import c from "resources/css/users/Profile.module.css";

class Details extends Component
{
  render()
  {
    return (
      <div>
        {!this.state.editing
          ? this.renderDetailsCard()
          : this.renderDetailsCardForm()}
      </div>
    );
  }

  renderLaboralListForm(laborals)
  {
    const laboralsS = laborals.sort((l1, l2) => l1.id - l2.id)
    return laboralsS.map((l, index) =>
    {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <input
              type="text"
              className={cx("form-control")}
              name={"experienceItem" + index + 1}
              title={index}
              value={l.job}
              onChange={this.onLaboralJobChange}
              placeholder={lcs("job")} />
            <input
              type="text"
              className={cx("form-control")}
              name={"ExperienceItem" + index + 1}
              title={index}
              value={l.company}
              onChange={this.onLaboralCompanyChange}
              placeholder={lcs("company")} />
            <input
              type="text"
              className={cx("form-control")}
              name={"experienceItem" + index + 1}
              title={index}
              value={l.period}
              onChange={this.onLaboralPeriodChange}
              placeholder={lcs("period")} />
          </td>
          <td>
            <i class="fas fa-times-circle" style={{ color: "#a0a0a0" }}
              onClick={() => this.onDeleteLaboral(l.id)}></i>
          </td>
        </tr>
      );
    });
  }

  renderEducationFormList(educations)
  {
    const universities = this.props.universities;
    const educationsS = educations.sort((e1, e2) => e1.id - e2.id)
    let unis = {}
    for (let uni of universities) {
      if (unis[uni.country] == null) unis[uni.country] = []
      unis[uni.country].push(uni)
    }
    let countries = [];
    for (let cs in unis)
      countries.push(cs)

    const nor = str =>
      str.toUpperCase().replace(/_/g, " ")

    return educationsS.map((e, index) =>
    {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <select
              title={index}
              value={e.university_id}
              className={cx("form-control")}
              onChange={this.onEducationSchoolChange}>
              <option value="">{lcs("university")}</option>
              {
                countries.map(c =>
                  <optgroup label={nor(c)}>
                    {
                      unis[c]
                        .sort((e1, e2) => ('' + e1.name).localeCompare(e2.name))
                        .map(u =>
                          <option value={u.id}>{u.name}</option>
                        )
                    }
                  </optgroup>)
              }
            </select>


            <input
              type="text"
              className={cx("form-control")}
              name={"education" + index + 1}
              title={index}
              value={e.degree}
              onChange={this.onEducationDegreeChange}
              placeholder={lcs("degree")} />
            <input
              type="text"
              className={cx("form-control")}
              name={"education" + index + 1}
              title={index}
              value={e.period}
              onChange={this.onEducationPeriodChange}
              placeholder={lcs("period")} />
          </td>
          <td>
            <i class="fas fa-times-circle" style={{ color: "#a0a0a0" }}
              onClick={() => this.onDeleteEducation(e.id)}></i>
          </td>
        </tr>
      );
    });
  }

  renderLanguageFormList(languages)
  {
    return languages.map((l, index) =>
    {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <input
              type="text"
              className={cx("form-control")}
              name={"languages" + index + 1}
              placeholder={lcs("language")}
              title={index}
              value={l.name}
              onChange={this.onLanguageChange}
            />
          </td>
          <td>
            <i class="fas fa-times-circle" style={{ color: "#a0a0a0" }}
              onClick={() => this.onDeleteLanguage(l.id)}></i>
          </td>
        </tr>
      );
    });
  }

  renderDetailsCard()
  {
    const { profile } = this.props;

    const laborals = profile.laborals.map(l =>
      l.job != "" ?
        <div className={c.element} style={{ paddingBottom: "20px" }}>
          <div className={"font-weight-bold"}>{l.job}</div>
          <div>
            {l.company}{" "}
            <span className={cx("text-secondary")}>({l.period})</span>
          </div>
        </div> : null)

    const educations = profile.educations.map(e =>
      e.university != null ?
        <div className={c.element} style={{ paddingBottom: "20px" }}>
          <div className={"font-weight-bold"}>{e.university.name}</div>
          <div>
            {e.degree}{" "}
            <span className={cx("text-secondary")}>({e.period})</span>
          </div>
        </div> : null)

    const languages = profile.languages.map(l =>
      l.name != "" ?
        <div className={c.element} style={{ paddingBottom: "20px" }}>
          <div >{l.name}</div>
        </div> : null)

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <div className={c.cardSection}>
            <h5 className={cx("card-title", c.cardTitle)}>
              {lcs("short_bio")}
              {!this.state.editing && hasProfilePermission(profile, "EDIT") ? (
                <button onClick={() => this.onClickOpen("BIO")} className={cx(c.edit)}>
                  <i className="fas fa-edit" />
                </button>
              ) : null}
            </h5>
            <p className={cx("card-text")}>{getBrText(profile.bio)}</p>
          </div>

          <div className={cx(c.marginTop, c.paddingBottom)}>
            <h5 className={cx("card-title", c.cardTitle)}>
              {lcs("experience")}
              {!this.state.editing && hasProfilePermission(profile, "EDIT")?  (
                <button onClick={() => this.onClickOpen("WORK")} className={cx(c.edit)}>
                  <i className="fas fa-edit" />
                </button>
              ) : null}
            </h5>
            <div className={c.bigList}>
              {laborals}
            </div>
          </div>

          <div className={cx(c.marginTop, c.paddingBottom)}>
            <h5 className={cx("card-title", c.cardTitle)}>
              {lcs("what_have_you_made")}
              {!this.state.editing && hasProfilePermission(profile, "EDIT") ? (
                <button onClick={() => this.onClickOpen("MADE")} className={cx(c.edit)}>
                  <i className="fas fa-edit" />
                </button>
              ) : null}
            </h5>
            <p className={cx("card-text")}>{getBrText(profile.made)}</p>
          </div>

          <div className={cx(c.marginTop, c.paddingBottom)}>
            <h5 className={cx("card-title", c.cardTitle)}>
              {lcs("education")}
              {!this.state.editing && hasProfilePermission(profile, "EDIT") ? (
                <button onClick={() => this.onClickOpen("EDUCATION")} className={cx(c.edit)}>
                  <i className="fas fa-edit" />
                </button>
              ) : null}
            </h5>
            <div className={c.bigList}>
              {educations}
            </div>
          </div>

          <div className={cx(c.marginTop, c.paddingBottom)}>
            <h5 className={cx("card-title", c.cardTitle)}>
              {lcs("languages")}
              {!this.state.editing && hasProfilePermission(profile, "EDIT") ? (
                <button onClick={() => this.onClickOpen("LANGUAGES")} className={cx(c.edit)}>
                  <i className="fas fa-edit" />
                </button>
              ) : null}
            </h5>
            <div className={c.bigList}>
              {languages}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDetailsCardForm()
  {
    const { profile } = this.state;

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <form onSubmit={this.onSubmit}>
            {this.state.editSection == "BIO" ?
              <div className={c.cardSection}>
                <h5 className={cx("card-title", c.cardTitle)}>{lcs("short_bio")}</h5>
                <textarea
                  className={cx("form-control", c.input)}
                  name="description"
                  rows="4"
                  placeholder={lcs("write_bio")}
                  value={profile.bio}
                  onChange={this.onBioChange}
                />
                <div className={cx(c.marginTop, c.paddingBottom)}>
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              </div> : null
            }
            {this.state.editSection == "WORK" ?
              <div className={cx(c.marginTop, c.paddingBottom)}>
                <h5 className={cx("card-title", c.cardTitle)}>{lcs("experience")}</h5>

                <table className={cx(c.formTable, "table-striped")}>
                  <tbody>{this.renderLaboralListForm(profile.laborals)}</tbody>
                </table>
                <div className={cx(c.marginTop, c.paddingBottom)}>
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", c.buttonGreenLight)}
                    onClick={this.onAddLaboral}>
                    {lcs("add_work_experience")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              </div>
              : null}

            {this.state.editSection == "MADE" ?
              <div className={cx(c.marginTop, c.paddingBottom)}>
                <h5 className={cx("card-title", c.cardTitle)}>{lcs("what_have_you_made")}</h5>
                <textarea
                  className={cx("form-control", c.input)}
                  name="description"
                  rows="4"
                  placeholder={lcs("made_description")}
                  value={profile.made}
                  onChange={this.onMadeChange}
                />
                <div className={cx(c.marginTop, c.paddingBottom)}>
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              </div>
              : null}

            {this.state.editSection == "EDUCATION" ?
              <div className={cx(c.marginTop, c.paddingBottom)}>
                <h5 className={cx("card-title", c.cardTitle)}>{lcs("education")}</h5>
                <table className={cx(c.formTable, "table-striped")}>
                  <tbody>{this.renderEducationFormList(profile.educations)}</tbody>
                </table>
                <div className={cx(c.marginTop, c.paddingBottom)}>
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", c.buttonGreenLight)}
                    onClick={this.onAddEducation}>
                    {lcs("add_education")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              </div>
              : null}

            {this.state.editSection == "LANGUAGES" ?
              <div className={cx(c.marginTop, c.paddingBottom)}>
                <h5 className={cx("card-title", c.cardTitle)}>{lcs("languages")}</h5>
                <table className={cx(c.formTable, "table-striped")}>
                  <tbody>{this.renderLanguageFormList(profile.languages)}</tbody>
                </table>
                <div className={cx(c.marginTop, c.paddingBottom)}>
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", c.buttonGreenLight)}
                    onClick={this.onAddLanguage}>
                    {lcs("add_language")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
                <br />
                <br />
              </div>
              : null}
          </form>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      editing: false,
      profile: Object.assign({}, props.profile)
    };
    
    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
    this.onMadeChange = this.onMadeChange.bind(this);
    this.onLaboralJobChange = this.onLaboralJobChange.bind(this);
    this.onLaboralCompanyChange = this.onLaboralCompanyChange.bind(this);
    this.onLaboralPeriodChange = this.onLaboralPeriodChange.bind(this);
    this.onEducationSchoolChange = this.onEducationSchoolChange.bind(this);
    this.onEducationDegreeChange = this.onEducationDegreeChange.bind(this);
    this.onEducationPeriodChange = this.onEducationPeriodChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);

    this.onAddLaboral = this.onAddLaboral.bind(this);
    this.onAddLanguage = this.onAddLanguage.bind(this);
    this.onAddEducation = this.onAddEducation.bind(this);
    this.onDeleteLaboral = this.onDeleteLaboral.bind(this);
    this.onDeleteLanguage = this.onDeleteLanguage.bind(this);
    this.onDeleteEducation = this.onDeleteEducation.bind(this);
  }

  componentDidMount()
  {
    this.props.getUniversityList();
  }

  onSubmit = e =>
  {
    e.preventDefault();
    this.setState(prevState => ({
      editing: false,
    }));
    const profile = this.state.profile;
    this.updateLaborals();
    this.updateEducations();
    this.updateLanguages();

    let profileBody = {
      bio: profile.bio,
      made: profile.made
    };
    this.props.setProfile(profile.id, profileBody);
  }

  updateLaborals = () =>
  {
    const profile = this.state.profile;
    profile.laborals.map(l =>
      {
        let body = {
          job: l.job,
          company: l.company,
          period: l.period,
          company_description: "-"
        };
        this.props.setProfileLaboral(l.id, body);
      });
  }

  updateEducations = () =>
  {
    const profile = this.state.profile;
    profile.educations.map(e =>
      {
        let body = {
          school: e.school,
          degree: e.degree,
          period: e.period,
          university_id: e.university_id,
          activities_groups: "-"
        };
        this.props.setProfileEducation(e.id, body);
      });
  }

  updateLanguages = () =>
  {
    const profile = this.state.profile;
    profile.languages.map(l =>
      {
        let body = {
          name: l.name
        };
        this.props.setProfileLanguage(l.id, body)
      });
  }

  onBioChange = e =>
  {
    let profile = this.state.profile;
    profile.bio = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onMadeChange = e =>
  {
    let profile = this.state.profile;
    profile.made = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onLaboralJobChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let laboral = profile.laborals[index];
    laboral.job = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onLaboralCompanyChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let laboral = profile.laborals[index];
    laboral.company = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onLaboralPeriodChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let laboral = profile.laborals[index];
    laboral.period = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onEducationSchoolChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let education = profile.educations[index];
    education.university_id = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onEducationDegreeChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let education = profile.educations[index];
    education.degree = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onEducationPeriodChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let education = profile.educations[index];
    education.period = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onLanguageChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let language = profile.languages[index];
    language.name = e.target.value;
    this.setState({
      profile: profile
    })
  }


  onClickOpen = section =>
  {
    this.setState(prevState => ({
      editing: true,
      editSection: section
    }));
  }

  onClickCancel = e =>
  {
    this.setState(prevState => ({
      editing: false
    }));
  }

  onAddLaboral = e =>
  {
    const profile = this.state.profile;
    let body = {
      job: "",
      company: "",
      period: "",
      company_description: "-",
      profile_id: profile.id
    };
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.laborals = res.body.laborals;
        this.setState(s => ({ profile: profile }))
      });
    this.updateLaborals();
    setTimeout(() => this.props.saveProfileLaboral(body, callback), 1000);
  }
  onAddLanguage = e =>
  {
    const profile = this.state.profile;
    let body = {
      name: "",
      profile_id: profile.id
    };
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.languages = res.body.languages;
        this.setState(s => ({ profile: profile }))
      });
    this.updateLanguages();
    setTimeout(() => this.props.saveProfileLanguage(body, callback), 1000);
  }
  onAddEducation = e =>
  {
    const profile = this.state.profile;
    let body = {
      school: "",
      degree: "",
      period: "",
      activities_groups: "-",
      profile_id: profile.id
    };
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.educations = res.body.educations;
        this.setState(s => ({ profile: profile }))
      });
    this.updateEducations();
    setTimeout(() => this.props.saveProfileEducation(body, callback), 1000);
  }


  onDeleteLaboral = id =>
  {
    const profile = this.state.profile;
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.laborals = res.body.laborals;
        this.setState(s => ({ profile: profile }))
      });
    this.updateLaborals();
    this.props.deleteProfileLaboral(id, callback);
  }
  
  onDeleteLanguage = id =>
  {
    const profile = this.state.profile;
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.languages = res.body.languages;
        this.setState(s => ({ profile: profile }))
      });
    this.updateLanguages();
    this.props.deleteProfileLanguage(id, callback);

  }
  onDeleteEducation = id =>
  {
    const profile = this.state.profile;
    const callback = () =>
      this.props.setProfile(profile.id, {}, res =>
      {
        let profile = this.state.profile
        profile.educations = res.body.educations;
        this.setState(s => ({ profile: profile }))
      });
    this.updateEducations();
    this.props.deleteProfileEducation(id, callback);
  }

}


export default redux(Details);
