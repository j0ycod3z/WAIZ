/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import * as Util from "seed/util";
import defs from "actions/defs";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import _AreaActions from "seed/actions/areas";
import _AreaHelpActions from "seed/actions/areaHelps";
import _AreaTagActions from "seed/actions/areaTags";
import _CanvasActions from "seed/actions/canvases";
import _CanvasTypeActions from "seed/actions/canvasTypes";
import _CohortActions from "seed/actions/cohorts";
import _CommentActions from "seed/actions/comments";
import _DeepAnswerActions from "seed/actions/deepAnswers";
import _DeepQuestionActions from "seed/actions/deepQuestions";
import _DevStageActions from "seed/actions/devStages";
import _DevStageStatusActions from "seed/actions/devStageStatuses";
import _FinancialIndicatorActions from "seed/actions/financialIndicators";
import _FitActions from "seed/actions/fits";
import _FitStatusActions from "seed/actions/fitStatuses";
import _FrontierActions from "seed/actions/frontiers";
import _FrontierStatusActions from "seed/actions/frontierStatuses";
import _HypothesisActions from "seed/actions/hypotheses";
import _HypothesisLogActions from "seed/actions/hypothesisLogs";
import _InsightActions from "seed/actions/insights";
import _InterviewActions from "seed/actions/interviews";
import _KbCourseActions from "seed/actions/kbCourses";
import _KbFileActions from "seed/actions/kbFiles";
import _KbItemActions from "seed/actions/kbItems";
import _KbProgressActions from "seed/actions/kbProgresses";
import _KbSectionActions from "seed/actions/kbSections";
import _LocaleActions from "seed/actions/locales";
import _ProfileActions from "seed/actions/profiles";
import _ProfileEducationActions from "seed/actions/profileEducations";
import _ProfileLaboralActions from "seed/actions/profileLaborals";
import _ProfileLanguageActions from "seed/actions/profileLanguages";
import _ProfilePrimarySkillActions from "seed/actions/profilePrimarySkills";
import _ProfileSecondarySkillActions from "seed/actions/profileSecondarySkills";
import _ProjectActions from "seed/actions/projects";
import _ProjectDetailActions from "seed/actions/projectDetails";
import _ProjectFeatureActions from "seed/actions/projectFeatures";
import _TranslationActions from "seed/actions/translations";
import _TrlActions from "seed/actions/trls";
import _TrlQuestionActions from "seed/actions/trlQuestions";
import _TrlStatusActions from "seed/actions/trlStatuses";
import _UniversityActions from "seed/actions/universities";
import _UserActions from "seed/actions/users";
import ProfileActions from "actions/profiles";
import ProjectActions from "actions/projects";
import CanvasActions from "actions/canvases";
import CanvasTypeActions from "actions/canvasTypes";
import CohortActions from "actions/cohorts";
import HypothesisActions from "actions/hypotheses";
import AreaHelpActions from "actions/areaHelps";
import DeepQuestionActions from "actions/deepQuestions";
import KbItemActions from "actions/kbItems";
import KbCourseActions from "actions/kbCourses";
import KbSectionActions from "actions/kbSections";
import TrlActions from "actions/trls";
import ProjectDetailActions from "actions/projectDetails";
import TrlQuestionActions from "actions/trlQuestions";
import DevStageActions from "actions/devStages";
import FitActions from "actions/fits";
import FrontierActions from "actions/frontiers";
import UserActions from "actions/users";
import AuthActions from "seed/actions/helpers/auth";
import FileActions from "seed/helpers/files";
const areas = new _AreaActions();
const areaHelps = new AreaHelpActions();
const areaTags = new _AreaTagActions();
const canvases = new CanvasActions();
const canvasTypes = new CanvasTypeActions();
const cohorts = new CohortActions();
const comments = new _CommentActions();
const deepAnswers = new _DeepAnswerActions();
const deepQuestions = new DeepQuestionActions();
const devStages = new DevStageActions();
const devStageStatuses = new _DevStageStatusActions();
const financialIndicators = new _FinancialIndicatorActions();
const fits = new FitActions();
const fitStatuses = new _FitStatusActions();
const frontiers = new FrontierActions();
const frontierStatuses = new _FrontierStatusActions();
const hypotheses = new HypothesisActions();
const hypothesisLogs = new _HypothesisLogActions();
const insights = new _InsightActions();
const interviews = new _InterviewActions();
const kbCourses = new KbCourseActions();
const kbFiles = new _KbFileActions();
const kbItems = new KbItemActions();
const kbProgresses = new _KbProgressActions();
const kbSections = new KbSectionActions();
const locales = new _LocaleActions();
const profiles = new ProfileActions();
const profileEducations = new _ProfileEducationActions();
const profileLaborals = new _ProfileLaboralActions();
const profileLanguages = new _ProfileLanguageActions();
const profilePrimarySkills = new _ProfilePrimarySkillActions();
const profileSecondarySkills = new _ProfileSecondarySkillActions();
const projects = new ProjectActions();
const projectDetails = new ProjectDetailActions();
const projectFeatures = new _ProjectFeatureActions();
const translations = new _TranslationActions();
const trls = new TrlActions();
const trlQuestions = new TrlQuestionActions();
const trlStatuses = new _TrlStatusActions();
const universities = new _UniversityActions();
const users = new UserActions();
const auth = new AuthActions();
const files = new FileActions();

const actions = [
  {
    className: _AreaActions,
    object: areas
  },
  {
    className: _AreaHelpActions,
    object: areaHelps
  },
  {
    className: _AreaTagActions,
    object: areaTags
  },
  {
    className: _CanvasActions,
    object: canvases
  },
  {
    className: _CanvasTypeActions,
    object: canvasTypes
  },
  {
    className: _CohortActions,
    object: cohorts
  },
  {
    className: _CommentActions,
    object: comments
  },
  {
    className: _DeepAnswerActions,
    object: deepAnswers
  },
  {
    className: _DeepQuestionActions,
    object: deepQuestions
  },
  {
    className: _DevStageActions,
    object: devStages
  },
  {
    className: _DevStageStatusActions,
    object: devStageStatuses
  },
  {
    className: _FinancialIndicatorActions,
    object: financialIndicators
  },
  {
    className: _FitActions,
    object: fits
  },
  {
    className: _FitStatusActions,
    object: fitStatuses
  },
  {
    className: _FrontierActions,
    object: frontiers
  },
  {
    className: _FrontierStatusActions,
    object: frontierStatuses
  },
  {
    className: _HypothesisActions,
    object: hypotheses
  },
  {
    className: _HypothesisLogActions,
    object: hypothesisLogs
  },
  {
    className: _InsightActions,
    object: insights
  },
  {
    className: _InterviewActions,
    object: interviews
  },
  {
    className: _KbCourseActions,
    object: kbCourses
  },
  {
    className: _KbFileActions,
    object: kbFiles
  },
  {
    className: _KbItemActions,
    object: kbItems
  },
  {
    className: _KbProgressActions,
    object: kbProgresses
  },
  {
    className: _KbSectionActions,
    object: kbSections
  },
  {
    className: _LocaleActions,
    object: locales
  },
  {
    className: _ProfileActions,
    object: profiles
  },
  {
    className: _ProfileEducationActions,
    object: profileEducations
  },
  {
    className: _ProfileLaboralActions,
    object: profileLaborals
  },
  {
    className: _ProfileLanguageActions,
    object: profileLanguages
  },
  {
    className: _ProfilePrimarySkillActions,
    object: profilePrimarySkills
  },
  {
    className: _ProfileSecondarySkillActions,
    object: profileSecondarySkills
  },
  {
    className: _ProjectActions,
    object: projects
  },
  {
    className: _ProjectDetailActions,
    object: projectDetails
  },
  {
    className: _ProjectFeatureActions,
    object: projectFeatures
  },
  {
    className: _TranslationActions,
    object: translations
  },
  {
    className: _TrlActions,
    object: trls
  },
  {
    className: _TrlQuestionActions,
    object: trlQuestions
  },
  {
    className: _TrlStatusActions,
    object: trlStatuses
  },
  {
    className: _UniversityActions,
    object: universities
  },
  {
    className: _UserActions,
    object: users
  },
  {
    className: ProfileActions,
    object: profiles
  },
  {
    className: ProjectActions,
    object: projects
  },
  {
    className: CanvasActions,
    object: canvases
  },
  {
    className: CanvasTypeActions,
    object: canvasTypes
  },
  {
    className: CohortActions,
    object: cohorts
  },
  {
    className: HypothesisActions,
    object: hypotheses
  },
  {
    className: AreaHelpActions,
    object: areaHelps
  },
  {
    className: DeepQuestionActions,
    object: deepQuestions
  },
  {
    className: KbItemActions,
    object: kbItems
  },
  {
    className: KbCourseActions,
    object: kbCourses
  },
  {
    className: KbSectionActions,
    object: kbSections
  },
  {
    className: TrlActions,
    object: trls
  },
  {
    className: ProjectDetailActions,
    object: projectDetails
  },
  {
    className: TrlQuestionActions,
    object: trlQuestions
  },
  {
    className: DevStageActions,
    object: devStages
  },
  {
    className: FitActions,
    object: fits
  },
  {
    className: FrontierActions,
    object: frontiers
  },
  {
    className: UserActions,
    object: users
  },
  {
    className: AuthActions,
    object: auth
  },
  {
    className: FileActions,
    object: files
  },
  ...defs
];

const stateToProps = (state, props) => ({
  areas: state.areas.dataset,
  areaHelps: state.areaHelps.dataset,
  areaTags: state.areaTags.dataset,
  canvases: state.canvases.dataset,
  canvasTypes: state.canvasTypes.dataset,
  cohorts: state.cohorts.dataset,
  comments: state.comments.dataset,
  deepAnswers: state.deepAnswers.dataset,
  deepQuestions: state.deepQuestions.dataset,
  devStages: state.devStages.dataset,
  devStageStatuses: state.devStageStatuses.dataset,
  financialIndicators: state.financialIndicators.dataset,
  fits: state.fits.dataset,
  fitStatuses: state.fitStatuses.dataset,
  frontiers: state.frontiers.dataset,
  frontierStatuses: state.frontierStatuses.dataset,
  hypotheses: state.hypotheses.dataset,
  hypothesisLogs: state.hypothesisLogs.dataset,
  insights: state.insights.dataset,
  interviews: state.interviews.dataset,
  kbCourses: state.kbCourses.dataset,
  kbFiles: state.kbFiles.dataset,
  kbItems: state.kbItems.dataset,
  kbProgresses: state.kbProgresses.dataset,
  kbSections: state.kbSections.dataset,
  locales: state.locales.dataset,
  profiles: state.profiles.dataset,
  profileEducations: state.profileEducations.dataset,
  profileLaborals: state.profileLaborals.dataset,
  profileLanguages: state.profileLanguages.dataset,
  profilePrimarySkills: state.profilePrimarySkills.dataset,
  profileSecondarySkills: state.profileSecondarySkills.dataset,
  projects: state.projects.dataset,
  projectDetails: state.projectDetails.dataset,
  projectFeatures: state.projectFeatures.dataset,
  translations: state.translations.dataset,
  trls: state.trls.dataset,
  trlQuestions: state.trlQuestions.dataset,
  trlStatuses: state.trlStatuses.dataset,
  universities: state.universities.dataset,
  users: state.users.dataset,
});

const dispToProps = (disp) => {
  let res = {};
  for (let action of actions) {
    let methods = Object.getOwnPropertyNames(action.className.prototype);
    for (let method of methods)
      if (method != "constructor")
        res[method] = (...args) => disp(action.object[method](...args));
  }
  return res;
};

const mergeProps = (states, disps, props) =>
  Object.assign({}, states, disps, props);

const redux = (component) =>
  withRouter(connect(
    stateToProps,
    dispToProps,
    mergeProps
  )(component));

export default redux;