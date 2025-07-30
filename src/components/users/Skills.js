import React, { Component } from "react";
import cx from "classnames";
import { lcs, getLang } from 'components/util/Locales';
import { hasProfilePermission } from 'components/util/Permissions';

import "react-bootstrap";
import c from "resources/css/users/Profile.module.css";

class Skills extends Component
{
  render()
  {
    return (
      <div>
        {!this.state.editing
          ? this.renderSkillsCard()
          : this.renderSkillsCardForm()}
      </div>
    );
  }

  renderPrimaryFormList(primarySkills)
  {
    return primarySkills
      .sort((p1, p2) => p1.id - p2.id)
      .map((p, index) =>
      {
        return (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>

              {
                getLang() == "EN" ?
                  <select
                    type="text"
                    className={cx("form-control")}
                    name={"skill" + index + 1}
                    title={index}
                    value={p.type}
                    onChange={this.onPrimaryTypeChange} >
                    <option value="" selected="">---</option>
                    <optgroup label="Cognitive Abilities">
                      <option value="Cognitive Flexibility">Cognitive Flexibility</option>
                      <option value="Creativity">Creativity</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                      <option value="Problem Sensitivity">Problem Sensitivity</option>
                      <option value="Mathematical Reasoning">Mathematical Reasoning</option>
                      <option value="Visualization">Visualization</option>
                    </optgroup>
                    <optgroup label=" Physical Abilities">
                      <option value="Physical Strength">Physical Strength</option>
                      <option value="Manual Dexterity and Precision">Manual Dexterity and Precision</option>
                    </optgroup>
                    <optgroup label="Content Skills">
                      <option value="Active Learning">Active Learning</option>
                      <option value="Oral Expression">Oral Expression</option>
                      <option value="Reading Comprehension">Reading Comprehension</option>
                      <option value="Written Expression">Written Expression</option>
                      <option value="ICT Literacy">ICT Literacy</option>
                    </optgroup>
                    <optgroup label="Process Skills">
                      <option value="Active Listening">Active Listening</option>
                      <option value="Critical Thinking">Critical Thinking</option>
                      <option value="Monitoring Self and Others">Monitoring Self and Others</option>
                    </optgroup>
                    <optgroup label="Social Skills">
                      <option value="Coordinating with Others">Coordinating with Others</option>
                      <option value="Emotional Intelligence Negotiation">Emotional Intelligence Negotiation</option>
                      <option value="Persuasion">Persuasion</option>
                      <option value="Service Orientation">Service Orientation</option>
                      <option value="Training and Teaching Others">Training and Teaching Others</option>
                    </optgroup>
                    <optgroup label="System Skills">
                      <option value="Judgement and Decision-Making">Judgement and Decision-Making</option>
                      <option value="System Analysis">System Analysis</option>
                    </optgroup>
                    <optgroup label="Complex Problem Solving Skills">
                      <option value="Complex Problem Solving">Complex Problem Solving</option>
                    </optgroup>
                    <optgroup label="Resource Management Skills">
                      <option value="Management of Financial Resources">Management of Financial Resources</option>
                      <option value="Management of Material Resources">Management of Material Resources</option>
                      <option value="People Management">People Management</option>
                      <option value="Time Management">Time Management</option>
                    </optgroup>
                    <optgroup label="Technical Skills">
                      <option value="Equipment Maintenance and Repair">Equipment Maintenance and Repair</option>
                      <option value="Equipment Operation and Control">Equipment Operation and Control</option>
                      <option value="Programming">Programming</option>
                      <option value="Quality Control">Quality Control</option>
                      <option value="Technology and User Experience Design">Technology and User Experience Design</option>
                      <option value="Troubleshooting">Troubleshooting</option>
                    </optgroup>
                  </select> :

                  <select
                    type="text"
                    className={cx("form-control")}
                    name={"skill" + index + 1}
                    title={index}
                    value={p.type}
                    onChange={this.onPrimaryTypeChange} >
                    <option value="" selected="">---</option>
                    <optgroup label="Habilidades cognitivas">
                      <option value="Flexibilidad cognitiva"> Flexibilidad cognitiva </option>
                      <option value="Creativity"> Creatividad </option>
                      <option value="Razonamiento lógico"> Razonamiento lógico </option>
                      <option value="Sensibilidad del problema"> Sensibilidad del problema </option>
                      <option value="Razonamiento matemático"> Razonamiento matemático </option>
                      <option value="Visualization"> Visualización </option>
                    </optgroup>
                    <optgroup label="Habilidades físicas">
                      <option value="Fuerza física"> Fuerza física </option>
                      <option value="Manual Destreza y precisión"> Manual Destreza y precisión </option>
                    </optgroup>
                    <optgroup label="Habilidades de contenido">
                      <option value="Active Learning"> Active Learning </option>
                      <option value="Oral Expression"> Expresión oral </option>
                      <option value="Comprensión de lectura"> Comprensión de lectura </option>
                      <option value="Expresión escrita"> Expresión escrita </option>
                      <option value="Alfabetización en TIC"> Alfabetización en TIC </option>
                    </optgroup>
                    <optgroup label="Habilidades de proceso">
                      <option value="Active Listening"> Active Listening </option>
                      <option value="Critical Thinking"> Pensamiento crítico </option>
                      <option value="Supervisando a uno mismo y a otros"> Supervisando a uno mismo y a otros </option>
                    </optgroup>
                    <optgroup label="Habilidades sociales">
                      <option value="Coordinar con otros"> Coordinar con otros </option>
                      <option value="Negociación de inteligencia emocional"> Negociación de inteligencia emocional </option>
                      <option value="Persuasion"> Persuasión </option>
                      <option value="Orientación del servicio"> Orientación del servicio </option>
                      <option value="Capacitar y enseñar a otros"> Capacitar y enseñar a otros </option>
                    </optgroup>
                    <optgroup label="Habilidades del sistema">
                      <option value="Juicio y toma de decisiones"> Juicio y toma de decisiones </option>
                      <option value="Análisis de sistemas"> Análisis de sistemas</option>
                    </optgroup>
                    <optgroup label="Habilidades para resolver problemas complejos">
                      <option value="Solución de problemas complejos"> Solución de problemas complejos </option>
                    </optgroup>
                    <optgroup label="Habilidades de gestión de recursos">
                      <option value="Gestión de recursos financieros"> Gestión de recursos financieros </option>
                      <option value="Gestión de recursos materiales"> Gestión de recursos materiales </option>
                      <option value="Gestión de personas"> Gestión de personas </option>
                      <option value="Gestión del tiempo"> Gestión del tiempo </option>
                    </optgroup>
                    <optgroup label="Habilidades técnicas">
                      <option value="Mantenimiento y reparación de equipos"> Mantenimiento y reparación de equipos </option>
                      <option value="Operación y control del equipo"> Operación y control del equipo </option>
                      <option value="Programming"> Programación </option>
                      <option value="Control de calidad"> Control de calidad </option>
                      <option value="Diseño de tecnología y experiencia del usuario"> Diseño de tecnología y experiencia del usuario </option>
                      <option value="Solución de problemas"> Solución de problemas </option>
                    </optgroup>
                  </select>
              }
            </td >
            <td>
              <input
                type="number"
                className={cx("form-control")}
                name={"score" + index + 1}
                title={index}
                value={p.score == 0 ? null : p.score}
                placeholder="%"
                max={100}
                min={0}
                onChange={this.onPrimaryScoreChange}
              />
            </td>
          </tr >
        );
      });
  }

  renderSecondaryFormList(secondarySkills)
  {
    return secondarySkills
      .sort((p1, p2) => p1.id - p2.id)
      .map((s, index) =>
      {
        return (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>
              {
                getLang() == "EN" ?
                  <select
                    type="text"
                    className={cx("form-control")}
                    name={"skill" + index + 1}
                    title={index}
                    value={s.sector}
                    onChange={this.onSecondarySectorChange}>
                    <option value="">---</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Administrative / Secretarial">Administrative / Secretarial</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Aircraft Mechanic">Aircraft Mechanic</option>
                    <option value="Android Developer">Android Developer</option>
                    <option value="Architect">Architect</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Banking">Banking</option>
                    <option value="Barista">Barista</option>
                    <option value="Big Data">Big Data</option>
                    <option value="Biomedical Engineer">Biomedical Engineer</option>
                    <option value="Broadcaster">Broadcaster</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="Business Development">Business Development</option>
                    <option value="Business Intelligence">Business Intelligence</option>
                    <option value="Chef">Chef</option>
                    <option value="Civil Engineer">Civil Engineer</option>
                    <option value="Clinical Laboratory Technician">Clinical Laboratory Technician</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Computer Programming">Computer Programming</option>
                    <option value="Construction">Construction</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Dietician / Nutritionist">Dietician / Nutritionist</option>
                    <option value="Digital Media">Digital Media</option>
                    <option value="Executive">Executive</option>
                    <option value="Fashion Design">Fashion Design</option>
                    <option value="Finance">Finance</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Healthcare / Hospital Administration">Healthcare / Hospital Administration</option>
                    <option value="Hotel and Resort Management">Hotel and Resort Management</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="iOS Developer">iOS Developer</option>
                    <option value="IT Manager">IT Manager</option>
                    <option value="Journalist">Journalist</option>
                    <option value="Legal">Legal</option>
                    <option value="Management">Management</option>
                    <option value="Market Research Analyst">Market Research Analyst</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Personal Trainer">Personal Trainer</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Photography">Photography</option>
                    <option value="Public Health">Public Health</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Restaurant and Food Service">Restaurant and Food Service</option>
                    <option value="Retail">Retail</option>
                    <option value="Sales">Sales</option>
                    <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Software Developer">Software Developer</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Technical Support Engineer">Technical Support Engineer</option>
                    <option value="Television / Film Producer">Television / Film Producer</option>
                    <option value="Travel Agent / Coordinator">Travel Agent / Coordinator</option>
                    <option value="User Experience / User Interface">User Experience / User Interface</option>
                    <option value="Veterinary Technician">Veterinary Technician</option>
                    <option value="Wedding / Special Events Planner">Wedding / Special Events Planner</option>
                    <option value="Writing">Writing</option>
                  </select> :
                  <select
                    type="text"
                    className={cx("form-control")}
                    name={"skill" + index + 1}
                    title={index}
                    value={s.sector}
                    onChange={this.onSecondarySectorChange}>
                    <option value=""> --- </option>
                    <option value="Contabilidad"> Contabilidad </option>
                    <option value="Administrativo"> Administrativo </option>
                    <option value="Publicidad"> Publicidad </option>
                    <option value="Mecánico de aeronaves"> Mecánico de aeronaves </option>
                    <option value="Desarrollador de Android"> Desarrollador de Android </option>
                    <option value="Arquitecto"> Arquitecto </option>
                    <option value="Automovil"> Automovil </option>
                    <option value="Banca"> Banca </option>
                    <option value="Big Data"> Big Data </option>
                    <option value="Ingeniero biomédico"> Ingeniero biomédico </option>
                    <option value="Broadcaster"> Broadcaster </option>
                    <option value="Business Analista"> Business Analista </option>
                    <option value="Desarrollo de negocios"> Desarrollo de negocios </option>
                    <option value="Business Intelligence"> Business Intelligence </option>
                    <option value="Chef"> Chef </option>
                    <option value="Ingeniero Civil"> Ingeniero Civil</option>
                    <option value="Técnico de laboratorio clínico"> Técnico de laboratorio clínico </option>
                    <option value="Cloud Computing"> Cloud Computing </option>
                    <option value="Computer Programming"> Programación informática </option>
                    <option value="Construction"> Construcción </option>
                    <option value="Content Manager"> Content Manager </option>
                    <option value="Servicio al cliente"> Servicio al cliente </option>
                    <option value="Data Analyst"> Analista de datos </option>
                    <option value="Dentista"> Dentista </option>
                    <option value="Dietista / Nutricionista"> Dietista / Nutricionista </option>
                    <option value="Digital Media"> Medios digitales </option>
                    <option value="Executive"> Ejecutivo </option>
                    <option value="Diseño de moda"> Diseño de moda </option>
                    <option value="Finance"> Finanzas </option>
                    <option value="Diseño gráfico"> Diseño gráfico </option>
                    <option value="Cuidado de la Saludn"> Cuidado de la Salud </option>
                    <option value="Gestión de hoteles y complejos turísticos"> Gestión de hoteles y complejos turísticos </option>
                    <option value="Recursos humanos"> Recursos humanos </option>
                    <option value="Tecnología de la información"> Tecnología de la información </option>
                    <option value="iOS Developer"> iOS Developer </option>
                    <option value="IT Manager"> IT Manager </option>
                    <option value="Periodista"> Periodista </option>
                    <option value="Legal"> Legal </option>
                    <option value="Management"> Administración </option>
                    <option value="Market Research Analyst"> Analista de Investigación de Mercado </option>
                    <option value="Enfermería"> Enfermería </option>
                    <option value="Personal Trainer"> Entrenador personal </option>
                    <option value="Pharmacist"> Farmacéutico </option>
                    <option value="Photography"> Fotografía </option>
                    <option value=" Salud Pública"> Salud Pública </option>
                    <option value="Relaciones públicas"> Relaciones públicas </option>
                    <option value="Real Estate"> Real Estate </option>
                    <option value="Servicio de restaurante y comida"> Servicio de restaurante y comida </option>
                    <option value="Retail"> Retail </option>
                    <option value="Sales"> Ventas </option>
                    <option value="Optimización de motores de búsqueda (SEO)"> Optimización de motores de búsqueda (SEO) </option>
                    <option value="Social Media"> Social Media </option>
                    <option value="Software Developer"> Desarrollador de software </option>
                    <option value="Docencia"> Docencia </option>
                    <option value="Ingeniero de soporte técnico "> Ingeniero de soporte técnico </option>
                    <option value="Productor de televisión / cine"> Productor de televisión / cine </option>
                    <option value="Agente de viajes / Coordinador"> Agente de viajes / Coordinador </option>
                    <option value="Experiencia de usuario / Interfaz de usuario"> Experiencia de usuario / Interfaz de usuario </option>
                    <option value="Técnico veterinario"> Técnico veterinario </option>
                    <option value="Wedding / Planeador de eventos"> Wedding / Planeador de eventos </option>
                    <option value="Writing"> Escritura </option>
                  </select>
              }
            </td>
            <td>
              <select
                type="text"
                className={cx("form-control")}
                name={"skill" + index + 1}
                title={index}
                value={s.type}
                style={{ display: "none" }}
                onChange={this.onSecondaryTypeChange}
              >
                <option value="">---</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                className={cx("form-control")}
                name={"score" + index + 1}
                title={index}
                value={s.score == 0 ? null : s.score}
                placeholder="%"
                max={100}
                min={0}
                onChange={this.onSecondaryScoreChange}
              />
            </td>
          </tr >
        );
      });
  }

  renderSkillsCard()
  {
    const { profile } = this.props;

    const primarySkills = profile.primary_skills
      .sort((p1, p2) => p1.id - p2.id)
      .map(p =>
        p.type != "" ?
          <div>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>{p.type}</p>
            <div className={cx("progress", c.progress)}>
              <div
                className={cx("progress-bar", c.progressPrimary)}
                style={{ width: p.score + "%" }}
                role="progressbar"
                ariaValuenow="0"
                ariaValuemin="0"
                ariaValuemax="100"
              >{p.score + "%"}</div>
            </div>
          </div> : null)

    const secondarySkills = profile.secondary_skills
      .sort((p1, p2) => p1.id - p2.id)
      .map(s =>
        s.sector != "" ?
          <div>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>{s.sector}</p>
            <div className={cx("progress", c.progress)}>
              <div
                className={cx("progress-bar", c.progressPrimary)}
                style={{ width: s.score + "%" }}
                role="progressbar"
                ariaValuenow="0"
                ariaValuemin="0"
                ariaValuemax="100"
              >{s.score + "%"}</div>
            </div>
          </div> : null)

    return (
      <div className={cx("card", c.skillsHeader)}>
        <div>
          <h5 className={cx(c.title)}>
            {lcs("primary_skills")}
            {!this.state.editing && hasProfilePermission(profile, "EDIT") ? (
              <button
                onClick={this.onClickOpen}
                className={cx(c.editLight)}
              >
                <i className="fas fa-edit" />
              </button>
            ) : (
                ""
              )}
          </h5>
          {primarySkills}
          <br />
          <h5 className={cx(c.title)}>{lcs("secondary_skills")}</h5>
          {secondarySkills}
          <br />
        </div>
      </div>
    );
  }

  renderSkillsCardForm()
  {
    const { profile } = this.state;

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <form onSubmit={this.onSubmit}>
            <div>
              <h5 className={cx(c.title)}>{lcs("primary_skills")}</h5>
              <table className={cx(c.formTable, "table-striped")}>
                <tbody>{this.renderPrimaryFormList(profile.primary_skills)}</tbody>
              </table>
              <br />
              <br />
              <br />
              <h5 className={cx(c.title)}>{lcs("secondary_skills")}</h5>
              <table className={cx(c.formTable, "table-striped")}>
                <tbody>{this.renderSecondaryFormList(profile.secondary_skills)}</tbody>
              </table>
              <br />
              <br />
              <br />
            </div>
            <div className={cx("card-text")}>
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
    this.onPrimaryTypeChange = this.onPrimaryTypeChange.bind(this);
    this.onPrimaryScoreChange = this.onPrimaryScoreChange.bind(this);
    this.onSecondarySectorChange = this.onSecondarySectorChange.bind(this);
    this.onSecondaryTypeChange = this.onSecondaryTypeChange.bind(this);
    this.onSecondaryScoreChange = this.onSecondaryScoreChange.bind(this);
  }

  onSubmit = e =>
  {
    e.preventDefault();
    this.setState(prevState => ({
      editing: false,
    }));
    const profile = this.state.profile;
    const primarySkills = profile.primary_skills;
    const secondarySkills = profile.secondary_skills;

    const callback = () =>
      this.props.setProfile({})

    primarySkills.map(p =>
    {
      let body = {
        type: p.type,
        score: p.score
      };
      this.props.setProfilePrimarySkill(p.id, body, callback);
    });

    secondarySkills.map(s =>
    {
      let body = {
        sector: s.sector,
        type: s.type,
        score: s.score
      };
      this.props.setProfileSecondarySkill(s.id, body, callback);
    });
  }

  onPrimaryTypeChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let primary_skill = profile.primary_skills[index];
    primary_skill.type = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onPrimaryScoreChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let primary_skill = profile.primary_skills[index];
    primary_skill.score = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onSecondarySectorChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let secondary_skill = profile.secondary_skills[index];
    secondary_skill.sector = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onSecondaryTypeChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let secondary_skill = profile.secondary_skills[index];
    secondary_skill.type = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onSecondaryScoreChange = e =>
  {
    let index = parseInt(e.target.title)
    let profile = this.state.profile;
    let secondary_skill = profile.secondary_skills[index];
    secondary_skill.score = e.target.value;
    this.setState({
      profile: profile
    })
  }

  onClickOpen = e =>
  {
    this.setState(prevState => ({
      editing: true
    }));
  }

  onClickCancel = e =>
  {
    this.setState(prevState => ({
      editing: false
    }));
  }
}

export default Skills;
