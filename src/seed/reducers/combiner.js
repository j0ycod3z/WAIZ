/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import { combineReducers } from "redux";

import Areas from "seed/reducers/areas";
import AreaHelps from "seed/reducers/areaHelps";
import AreaTags from "seed/reducers/areaTags";
import Canvases from "seed/reducers/canvases";
import CanvasTypes from "seed/reducers/canvasTypes";
import Cohorts from "seed/reducers/cohorts";
import Comments from "seed/reducers/comments";
import DeepAnswers from "seed/reducers/deepAnswers";
import DeepQuestions from "seed/reducers/deepQuestions";
import DevStages from "seed/reducers/devStages";
import DevStageStatuses from "seed/reducers/devStageStatuses";
import FinancialIndicators from "seed/reducers/financialIndicators";
import Fits from "seed/reducers/fits";
import FitStatuses from "seed/reducers/fitStatuses";
import Frontiers from "seed/reducers/frontiers";
import FrontierStatuses from "seed/reducers/frontierStatuses";
import Hypotheses from "seed/reducers/hypotheses";
import HypothesisLogs from "seed/reducers/hypothesisLogs";
import Insights from "seed/reducers/insights";
import Interviews from "seed/reducers/interviews";
import KbCourses from "seed/reducers/kbCourses";
import KbFiles from "seed/reducers/kbFiles";
import KbItems from "seed/reducers/kbItems";
import KbProgresses from "seed/reducers/kbProgresses";
import KbSections from "seed/reducers/kbSections";
import Locales from "seed/reducers/locales";
import Profiles from "seed/reducers/profiles";
import ProfileEducations from "seed/reducers/profileEducations";
import ProfileLaborals from "seed/reducers/profileLaborals";
import ProfileLanguages from "seed/reducers/profileLanguages";
import ProfilePrimarySkills from "seed/reducers/profilePrimarySkills";
import ProfileSecondarySkills from "seed/reducers/profileSecondarySkills";
import Projects from "seed/reducers/projects";
import ProjectDetails from "seed/reducers/projectDetails";
import ProjectFeatures from "seed/reducers/projectFeatures";
import Translations from "seed/reducers/translations";
import Trls from "seed/reducers/trls";
import TrlQuestions from "seed/reducers/trlQuestions";
import TrlStatuses from "seed/reducers/trlStatuses";
import Universities from "seed/reducers/universities";
import Users from "seed/reducers/users";
import Auth from "seed/reducers/helpers/auth";

const reducers = {
  auth: new Auth().reducer,
  areas: new Areas().reducer,
  areaHelps: new AreaHelps().reducer,
  areaTags: new AreaTags().reducer,
  canvases: new Canvases().reducer,
  canvasTypes: new CanvasTypes().reducer,
  cohorts: new Cohorts().reducer,
  comments: new Comments().reducer,
  deepAnswers: new DeepAnswers().reducer,
  deepQuestions: new DeepQuestions().reducer,
  devStages: new DevStages().reducer,
  devStageStatuses: new DevStageStatuses().reducer,
  financialIndicators: new FinancialIndicators().reducer,
  fits: new Fits().reducer,
  fitStatuses: new FitStatuses().reducer,
  frontiers: new Frontiers().reducer,
  frontierStatuses: new FrontierStatuses().reducer,
  hypotheses: new Hypotheses().reducer,
  hypothesisLogs: new HypothesisLogs().reducer,
  insights: new Insights().reducer,
  interviews: new Interviews().reducer,
  kbCourses: new KbCourses().reducer,
  kbFiles: new KbFiles().reducer,
  kbItems: new KbItems().reducer,
  kbProgresses: new KbProgresses().reducer,
  kbSections: new KbSections().reducer,
  locales: new Locales().reducer,
  profiles: new Profiles().reducer,
  profileEducations: new ProfileEducations().reducer,
  profileLaborals: new ProfileLaborals().reducer,
  profileLanguages: new ProfileLanguages().reducer,
  profilePrimarySkills: new ProfilePrimarySkills().reducer,
  profileSecondarySkills: new ProfileSecondarySkills().reducer,
  projects: new Projects().reducer,
  projectDetails: new ProjectDetails().reducer,
  projectFeatures: new ProjectFeatures().reducer,
  translations: new Translations().reducer,
  trls: new Trls().reducer,
  trlQuestions: new TrlQuestions().reducer,
  trlStatuses: new TrlStatuses().reducer,
  universities: new Universities().reducer,
  users: new Users().reducer,
};

export default combineReducers(reducers);