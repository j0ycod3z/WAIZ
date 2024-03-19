import React, { useEffect } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
import Areas from "seed/examples/areas/Areas";
import AreaHelps from "seed/examples/area_helps/AreaHelps";
import AreaTags from "seed/examples/area_tags/AreaTags";
import Canvases from "seed/examples/canvases/Canvases";
import CanvasTypes from "seed/examples/canvas_types/CanvasTypes";
import Cohorts from "seed/examples/cohorts/Cohorts";
import Comments from "seed/examples/comments/Comments";
import DeepAnswers from "seed/examples/deep_answers/DeepAnswers";
import DeepQuestions from "seed/examples/deep_questions/DeepQuestions";
import DevStages from "seed/examples/dev_stages/DevStages";
import DevStageStatuses from "seed/examples/dev_stage_statuses/DevStageStatuses";
import FinancialIndicators from "seed/examples/financial_indicators/FinancialIndicators";
import Fits from "seed/examples/fits/Fits";
import FitStatuses from "seed/examples/fit_statuses/FitStatuses";
import Frontiers from "seed/examples/frontiers/Frontiers";
import FrontierStatuses from "seed/examples/frontier_statuses/FrontierStatuses";
import Hypotheses from "seed/examples/hypotheses/Hypotheses";
import HypothesisLogs from "seed/examples/hypothesis_logs/HypothesisLogs";
import Insights from "seed/examples/insights/Insights";
import Interviews from "seed/examples/interviews/Interviews";
import KbCourses from "seed/examples/kb_courses/KbCourses";
import KbFiles from "seed/examples/kb_files/KbFiles";
import KbItems from "seed/examples/kb_items/KbItems";
import KbProgresses from "seed/examples/kb_progresses/KbProgresses";
import KbSections from "seed/examples/kb_sections/KbSections";
import Locales from "seed/examples/locales/Locales";
import Profiles from "seed/examples/profiles/Profiles";
import ProfileEducations from "seed/examples/profile_educations/ProfileEducations";
import ProfileLaborals from "seed/examples/profile_laborals/ProfileLaborals";
import ProfileLanguages from "seed/examples/profile_languages/ProfileLanguages";
import ProfilePrimarySkills from "seed/examples/profile_primary_skills/ProfilePrimarySkills";
import ProfileSecondarySkills from "seed/examples/profile_secondary_skills/ProfileSecondarySkills";
import Projects from "seed/examples/projects/Projects";
import ProjectDetails from "seed/examples/project_details/ProjectDetails";
import ProjectFeatures from "seed/examples/project_features/ProjectFeatures";
import Translations from "seed/examples/translations/Translations";
import Trls from "seed/examples/trls/Trls";
import TrlQuestions from "seed/examples/trl_questions/TrlQuestions";
import TrlStatuses from "seed/examples/trl_statuses/TrlStatuses";
import Universities from "seed/examples/universities/Universities";
import Users from "seed/examples/users/Users";
import Sidenav from "seed/examples/nav/Sidenav";
import Topnav from "seed/examples/nav/Topnav";
import styles from "resources/css/seed/examples/Home.module.css";

function Home(props) {

  const { path } = props.match;
   useEffect(() => {
     const userId = sessionStorage.getItem("id");
     if (userId == null)
       return props.history.replace("/examples/login");
   });

  return (
    <div className={styles.module}>
      <div className={styles.drawer}>
        <div className={styles.sidenav}>
          <Route path={`${path}`}
            component={Sidenav} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.topnav}>
          <Route path={`${path}`}
            component={Topnav} />
        </div>
        <div className={styles.content}>
           <Switch>
             <Route path={`${path}/areas`}
               component={Areas } />
             <Route path={`${path}/area_helps`}
               component={AreaHelps } />
             <Route path={`${path}/area_tags`}
               component={AreaTags } />
             <Route path={`${path}/canvases`}
               component={Canvases } />
             <Route path={`${path}/canvas_types`}
               component={CanvasTypes } />
             <Route path={`${path}/cohorts`}
               component={Cohorts } />
             <Route path={`${path}/comments`}
               component={Comments } />
             <Route path={`${path}/deep_answers`}
               component={DeepAnswers } />
             <Route path={`${path}/deep_questions`}
               component={DeepQuestions } />
             <Route path={`${path}/dev_stages`}
               component={DevStages } />
             <Route path={`${path}/dev_stage_statuses`}
               component={DevStageStatuses } />
             <Route path={`${path}/financial_indicators`}
               component={FinancialIndicators } />
             <Route path={`${path}/fits`}
               component={Fits } />
             <Route path={`${path}/fit_statuses`}
               component={FitStatuses } />
             <Route path={`${path}/frontiers`}
               component={Frontiers } />
             <Route path={`${path}/frontier_statuses`}
               component={FrontierStatuses } />
             <Route path={`${path}/hypotheses`}
               component={Hypotheses } />
             <Route path={`${path}/hypothesis_logs`}
               component={HypothesisLogs } />
             <Route path={`${path}/insights`}
               component={Insights } />
             <Route path={`${path}/interviews`}
               component={Interviews } />
             <Route path={`${path}/kb_courses`}
               component={KbCourses } />
             <Route path={`${path}/kb_files`}
               component={KbFiles } />
             <Route path={`${path}/kb_items`}
               component={KbItems } />
             <Route path={`${path}/kb_progresses`}
               component={KbProgresses } />
             <Route path={`${path}/kb_sections`}
               component={KbSections } />
             <Route path={`${path}/locales`}
               component={Locales } />
             <Route path={`${path}/profiles`}
               component={Profiles } />
             <Route path={`${path}/profile_educations`}
               component={ProfileEducations } />
             <Route path={`${path}/profile_laborals`}
               component={ProfileLaborals } />
             <Route path={`${path}/profile_languages`}
               component={ProfileLanguages } />
             <Route path={`${path}/profile_primary_skills`}
               component={ProfilePrimarySkills } />
             <Route path={`${path}/profile_secondary_skills`}
               component={ProfileSecondarySkills } />
             <Route path={`${path}/projects`}
               component={Projects } />
             <Route path={`${path}/project_details`}
               component={ProjectDetails } />
             <Route path={`${path}/project_features`}
               component={ProjectFeatures } />
             <Route path={`${path}/translations`}
               component={Translations } />
             <Route path={`${path}/trls`}
               component={Trls } />
             <Route path={`${path}/trl_questions`}
               component={TrlQuestions } />
             <Route path={`${path}/trl_statuses`}
               component={TrlStatuses } />
             <Route path={`${path}/universities`}
               component={Universities } />
             <Route path={`${path}/users`}
               component={Users } />
           </Switch>
        </div>
      </div>
    </div>
   );
}

export default Home;