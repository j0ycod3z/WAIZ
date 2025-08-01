import { useEffect } from 'react';
import redux from 'seed/redux';
import { lcs, lc } from "components/util/Locales"
import Switch from '@material-ui/core/Switch';
import Loading from 'seed/components/helpers/Loading'

import c from 'resources/css/navigation/PhaseSelect.module.css'

function PhaseSelect(props) {
  const { 
    projects = [], 
    projectId, 
    getProjectDetailList, 
    setProject 
  } = props;

  const localProjectId = localStorage.getItem('projectId');
  const project = projects.find((proj) => proj.id == localProjectId);

  useEffect(() => {
    if (projectId) {
      getProjectDetailList({ project: projectId });
    }
  }, [getProjectDetailList, projectId]);

  if (project == null) return <Loading />;
  const { canvas } = project;

  const canvas1 = canvas.find((c) => c.type.type === "SYSTEMIC");
  const canvas21 = canvas.find((c) => c.type.type === "BMC");
  const canvas22 = canvas.find((c) => c.type.type === "BASIC");
  const canvas23 = canvas.find((c) => c.type.type === "IMPACT");
  const canvas24 = canvas.find((c) => c.type.type === "PUBLIC");
  const canvas25 = canvas.find((c) => c.type.type === "BLANK");
  const canvas3 = canvas.find((c) => c.type.type === "EXO");

  const onChangePhase1 = () => {
    const body = { has_phase1: !project.has_phase1 };
    setProject(projectId, body);
  };

  const onChangePhase21 = () => {
    const body = { has_phase21: !project.has_phase21 };
    setProject(projectId, body);
  };

  const onChangePhase22 = () => {
    const body = { has_phase22: !project.has_phase22 };
    setProject(projectId, body);
  };

  const onChangePhase23 = () => {
    const body = { has_phase23: !project.has_phase23 };
    setProject(projectId, body);
  };

  const onChangePhase24 = () => {
    const body = { has_phase24: !project.has_phase24 };
    setProject(projectId, body);
  };

  const onChangePhase25 = () => {
    const body = { has_phase25: !project.has_phase25 };
    setProject(projectId, body);
  };

  const onChangePhase3 = () => {
    const body = { has_phase3: !project.has_phase3 };
    setProject(projectId, body);
  };

  const onChangePhase4 = () => {
    const body = { has_phase4: !project.has_phase4 };
    setProject(projectId, body);
  };

  const onChangePhase5 = () => {
    const body = { has_phase5: !project.has_phase5 };
    setProject(projectId, body);
  };

  return (
    <div className={c.module}>
      <div className={c.header}>{lcs("phases")}</div>
      <div className={c.content}>
        <div className={c.item}>
          <div className={c.title}>{lcs("phase_1")}</div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas1.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase1} onChange={onChangePhase1}/>
          </div>
        </div>
  
        <div className={c.item}>
          <div className={c.title}>{lcs("phase_2")}</div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas21.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase21} onChange={onChangePhase21}/>
          </div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas22.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase22} onChange={onChangePhase22}/>
          </div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas23.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase23} onChange={onChangePhase23}/>
          </div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas24.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase24} onChange={onChangePhase24}/>
          </div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas25.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase25} onChange={onChangePhase25}/>
          </div>
        </div>
  
        <div className={c.item}>
          <div className={c.title}>{lcs("phase_3")}</div>
          <div className={c.subitem}>
            <div className={c.description}>{lc(canvas3.type.l_name)}</div>
            <Switch className={c.switch} checked={project.has_phase3} onChange={onChangePhase3}/>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.title}>{lcs("phase_4")}</div>
          <div className={c.subitem}>
            <div className={c.description}>{lcs("incubation_acceleration")}</div>
            <Switch className={c.switch} checked={project.has_phase4} onChange={onChangePhase4}/>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.title}>{lcs("phase_5")}</div>
          <div className={c.subitem}>
            <div className={c.description}>{lcs("scaling")}</div>
            <Switch className={c.switch} checked={project.has_phase5} onChange={onChangePhase5}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(PhaseSelect);