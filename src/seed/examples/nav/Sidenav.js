import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import styles from "resources/css/seed/examples/nav/Sidenav.module.css";

function Sidenav(props) {
  const { url } = props.match;
  return (
    <div className={styles.module}>
      <header className={styles.header}>
        Seed Builder
        <div className={styles.subtitle}>Panel</div>
      </header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to={`${url}/areas`}
              className={cx(styles.areaItem, styles.item)}
              activeClassName={styles.active}>
              Areas
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/area_helps`}
              className={cx(styles.areaHelpItem, styles.item)}
              activeClassName={styles.active}>
              Area helps
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/area_tags`}
              className={cx(styles.areaTagItem, styles.item)}
              activeClassName={styles.active}>
              Area tags
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/canvases`}
              className={cx(styles.canvasItem, styles.item)}
              activeClassName={styles.active}>
              Canvases
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/canvas_types`}
              className={cx(styles.canvasTypeItem, styles.item)}
              activeClassName={styles.active}>
              Canvas types
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/cohorts`}
              className={cx(styles.cohortItem, styles.item)}
              activeClassName={styles.active}>
              Cohorts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/comments`}
              className={cx(styles.commentItem, styles.item)}
              activeClassName={styles.active}>
              Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/deep_answers`}
              className={cx(styles.deepAnswerItem, styles.item)}
              activeClassName={styles.active}>
              Deep answers
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/deep_questions`}
              className={cx(styles.deepQuestionItem, styles.item)}
              activeClassName={styles.active}>
              Deep questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/dev_stages`}
              className={cx(styles.devStageItem, styles.item)}
              activeClassName={styles.active}>
              Dev stages
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/dev_stage_statuses`}
              className={cx(styles.devStageStatusItem, styles.item)}
              activeClassName={styles.active}>
              Dev stage statuses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/financial_indicators`}
              className={cx(styles.financialIndicatorItem, styles.item)}
              activeClassName={styles.active}>
              Financial indicators
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/fits`}
              className={cx(styles.fitItem, styles.item)}
              activeClassName={styles.active}>
              Fits
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/fit_statuses`}
              className={cx(styles.fitStatusItem, styles.item)}
              activeClassName={styles.active}>
              Fit statuses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/frontiers`}
              className={cx(styles.frontierItem, styles.item)}
              activeClassName={styles.active}>
              Frontiers
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/frontier_statuses`}
              className={cx(styles.frontierStatusItem, styles.item)}
              activeClassName={styles.active}>
              Frontier statuses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/hypotheses`}
              className={cx(styles.hypothesisItem, styles.item)}
              activeClassName={styles.active}>
              Hypotheses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/hypothesis_logs`}
              className={cx(styles.hypothesisLogItem, styles.item)}
              activeClassName={styles.active}>
              Hypothesis logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/insights`}
              className={cx(styles.insightItem, styles.item)}
              activeClassName={styles.active}>
              Insights
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/interviews`}
              className={cx(styles.interviewItem, styles.item)}
              activeClassName={styles.active}>
              Interviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/kb_courses`}
              className={cx(styles.kbCourseItem, styles.item)}
              activeClassName={styles.active}>
              Kb courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/kb_files`}
              className={cx(styles.kbFileItem, styles.item)}
              activeClassName={styles.active}>
              Kb files
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/kb_items`}
              className={cx(styles.kbItemItem, styles.item)}
              activeClassName={styles.active}>
              Kb items
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/kb_progresses`}
              className={cx(styles.kbProgressItem, styles.item)}
              activeClassName={styles.active}>
              Kb progresses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/kb_sections`}
              className={cx(styles.kbSectionItem, styles.item)}
              activeClassName={styles.active}>
              Kb sections
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/locales`}
              className={cx(styles.localeItem, styles.item)}
              activeClassName={styles.active}>
              Locales
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profiles`}
              className={cx(styles.profileItem, styles.item)}
              activeClassName={styles.active}>
              Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile_educations`}
              className={cx(styles.profileEducationItem, styles.item)}
              activeClassName={styles.active}>
              Profile educations
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile_laborals`}
              className={cx(styles.profileLaboralItem, styles.item)}
              activeClassName={styles.active}>
              Profile laborals
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile_languages`}
              className={cx(styles.profileLanguageItem, styles.item)}
              activeClassName={styles.active}>
              Profile languages
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile_primary_skills`}
              className={cx(styles.profilePrimarySkillItem, styles.item)}
              activeClassName={styles.active}>
              Profile primary skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile_secondary_skills`}
              className={cx(styles.profileSecondarySkillItem, styles.item)}
              activeClassName={styles.active}>
              Profile secondary skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/projects`}
              className={cx(styles.projectItem, styles.item)}
              activeClassName={styles.active}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/project_details`}
              className={cx(styles.projectDetailItem, styles.item)}
              activeClassName={styles.active}>
              Project details
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/project_features`}
              className={cx(styles.projectFeatureItem, styles.item)}
              activeClassName={styles.active}>
              Project features
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/translations`}
              className={cx(styles.translationItem, styles.item)}
              activeClassName={styles.active}>
              Translations
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/trls`}
              className={cx(styles.trlItem, styles.item)}
              activeClassName={styles.active}>
              Trls
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/trl_questions`}
              className={cx(styles.trlQuestionItem, styles.item)}
              activeClassName={styles.active}>
              Trl questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/trl_statuses`}
              className={cx(styles.trlStatusItem, styles.item)}
              activeClassName={styles.active}>
              Trl statuses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/universities`}
              className={cx(styles.universityItem, styles.item)}
              activeClassName={styles.active}>
              Universities
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/users`}
              className={cx(styles.userItem, styles.item)}
              activeClassName={styles.active}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/seed/examples/logout"}
              className={cx(styles.item)}
              activeClassName={styles.active}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidenav;