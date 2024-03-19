import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';
import { lcs, lc } from "components/util/Locales"
import Switch from '@material-ui/core/Switch';
import Loading from 'seed/components/helpers/Loading'

import c from 'resources/css/navigation/PhaseSelect.module.css'

class PhaseSelect extends React.Component
{

  render()
  {
    let projectId = localStorage.getItem('projectId');
    let project = Util.get(this.props.projects, projectId);
    if (project == null)
      return <Loading />;

    let canvas1 = Util.find(project.canvas, c => c.type.type == "SYSTEMIC");
    let canvas21 = Util.find(project.canvas, c => c.type.type == "BMC");
    let canvas22 = Util.find(project.canvas, c => c.type.type == "BASIC");
    let canvas23 = Util.find(project.canvas, c => c.type.type == "IMPACT");
    let canvas24 = Util.find(project.canvas, c => c.type.type == "PUBLIC");
    let canvas25 = Util.find(project.canvas, c => c.type.type == "BLANK");
    let canvas3 = Util.find(project.canvas, c => c.type.type == "EXO");

    return (
      <div className={c.module}>
        <div className={c.header}>
          {lcs("phases")}
        </div>
        <div className={c.content}>

          <div className={c.item}>
            <div className={c.title}>{lcs("phase_1")}</div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas1.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase1}
                onChange={this.onChangePhase1} />
            </div>
          </div>

          <div className={c.item}>
            <div className={c.title}>{lcs("phase_2")}</div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas21.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase21}
                onChange={this.onChangePhase21} />
            </div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas22.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase22}
                onChange={this.onChangePhase22} />
            </div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas23.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase23}
                onChange={this.onChangePhase23} />
            </div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas24.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase24}
                onChange={this.onChangePhase24} />
            </div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas25.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase25}
                onChange={this.onChangePhase25} />
            </div>
          </div>

          <div className={c.item}>
            <div className={c.title}>{lcs("phase_3")}</div>
            <div className={c.subitem}>
              <div className={c.description}>{lc(canvas3.type.l_name)}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase3}
                onChange={this.onChangePhase3} />
            </div>
          </div>

          <div className={c.item}>
            <div className={c.title}>{lcs("phase_4")}</div>
            <div className={c.subitem}>
              <div className={c.description}>{lcs("incubation_acceleration")}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase4}
                onChange={this.onChangePhase4} />
            </div>
          </div>

          <div className={c.item}>
            <div className={c.title}>{lcs("phase_5")}</div>
            <div className={c.subitem}>
              <div className={c.description}>{lcs("scaling")}</div>
              <Switch
                className={c.switch}
                checked={project.has_phase5}
                onChange={this.onChangePhase5} />
            </div>
          </div>

        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onChangePhase1 = this.onChangePhase1.bind(this);
    this.onChangePhase21 = this.onChangePhase21.bind(this);
    this.onChangePhase22 = this.onChangePhase22.bind(this);
    this.onChangePhase23 = this.onChangePhase23.bind(this);
    this.onChangePhase24 = this.onChangePhase24.bind(this);
    this.onChangePhase25 = this.onChangePhase25.bind(this);
    this.onChangePhase3 = this.onChangePhase3.bind(this);
    this.onChangePhase4 = this.onChangePhase4.bind(this);
    this.onChangePhase5 = this.onChangePhase5.bind(this);
  }

  componentDidMount()
  {
    const { projectId } = this.props;
    this.props.getProjectDetailList({ project: projectId });
  }

  onChangePhase1()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase1: !project.has_phase1
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase21()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase21: !project.has_phase21
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase22()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase22: !project.has_phase22
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase23()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase23: !project.has_phase23
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase24()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase24: !project.has_phase24
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase25()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase25: !project.has_phase25
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase3()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase3: !project.has_phase3
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase4()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase4: !project.has_phase4
    };
    this.props.setProject(projectId, body);
  }

  onChangePhase5()
  {
    const { projects = [], projectId } = this.props;
    let project = Util.get(projects, projectId);
    let body = {
      has_phase5: !project.has_phase5
    };
    this.props.setProject(projectId, body);
  }

}

export default redux(PhaseSelect);