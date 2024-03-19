import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/projects/Details.module.css";

const PROJECT  = `
{
  project {
    name
    description
    image
    isActive
    hasPhase1
    hasPhase21
    hasPhase22
    hasPhase23
    hasPhase24
    hasPhase25
    hasPhase3
    hasPhase4
    hasPhase5
    v4Ref
    canvasType2 { }
    admin { }
    cohort { }
    mentors { }
    members { }
    canvas { }
  }
}
`;

function ProjectDetails(props) {

  const { project_id }  = props.match.params;
  const qProject = useDetail(PROJECT, project_id);

  if (qProject.loading) return <Loading />;
  if (qProject.error) return "Error";

  const { project = {} } = qProject.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{project.name.toString()}</label>
      <br/>
      <label className={styles.lbl}>Description</label><br/>
      <label className={styles.txt}>{project.description.toString()}</label>
      <br/>
      <label className={styles.lbl}>Image</label><br/>
      <label className={styles.txt}>{project.image.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is active</label><br/>
      <label className={styles.txt}>{project.isActive.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase1</label><br/>
      <label className={styles.txt}>{project.hasPhase1.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase21</label><br/>
      <label className={styles.txt}>{project.hasPhase21.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase22</label><br/>
      <label className={styles.txt}>{project.hasPhase22.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase23</label><br/>
      <label className={styles.txt}>{project.hasPhase23.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase24</label><br/>
      <label className={styles.txt}>{project.hasPhase24.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase25</label><br/>
      <label className={styles.txt}>{project.hasPhase25.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase3</label><br/>
      <label className={styles.txt}>{project.hasPhase3.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase4</label><br/>
      <label className={styles.txt}>{project.hasPhase4.toString()}</label>
      <br/>
      <label className={styles.lbl}>Has phase5</label><br/>
      <label className={styles.txt}>{project.hasPhase5.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{project.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default ProjectDetails;