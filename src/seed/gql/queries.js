/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

export const AREA = `
{
  area {
    id
    category
    lName {
      id
    }
    canvasType {
      id
    }
    tags {
      id
    }
  }
}
`;

export const SET_AREA = `
mutation Set(
  $id: Int!,
  $category: String,
  $lName: Int,
  $canvasType: Int,
  $tags: [Int],
)
{
  setArea(
    id: $id,
    category: $category,
    lName: $lName,
    canvasType: $canvasType,
    tags: $tags,
  ) {
    area {
      id
      category
      lName {
        id
      }
      canvasType {
        id
      }
      tags {
        id
      }
    }
  }
}
`;

export const SAVE_AREA = `
mutation Save(
  $category: String!,
  $lName: Int!,
  $canvasType: Int!,
  $tags: [Int],
)
{
  saveArea(
    category: $category,
    lName: $lName,
    canvasType: $canvasType,
    tags: $tags,
  ) {
    area {
      id
    }
  }
}
`;

export const DELETE_AREA = `
mutation Delete($id: Int!)
{
  deleteArea(id: $id)
  {
    id
  }
}
`;

export const AREA_HELP = `
{
  areaHelp {
    id
    lContent {
      id
    }
    lVideoId {
      id
    }
    area {
      id
    }
  }
}
`;

export const SET_AREA_HELP = `
mutation Set(
  $id: Int!,
  $lContent: Int,
  $lVideoId: Int,
  $area: Int,
)
{
  setAreaHelp(
    id: $id,
    lContent: $lContent,
    lVideoId: $lVideoId,
    area: $area,
  ) {
    areaHelp {
      id
      lContent {
        id
      }
      lVideoId {
        id
      }
      area {
        id
      }
    }
  }
}
`;

export const SAVE_AREA_HELP = `
mutation Save(
  $lContent: Int!,
  $lVideoId: Int!,
  $area: Int!,
)
{
  saveAreaHelp(
    lContent: $lContent,
    lVideoId: $lVideoId,
    area: $area,
  ) {
    areaHelp {
      id
    }
  }
}
`;

export const DELETE_AREA_HELP = `
mutation Delete($id: Int!)
{
  deleteAreaHelp(id: $id)
  {
    id
  }
}
`;

export const AREA_TAG = `
{
  areaTag {
    id
    lName {
      id
    }
  }
}
`;

export const SET_AREA_TAG = `
mutation Set(
  $id: Int!,
  $lName: Int,
)
{
  setAreaTag(
    id: $id,
    lName: $lName,
  ) {
    areaTag {
      id
      lName {
        id
      }
    }
  }
}
`;

export const SAVE_AREA_TAG = `
mutation Save(
  $lName: Int!,
)
{
  saveAreaTag(
    lName: $lName,
  ) {
    areaTag {
      id
    }
  }
}
`;

export const DELETE_AREA_TAG = `
mutation Delete($id: Int!)
{
  deleteAreaTag(id: $id)
  {
    id
  }
}
`;

export const CANVAS = `
{
  canvas {
    id
    type {
      id
    }
    project {
      id
    }
  }
}
`;

export const SET_CANVAS = `
mutation Set(
  $id: Int!,
  $type: Int,
  $project: Int,
)
{
  setCanvas(
    id: $id,
    type: $type,
    project: $project,
  ) {
    canvas {
      id
      type {
        id
      }
      project {
        id
      }
    }
  }
}
`;

export const SAVE_CANVAS = `
mutation Save(
  $type: Int!,
  $project: Int!,
)
{
  saveCanvas(
    type: $type,
    project: $project,
  ) {
    canvas {
      id
    }
  }
}
`;

export const DELETE_CANVAS = `
mutation Delete($id: Int!)
{
  deleteCanvas(id: $id)
  {
    id
  }
}
`;

export const CANVAS_TYPE = `
{
  canvasType {
    id
    type
    lName {
      id
    }
    lLegend {
      id
    }
  }
}
`;

export const SET_CANVAS_TYPE = `
mutation Set(
  $id: Int!,
  $type: String,
  $lName: Int,
  $lLegend: Int,
)
{
  setCanvasType(
    id: $id,
    type: $type,
    lName: $lName,
    lLegend: $lLegend,
  ) {
    canvasType {
      id
      type
      lName {
        id
      }
      lLegend {
        id
      }
    }
  }
}
`;

export const SAVE_CANVAS_TYPE = `
mutation Save(
  $type: String!,
  $lName: Int!,
  $lLegend: Int!,
)
{
  saveCanvasType(
    type: $type,
    lName: $lName,
    lLegend: $lLegend,
  ) {
    canvasType {
      id
    }
  }
}
`;

export const DELETE_CANVAS_TYPE = `
mutation Delete($id: Int!)
{
  deleteCanvasType(id: $id)
  {
    id
  }
}
`;

export const COHORT = `
{
  cohort {
    id
    name
    date
    v4Ref
    admin {
      id
    }
    mentors {
      id
    }
    instructors {
      id
    }
  }
}
`;

export const SET_COHORT = `
mutation Set(
  $id: Int!,
  $name: String,
  $date: DateTime,
  $v4Ref: Int,
  $admin: Int,
  $mentors: [Int],
  $instructors: [Int],
)
{
  setCohort(
    id: $id,
    name: $name,
    date: $date,
    v4Ref: $v4Ref,
    admin: $admin,
    mentors: $mentors,
    instructors: $instructors,
  ) {
    cohort {
      id
      name
      date
      v4Ref
      admin {
        id
      }
      mentors {
        id
      }
      instructors {
        id
      }
    }
  }
}
`;

export const SAVE_COHORT = `
mutation Save(
  $name: String!,
  $date: DateTime!,
  $v4Ref: Int,
  $admin: Int!,
  $mentors: [Int],
  $instructors: [Int],
)
{
  saveCohort(
    name: $name,
    date: $date,
    v4Ref: $v4Ref,
    admin: $admin,
    mentors: $mentors,
    instructors: $instructors,
  ) {
    cohort {
      id
    }
  }
}
`;

export const DELETE_COHORT = `
mutation Delete($id: Int!)
{
  deleteCohort(id: $id)
  {
    id
  }
}
`;

export const COMMENT = `
{
  comment {
    id
    text
    v4Ref
    hypothesis {
      id
    }
    area {
      id
    }
    project {
      id
    }
    creator {
      id
    }
  }
}
`;

export const SET_COMMENT = `
mutation Set(
  $id: Int!,
  $text: String,
  $v4Ref: Int,
  $hypothesis: Int,
  $area: Int,
  $project: Int,
  $creator: Int,
)
{
  setComment(
    id: $id,
    text: $text,
    v4Ref: $v4Ref,
    hypothesis: $hypothesis,
    area: $area,
    project: $project,
    creator: $creator,
  ) {
    comment {
      id
      text
      v4Ref
      hypothesis {
        id
      }
      area {
        id
      }
      project {
        id
      }
      creator {
        id
      }
    }
  }
}
`;

export const SAVE_COMMENT = `
mutation Save(
  $text: String!,
  $v4Ref: Int,
  $hypothesis: Int,
  $area: Int!,
  $project: Int,
  $creator: Int!,
)
{
  saveComment(
    text: $text,
    v4Ref: $v4Ref,
    hypothesis: $hypothesis,
    area: $area,
    project: $project,
    creator: $creator,
  ) {
    comment {
      id
    }
  }
}
`;

export const DELETE_COMMENT = `
mutation Delete($id: Int!)
{
  deleteComment(id: $id)
  {
    id
  }
}
`;

export const DEEP_ANSWER = `
{
  deepAnswer {
    id
    text
    question {
      id
    }
    canvas {
      id
    }
  }
}
`;

export const SET_DEEP_ANSWER = `
mutation Set(
  $id: Int!,
  $text: String,
  $question: Int,
  $canvas: Int,
)
{
  setDeepAnswer(
    id: $id,
    text: $text,
    question: $question,
    canvas: $canvas,
  ) {
    deepAnswer {
      id
      text
      question {
        id
      }
      canvas {
        id
      }
    }
  }
}
`;

export const SAVE_DEEP_ANSWER = `
mutation Save(
  $text: String!,
  $question: Int!,
  $canvas: Int!,
)
{
  saveDeepAnswer(
    text: $text,
    question: $question,
    canvas: $canvas,
  ) {
    deepAnswer {
      id
    }
  }
}
`;

export const DELETE_DEEP_ANSWER = `
mutation Delete($id: Int!)
{
  deleteDeepAnswer(id: $id)
  {
    id
  }
}
`;

export const DEEP_QUESTION = `
{
  deepQuestion {
    id
    lContent {
      id
    }
    area {
      id
    }
  }
}
`;

export const SET_DEEP_QUESTION = `
mutation Set(
  $id: Int!,
  $lContent: Int,
  $area: Int,
)
{
  setDeepQuestion(
    id: $id,
    lContent: $lContent,
    area: $area,
  ) {
    deepQuestion {
      id
      lContent {
        id
      }
      area {
        id
      }
    }
  }
}
`;

export const SAVE_DEEP_QUESTION = `
mutation Save(
  $lContent: Int!,
  $area: Int!,
)
{
  saveDeepQuestion(
    lContent: $lContent,
    area: $area,
  ) {
    deepQuestion {
      id
    }
  }
}
`;

export const DELETE_DEEP_QUESTION = `
mutation Delete($id: Int!)
{
  deleteDeepQuestion(id: $id)
  {
    id
  }
}
`;

export const DEV_STAGE = `
{
  devStage {
    id
    category
    lName {
      id
    }
  }
}
`;

export const SET_DEV_STAGE = `
mutation Set(
  $id: Int!,
  $category: String,
  $lName: Int,
)
{
  setDevStage(
    id: $id,
    lName: $lName,
    category: $category,
  ) {
    devStage {
      id
      category
      lName {
        id
      }
    }
  }
}
`;

export const SAVE_DEV_STAGE = `
mutation Save(
  $category: String!,
  $lName: Int!,
)
{
  saveDevStage(
    lName: $lName,
    category: $category,
  ) {
    devStage {
      id
    }
  }
}
`;

export const DELETE_DEV_STAGE = `
mutation Delete($id: Int!)
{
  deleteDevStage(id: $id)
  {
    id
  }
}
`;

export const DEV_STAGE_STATUS = `
{
  devStageStatus {
    id
    value
    project {
      id
    }
    devStage {
      id
    }
  }
}
`;

export const SET_DEV_STAGE_STATUS = `
mutation Set(
  $id: Int!,
  $value: Boolean,
  $project: Int,
  $devStage: Int,
)
{
  setDevStageStatus(
    id: $id,
    value: $value,
    project: $project,
    devStage: $devStage,
  ) {
    devStageStatus {
      id
      value
      project {
        id
      }
      devStage {
        id
      }
    }
  }
}
`;

export const SAVE_DEV_STAGE_STATUS = `
mutation Save(
  $value: Boolean!,
  $project: Int!,
  $devStage: Int!,
)
{
  saveDevStageStatus(
    value: $value,
    project: $project,
    devStage: $devStage,
  ) {
    devStageStatus {
      id
    }
  }
}
`;

export const DELETE_DEV_STAGE_STATUS = `
mutation Delete($id: Int!)
{
  deleteDevStageStatus(id: $id)
  {
    id
  }
}
`;

export const FINANCIAL_INDICATOR = `
{
  financialIndicator {
    id
    date
    netIncome
    grossProfileMargins
    ebitda
    cogs
    burnRate
    runway
    customers
    newCustomers
    customerAcquisitionCost
    customerLifetimeValue
    customerChurnRate
    projectDetail {
      id
    }
  }
}
`;

export const SET_FINANCIAL_INDICATOR = `
mutation Set(
  $id: Int!,
  $date: DateTime,
  $netIncome: Float,
  $grossProfileMargins: Float,
  $ebitda: Float,
  $cogs: Float,
  $burnRate: Float,
  $runway: Float,
  $customers: Float,
  $newCustomers: Float,
  $customerAcquisitionCost: Float,
  $customerLifetimeValue: Float,
  $customerChurnRate: Float,
  $projectDetail: Int,
)
{
  setFinancialIndicator(
    id: $id,
    date: $date,
    netIncome: $netIncome,
    grossProfileMargins: $grossProfileMargins,
    ebitda: $ebitda,
    cogs: $cogs,
    burnRate: $burnRate,
    runway: $runway,
    customers: $customers,
    newCustomers: $newCustomers,
    customerAcquisitionCost: $customerAcquisitionCost,
    customerLifetimeValue: $customerLifetimeValue,
    customerChurnRate: $customerChurnRate,
    projectDetail: $projectDetail,
  ) {
    financialIndicator {
      id
      date
      netIncome
      grossProfileMargins
      ebitda
      cogs
      burnRate
      runway
      customers
      newCustomers
      customerAcquisitionCost
      customerLifetimeValue
      customerChurnRate
      projectDetail {
        id
      }
    }
  }
}
`;

export const SAVE_FINANCIAL_INDICATOR = `
mutation Save(
  $date: DateTime!,
  $netIncome: Float!,
  $grossProfileMargins: Float!,
  $ebitda: Float!,
  $cogs: Float!,
  $burnRate: Float!,
  $runway: Float!,
  $customers: Float!,
  $newCustomers: Float!,
  $customerAcquisitionCost: Float!,
  $customerLifetimeValue: Float!,
  $customerChurnRate: Float!,
  $projectDetail: Int!,
)
{
  saveFinancialIndicator(
    date: $date,
    netIncome: $netIncome,
    grossProfileMargins: $grossProfileMargins,
    ebitda: $ebitda,
    cogs: $cogs,
    burnRate: $burnRate,
    runway: $runway,
    customers: $customers,
    newCustomers: $newCustomers,
    customerAcquisitionCost: $customerAcquisitionCost,
    customerLifetimeValue: $customerLifetimeValue,
    customerChurnRate: $customerChurnRate,
    projectDetail: $projectDetail,
  ) {
    financialIndicator {
      id
    }
  }
}
`;

export const DELETE_FINANCIAL_INDICATOR = `
mutation Delete($id: Int!)
{
  deleteFinancialIndicator(id: $id)
  {
    id
  }
}
`;

export const FIT = `
{
  fit {
    id
    category
    lName {
      id
    }
  }
}
`;

export const SET_FIT = `
mutation Set(
  $id: Int!,
  $category: String,
  $lName: Int,
)
{
  setFit(
    id: $id,
    lName: $lName,
    category: $category,
  ) {
    fit {
      id
      category
      lName {
        id
      }
    }
  }
}
`;

export const SAVE_FIT = `
mutation Save(
  $category: String!,
  $lName: Int!,
)
{
  saveFit(
    lName: $lName,
    category: $category,
  ) {
    fit {
      id
    }
  }
}
`;

export const DELETE_FIT = `
mutation Delete($id: Int!)
{
  deleteFit(id: $id)
  {
    id
  }
}
`;

export const FIT_STATUS = `
{
  fitStatus {
    id
    value
    project {
      id
    }
    fit {
      id
    }
  }
}
`;

export const SET_FIT_STATUS = `
mutation Set(
  $id: Int!,
  $value: Boolean,
  $project: Int,
  $fit: Int,
)
{
  setFitStatus(
    id: $id,
    value: $value,
    project: $project,
    fit: $fit,
  ) {
    fitStatus {
      id
      value
      project {
        id
      }
      fit {
        id
      }
    }
  }
}
`;

export const SAVE_FIT_STATUS = `
mutation Save(
  $value: Boolean!,
  $project: Int!,
  $fit: Int!,
)
{
  saveFitStatus(
    value: $value,
    project: $project,
    fit: $fit,
  ) {
    fitStatus {
      id
    }
  }
}
`;

export const DELETE_FIT_STATUS = `
mutation Delete($id: Int!)
{
  deleteFitStatus(id: $id)
  {
    id
  }
}
`;

export const FRONTIER = `
{
  frontier {
    id
    category
    lName {
      id
    }
  }
}
`;

export const SET_FRONTIER = `
mutation Set(
  $id: Int!,
  $category: String,
  $lName: Int,
)
{
  setFrontier(
    id: $id,
    lName: $lName,
    category: $category,
  ) {
    frontier {
      id
      category
      lName {
        id
      }
    }
  }
}
`;

export const SAVE_FRONTIER = `
mutation Save(
  $category: String!,
  $lName: Int!,
)
{
  saveFrontier(
    lName: $lName,
    category: $category,
  ) {
    frontier {
      id
    }
  }
}
`;

export const DELETE_FRONTIER = `
mutation Delete($id: Int!)
{
  deleteFrontier(id: $id)
  {
    id
  }
}
`;

export const FRONTIER_STATUS = `
{
  frontierStatus {
    id
    value
    project {
      id
    }
    frontier {
      id
    }
  }
}
`;

export const SET_FRONTIER_STATUS = `
mutation Set(
  $id: Int!,
  $value: Boolean,
  $project: Int,
  $frontier: Int,
)
{
  setFrontierStatus(
    id: $id,
    value: $value,
    project: $project,
    frontier: $frontier,
  ) {
    frontierStatus {
      id
      value
      project {
        id
      }
      frontier {
        id
      }
    }
  }
}
`;

export const SAVE_FRONTIER_STATUS = `
mutation Save(
  $value: Boolean!,
  $project: Int!,
  $frontier: Int!,
)
{
  saveFrontierStatus(
    value: $value,
    project: $project,
    frontier: $frontier,
  ) {
    frontierStatus {
      id
    }
  }
}
`;

export const DELETE_FRONTIER_STATUS = `
mutation Delete($id: Int!)
{
  deleteFrontierStatus(id: $id)
  {
    id
  }
}
`;

export const HYPOTHESIS = `
{
  hypothesis {
    id
    text
    isActive
    isValid
    isTested
    color
    v4Ref
    area {
      id
    }
    blankArea {
      id
    }
    canvas {
      id
    }
    creator {
      id
    }
    tags {
      id
    }
    customers {
      id
    }
  }
}
`;

export const SET_HYPOTHESIS = `
mutation Set(
  $id: Int!,
  $text: String,
  $isActive: Boolean,
  $isValid: Boolean,
  $isTested: Boolean,
  $color: String,
  $v4Ref: Int,
  $area: Int,
  $blankArea: Int,
  $canvas: Int,
  $creator: Int,
  $tags: [Int],
  $customers: [Int],
)
{
  setHypothesis(
    id: $id,
    text: $text,
    isActive: $isActive,
    isValid: $isValid,
    isTested: $isTested,
    color: $color,
    v4Ref: $v4Ref,
    area: $area,
    blankArea: $blankArea,
    canvas: $canvas,
    creator: $creator,
    tags: $tags,
    customers: $customers,
  ) {
    hypothesis {
      id
      text
      isActive
      isValid
      isTested
      color
      v4Ref
      area {
        id
      }
      blankArea {
        id
      }
      canvas {
        id
      }
      creator {
        id
      }
      tags {
        id
      }
      customers {
        id
      }
    }
  }
}
`;

export const SAVE_HYPOTHESIS = `
mutation Save(
  $text: String!,
  $isActive: Boolean!,
  $isValid: Boolean!,
  $isTested: Boolean!,
  $color: String!,
  $v4Ref: Int,
  $area: Int!,
  $blankArea: Int,
  $canvas: Int!,
  $creator: Int!,
  $tags: [Int],
  $customers: [Int],
)
{
  saveHypothesis(
    text: $text,
    isActive: $isActive,
    isValid: $isValid,
    isTested: $isTested,
    color: $color,
    v4Ref: $v4Ref,
    area: $area,
    blankArea: $blankArea,
    canvas: $canvas,
    creator: $creator,
    tags: $tags,
    customers: $customers,
  ) {
    hypothesis {
      id
    }
  }
}
`;

export const DELETE_HYPOTHESIS = `
mutation Delete($id: Int!)
{
  deleteHypothesis(id: $id)
  {
    id
  }
}
`;

export const HYPOTHESIS_LOG = `
{
  hypothesisLog {
    id
    date
    text
    isValid
    isTested
    ref {
      id
    }
  }
}
`;

export const SET_HYPOTHESIS_LOG = `
mutation Set(
  $id: Int!,
  $date: DateTime,
  $text: String,
  $isValid: Boolean,
  $isTested: Boolean,
  $ref: Int,
)
{
  setHypothesisLog(
    id: $id,
    date: $date,
    text: $text,
    isValid: $isValid,
    isTested: $isTested,
    ref: $ref,
  ) {
    hypothesisLog {
      id
      date
      text
      isValid
      isTested
      ref {
        id
      }
    }
  }
}
`;

export const SAVE_HYPOTHESIS_LOG = `
mutation Save(
  $date: DateTime!,
  $text: String!,
  $isValid: Boolean!,
  $isTested: Boolean!,
  $ref: Int!,
)
{
  saveHypothesisLog(
    date: $date,
    text: $text,
    isValid: $isValid,
    isTested: $isTested,
    ref: $ref,
  ) {
    hypothesisLog {
      id
    }
  }
}
`;

export const DELETE_HYPOTHESIS_LOG = `
mutation Delete($id: Int!)
{
  deleteHypothesisLog(id: $id)
  {
    id
  }
}
`;

export const INSIGHT = `
{
  insight {
    id
    text
    type
    v4Ref
    hypothesis {
      id
    }
    area {
      id
    }
    interview {
      id
    }
    project {
      id
    }
    creator {
      id
    }
  }
}
`;

export const SET_INSIGHT = `
mutation Set(
  $id: Int!,
  $text: String,
  $type: String,
  $v4Ref: Int,
  $hypothesis: Int,
  $area: Int,
  $interview: Int,
  $project: Int,
  $creator: Int,
)
{
  setInsight(
    id: $id,
    text: $text,
    type: $type,
    v4Ref: $v4Ref,
    hypothesis: $hypothesis,
    area: $area,
    interview: $interview,
    project: $project,
    creator: $creator,
  ) {
    insight {
      id
      text
      type
      v4Ref
      hypothesis {
        id
      }
      area {
        id
      }
      interview {
        id
      }
      project {
        id
      }
      creator {
        id
      }
    }
  }
}
`;

export const SAVE_INSIGHT = `
mutation Save(
  $text: String!,
  $type: String!,
  $v4Ref: Int,
  $hypothesis: Int,
  $area: Int,
  $interview: Int,
  $project: Int!,
  $creator: Int!,
)
{
  saveInsight(
    text: $text,
    type: $type,
    v4Ref: $v4Ref,
    hypothesis: $hypothesis,
    area: $area,
    interview: $interview,
    project: $project,
    creator: $creator,
  ) {
    insight {
      id
    }
  }
}
`;

export const DELETE_INSIGHT = `
mutation Delete($id: Int!)
{
  deleteInsight(id: $id)
  {
    id
  }
}
`;

export const INTERVIEW = `
{
  interview {
    id
    transcript
    channel
    intervieweeType
    intervieweeName
    intervieweeRol
    intervieweeCompany
    intervieweeContact
    v4Ref
    intervieweeTag {
      id
    }
    hypothesis {
      id
    }
    canvas {
      id
    }
    project {
      id
    }
    creator {
      id
    }
  }
}
`;

export const SET_INTERVIEW = `
mutation Set(
  $id: Int!,
  $transcript: String,
  $channel: String,
  $intervieweeType: String,
  $intervieweeName: String,
  $intervieweeRol: String,
  $intervieweeCompany: String,
  $intervieweeContact: String,
  $v4Ref: Int,
  $intervieweeTag: Int,
  $hypothesis: Int,
  $canvas: Int,
  $project: Int,
  $creator: Int,
)
{
  setInterview(
    id: $id,
    transcript: $transcript,
    channel: $channel,
    intervieweeType: $intervieweeType,
    intervieweeName: $intervieweeName,
    intervieweeRol: $intervieweeRol,
    intervieweeCompany: $intervieweeCompany,
    intervieweeContact: $intervieweeContact,
    v4Ref: $v4Ref,
    intervieweeTag: $intervieweeTag,
    hypothesis: $hypothesis,
    canvas: $canvas,
    project: $project,
    creator: $creator,
  ) {
    interview {
      id
      transcript
      channel
      intervieweeType
      intervieweeName
      intervieweeRol
      intervieweeCompany
      intervieweeContact
      v4Ref
      intervieweeTag {
        id
      }
      hypothesis {
        id
      }
      canvas {
        id
      }
      project {
        id
      }
      creator {
        id
      }
    }
  }
}
`;

export const SAVE_INTERVIEW = `
mutation Save(
  $transcript: String!,
  $channel: String!,
  $intervieweeType: String!,
  $intervieweeName: String!,
  $intervieweeRol: String!,
  $intervieweeCompany: String!,
  $intervieweeContact: String!,
  $v4Ref: Int,
  $intervieweeTag: Int,
  $hypothesis: Int,
  $canvas: Int,
  $project: Int!,
  $creator: Int!,
)
{
  saveInterview(
    transcript: $transcript,
    channel: $channel,
    intervieweeType: $intervieweeType,
    intervieweeName: $intervieweeName,
    intervieweeRol: $intervieweeRol,
    intervieweeCompany: $intervieweeCompany,
    intervieweeContact: $intervieweeContact,
    v4Ref: $v4Ref,
    intervieweeTag: $intervieweeTag,
    hypothesis: $hypothesis,
    canvas: $canvas,
    project: $project,
    creator: $creator,
  ) {
    interview {
      id
    }
  }
}
`;

export const DELETE_INTERVIEW = `
mutation Delete($id: Int!)
{
  deleteInterview(id: $id)
  {
    id
  }
}
`;

export const KB_COURSE = `
{
  kbCourse {
    id
    lName {
      id
    }
  }
}
`;

export const SET_KB_COURSE = `
mutation Set(
  $id: Int!,
  $lName: Int,
)
{
  setKbCourse(
    id: $id,
    lName: $lName,
  ) {
    kbCourse {
      id
      lName {
        id
      }
    }
  }
}
`;

export const SAVE_KB_COURSE = `
mutation Save(
  $lName: Int!,
)
{
  saveKbCourse(
    lName: $lName,
  ) {
    kbCourse {
      id
    }
  }
}
`;

export const DELETE_KB_COURSE = `
mutation Delete($id: Int!)
{
  deleteKbCourse(id: $id)
  {
    id
  }
}
`;

export const KB_FILE = `
{
  kbFile {
    id
    url
    lang
    kbItem {
      id
    }
  }
}
`;

export const SET_KB_FILE = `
mutation Set(
  $id: Int!,
  $url: String,
  $lang: String,
  $kbItem: Int,
)
{
  setKbFile(
    id: $id,
    url: $url,
    lang: $lang,
    kbItem: $kbItem,
  ) {
    kbFile {
      id
      url
      lang
      kbItem {
        id
      }
    }
  }
}
`;

export const SAVE_KB_FILE = `
mutation Save(
  $url: String!,
  $lang: String!,
  $kbItem: Int!,
)
{
  saveKbFile(
    url: $url,
    lang: $lang,
    kbItem: $kbItem,
  ) {
    kbFile {
      id
    }
  }
}
`;

export const DELETE_KB_FILE = `
mutation Delete($id: Int!)
{
  deleteKbFile(id: $id)
  {
    id
  }
}
`;

export const KB_ITEM = `
{
  kbItem {
    id
    index
    videoUrl
    videoId
    source
    sectionIndex
    lText {
      id
    }
    lTitle {
      id
    }
    section {
      id
    }
  }
}
`;

export const SET_KB_ITEM = `
mutation Set(
  $id: Int!,
  $index: Int,
  $videoUrl: String,
  $videoId: String,
  $source: String,
  $sectionIndex: Int,
  $lText: Int,
  $lTitle: Int,
  $section: Int,
)
{
  setKbItem(
    id: $id,
    index: $index,
    videoUrl: $videoUrl,
    videoId: $videoId,
    source: $source,
    sectionIndex: $sectionIndex,
    lText: $lText,
    lTitle: $lTitle,
    section: $section,
  ) {
    kbItem {
      id
      index
      videoUrl
      videoId
      source
      sectionIndex
      lText {
        id
      }
      lTitle {
        id
      }
      section {
        id
      }
    }
  }
}
`;

export const SAVE_KB_ITEM = `
mutation Save(
  $index: Int!,
  $videoUrl: String!,
  $videoId: String!,
  $source: String!,
  $sectionIndex: Int!,
  $lText: Int!,
  $lTitle: Int!,
  $section: Int!,
)
{
  saveKbItem(
    index: $index,
    videoUrl: $videoUrl,
    videoId: $videoId,
    source: $source,
    sectionIndex: $sectionIndex,
    lText: $lText,
    lTitle: $lTitle,
    section: $section,
  ) {
    kbItem {
      id
    }
  }
}
`;

export const DELETE_KB_ITEM = `
mutation Delete($id: Int!)
{
  deleteKbItem(id: $id)
  {
    id
  }
}
`;

export const KB_PROGRESS = `
{
  kbProgress {
    id
    value
    user {
      id
    }
    item {
      id
    }
  }
}
`;

export const SET_KB_PROGRESS = `
mutation Set(
  $id: Int!,
  $value: String,
  $user: Int,
  $item: Int,
)
{
  setKbProgress(
    id: $id,
    value: $value,
    user: $user,
    item: $item,
  ) {
    kbProgress {
      id
      value
      user {
        id
      }
      item {
        id
      }
    }
  }
}
`;

export const SAVE_KB_PROGRESS = `
mutation Save(
  $value: String!,
  $user: Int!,
  $item: Int!,
)
{
  saveKbProgress(
    value: $value,
    user: $user,
    item: $item,
  ) {
    kbProgress {
      id
    }
  }
}
`;

export const DELETE_KB_PROGRESS = `
mutation Delete($id: Int!)
{
  deleteKbProgress(id: $id)
  {
    id
  }
}
`;

export const KB_SECTION = `
{
  kbSection {
    id
    index
    lName {
      id
    }
    lDescription {
      id
    }
    course {
      id
    }
  }
}
`;

export const SET_KB_SECTION = `
mutation Set(
  $id: Int!,
  $index: Int,
  $lName: Int,
  $lDescription: Int,
  $course: Int,
)
{
  setKbSection(
    id: $id,
    index: $index,
    lName: $lName,
    lDescription: $lDescription,
    course: $course,
  ) {
    kbSection {
      id
      index
      lName {
        id
      }
      lDescription {
        id
      }
      course {
        id
      }
    }
  }
}
`;

export const SAVE_KB_SECTION = `
mutation Save(
  $index: Int!,
  $lName: Int!,
  $lDescription: Int!,
  $course: Int!,
)
{
  saveKbSection(
    index: $index,
    lName: $lName,
    lDescription: $lDescription,
    course: $course,
  ) {
    kbSection {
      id
    }
  }
}
`;

export const DELETE_KB_SECTION = `
mutation Delete($id: Int!)
{
  deleteKbSection(id: $id)
  {
    id
  }
}
`;

export const LOCALE = `
{
  locale {
    id
    ref
  }
}
`;

export const SET_LOCALE = `
mutation Set(
  $id: Int!,
  $ref: String,
)
{
  setLocale(
    id: $id,
    ref: $ref,
  ) {
    locale {
      id
      ref
    }
  }
}
`;

export const SAVE_LOCALE = `
mutation Save(
  $ref: String!,
)
{
  saveLocale(
    ref: $ref,
  ) {
    locale {
      id
    }
  }
}
`;

export const DELETE_LOCALE = `
mutation Delete($id: Int!)
{
  deleteLocale(id: $id)
  {
    id
  }
}
`;

export const PROFILE = `
{
  profile {
    id
    phone
    gender
    age
    bio
    country
    state
    industry
    preferredLang
    website
    linkedin
    github
    facebook
    twitter
    angelList
    made
    phoneVisibility
    genderVisibility
    ageVisibility
    bioVisibility
    countryVisibility
    stateVisibility
    industryVisibility
    websiteVisibility
    linkedinVisibility
    githubVisibility
    facebookVisibility
    twitterVisibility
    angelListVisibility
    madeVisibility
    educationsVisibility
    laboralsVisibility
    languagesVisibility
    primarySkillsVisibility
    secondarySkillsVisibility
    user {
      id
    }
  }
}
`;

export const SET_PROFILE = `
mutation Set(
  $id: Int!,
  $phone: String,
  $gender: String,
  $age: Int,
  $bio: String,
  $country: String,
  $state: String,
  $industry: String,
  $preferredLang: String,
  $website: String,
  $linkedin: String,
  $github: String,
  $facebook: String,
  $twitter: String,
  $angelList: String,
  $made: String,
  $phoneVisibility: String,
  $genderVisibility: String,
  $ageVisibility: String,
  $bioVisibility: String,
  $countryVisibility: String,
  $stateVisibility: String,
  $industryVisibility: String,
  $websiteVisibility: String,
  $linkedinVisibility: String,
  $githubVisibility: String,
  $facebookVisibility: String,
  $twitterVisibility: String,
  $angelListVisibility: String,
  $madeVisibility: String,
  $educationsVisibility: String,
  $laboralsVisibility: String,
  $languagesVisibility: String,
  $primarySkillsVisibility: String,
  $secondarySkillsVisibility: String,
  $user: Int,
)
{
  setProfile(
    id: $id,
    phone: $phone,
    gender: $gender,
    age: $age,
    bio: $bio,
    country: $country,
    state: $state,
    industry: $industry,
    preferredLang: $preferredLang,
    website: $website,
    linkedin: $linkedin,
    github: $github,
    facebook: $facebook,
    twitter: $twitter,
    angelList: $angelList,
    made: $made,
    phoneVisibility: $phoneVisibility,
    genderVisibility: $genderVisibility,
    ageVisibility: $ageVisibility,
    bioVisibility: $bioVisibility,
    countryVisibility: $countryVisibility,
    stateVisibility: $stateVisibility,
    industryVisibility: $industryVisibility,
    websiteVisibility: $websiteVisibility,
    linkedinVisibility: $linkedinVisibility,
    githubVisibility: $githubVisibility,
    facebookVisibility: $facebookVisibility,
    twitterVisibility: $twitterVisibility,
    angelListVisibility: $angelListVisibility,
    madeVisibility: $madeVisibility,
    educationsVisibility: $educationsVisibility,
    laboralsVisibility: $laboralsVisibility,
    languagesVisibility: $languagesVisibility,
    primarySkillsVisibility: $primarySkillsVisibility,
    secondarySkillsVisibility: $secondarySkillsVisibility,
    user: $user,
  ) {
    profile {
      id
      phone
      gender
      age
      bio
      country
      state
      industry
      preferredLang
      website
      linkedin
      github
      facebook
      twitter
      angelList
      made
      phoneVisibility
      genderVisibility
      ageVisibility
      bioVisibility
      countryVisibility
      stateVisibility
      industryVisibility
      websiteVisibility
      linkedinVisibility
      githubVisibility
      facebookVisibility
      twitterVisibility
      angelListVisibility
      madeVisibility
      educationsVisibility
      laboralsVisibility
      languagesVisibility
      primarySkillsVisibility
      secondarySkillsVisibility
      user {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE = `
mutation Save(
  $phone: String!,
  $gender: String!,
  $age: Int!,
  $bio: String!,
  $country: String!,
  $state: String!,
  $industry: String!,
  $preferredLang: String!,
  $website: String!,
  $linkedin: String!,
  $github: String!,
  $facebook: String!,
  $twitter: String!,
  $angelList: String!,
  $made: String!,
  $phoneVisibility: String!,
  $genderVisibility: String!,
  $ageVisibility: String!,
  $bioVisibility: String!,
  $countryVisibility: String!,
  $stateVisibility: String!,
  $industryVisibility: String!,
  $websiteVisibility: String!,
  $linkedinVisibility: String!,
  $githubVisibility: String!,
  $facebookVisibility: String!,
  $twitterVisibility: String!,
  $angelListVisibility: String!,
  $madeVisibility: String!,
  $educationsVisibility: String!,
  $laboralsVisibility: String!,
  $languagesVisibility: String!,
  $primarySkillsVisibility: String!,
  $secondarySkillsVisibility: String!,
  $user: Int!,
)
{
  saveProfile(
    phone: $phone,
    gender: $gender,
    age: $age,
    bio: $bio,
    country: $country,
    state: $state,
    industry: $industry,
    preferredLang: $preferredLang,
    website: $website,
    linkedin: $linkedin,
    github: $github,
    facebook: $facebook,
    twitter: $twitter,
    angelList: $angelList,
    made: $made,
    phoneVisibility: $phoneVisibility,
    genderVisibility: $genderVisibility,
    ageVisibility: $ageVisibility,
    bioVisibility: $bioVisibility,
    countryVisibility: $countryVisibility,
    stateVisibility: $stateVisibility,
    industryVisibility: $industryVisibility,
    websiteVisibility: $websiteVisibility,
    linkedinVisibility: $linkedinVisibility,
    githubVisibility: $githubVisibility,
    facebookVisibility: $facebookVisibility,
    twitterVisibility: $twitterVisibility,
    angelListVisibility: $angelListVisibility,
    madeVisibility: $madeVisibility,
    educationsVisibility: $educationsVisibility,
    laboralsVisibility: $laboralsVisibility,
    languagesVisibility: $languagesVisibility,
    primarySkillsVisibility: $primarySkillsVisibility,
    secondarySkillsVisibility: $secondarySkillsVisibility,
    user: $user,
  ) {
    profile {
      id
    }
  }
}
`;

export const DELETE_PROFILE = `
mutation Delete($id: Int!)
{
  deleteProfile(id: $id)
  {
    id
  }
}
`;

export const PROFILE_EDUCATION = `
{
  profileEducation {
    id
    degree
    period
    activitiesGroups
    university {
      id
    }
    profile {
      id
    }
  }
}
`;

export const SET_PROFILE_EDUCATION = `
mutation Set(
  $id: Int!,
  $degree: String,
  $period: String,
  $activitiesGroups: String,
  $university: Int,
  $profile: Int,
)
{
  setProfileEducation(
    id: $id,
    degree: $degree,
    period: $period,
    activitiesGroups: $activitiesGroups,
    university: $university,
    profile: $profile,
  ) {
    profileEducation {
      id
      degree
      period
      activitiesGroups
      university {
        id
      }
      profile {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE_EDUCATION = `
mutation Save(
  $degree: String!,
  $period: String!,
  $activitiesGroups: String!,
  $university: Int,
  $profile: Int!,
)
{
  saveProfileEducation(
    degree: $degree,
    period: $period,
    activitiesGroups: $activitiesGroups,
    university: $university,
    profile: $profile,
  ) {
    profileEducation {
      id
    }
  }
}
`;

export const DELETE_PROFILE_EDUCATION = `
mutation Delete($id: Int!)
{
  deleteProfileEducation(id: $id)
  {
    id
  }
}
`;

export const PROFILE_LABORAL = `
{
  profileLaboral {
    id
    job
    company
    period
    companyDescription
    profile {
      id
    }
  }
}
`;

export const SET_PROFILE_LABORAL = `
mutation Set(
  $id: Int!,
  $job: String,
  $company: String,
  $period: String,
  $companyDescription: String,
  $profile: Int,
)
{
  setProfileLaboral(
    id: $id,
    job: $job,
    company: $company,
    period: $period,
    companyDescription: $companyDescription,
    profile: $profile,
  ) {
    profileLaboral {
      id
      job
      company
      period
      companyDescription
      profile {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE_LABORAL = `
mutation Save(
  $job: String!,
  $company: String!,
  $period: String!,
  $companyDescription: String!,
  $profile: Int!,
)
{
  saveProfileLaboral(
    job: $job,
    company: $company,
    period: $period,
    companyDescription: $companyDescription,
    profile: $profile,
  ) {
    profileLaboral {
      id
    }
  }
}
`;

export const DELETE_PROFILE_LABORAL = `
mutation Delete($id: Int!)
{
  deleteProfileLaboral(id: $id)
  {
    id
  }
}
`;

export const PROFILE_LANGUAGE = `
{
  profileLanguage {
    id
    name
    profile {
      id
    }
  }
}
`;

export const SET_PROFILE_LANGUAGE = `
mutation Set(
  $id: Int!,
  $name: String,
  $profile: Int,
)
{
  setProfileLanguage(
    id: $id,
    name: $name,
    profile: $profile,
  ) {
    profileLanguage {
      id
      name
      profile {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE_LANGUAGE = `
mutation Save(
  $name: String!,
  $profile: Int!,
)
{
  saveProfileLanguage(
    name: $name,
    profile: $profile,
  ) {
    profileLanguage {
      id
    }
  }
}
`;

export const DELETE_PROFILE_LANGUAGE = `
mutation Delete($id: Int!)
{
  deleteProfileLanguage(id: $id)
  {
    id
  }
}
`;

export const PROFILE_PRIMARY_SKILL = `
{
  profilePrimarySkill {
    id
    type
    score
    profile {
      id
    }
  }
}
`;

export const SET_PROFILE_PRIMARY_SKILL = `
mutation Set(
  $id: Int!,
  $type: String,
  $score: Float,
  $profile: Int,
)
{
  setProfilePrimarySkill(
    id: $id,
    type: $type,
    score: $score,
    profile: $profile,
  ) {
    profilePrimarySkill {
      id
      type
      score
      profile {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE_PRIMARY_SKILL = `
mutation Save(
  $type: String!,
  $score: Float!,
  $profile: Int!,
)
{
  saveProfilePrimarySkill(
    type: $type,
    score: $score,
    profile: $profile,
  ) {
    profilePrimarySkill {
      id
    }
  }
}
`;

export const DELETE_PROFILE_PRIMARY_SKILL = `
mutation Delete($id: Int!)
{
  deleteProfilePrimarySkill(id: $id)
  {
    id
  }
}
`;

export const PROFILE_SECONDARY_SKILL = `
{
  profileSecondarySkill {
    id
    sector
    type
    score
    profile {
      id
    }
  }
}
`;

export const SET_PROFILE_SECONDARY_SKILL = `
mutation Set(
  $id: Int!,
  $sector: String,
  $type: String,
  $score: Int,
  $profile: Int,
)
{
  setProfileSecondarySkill(
    id: $id,
    sector: $sector,
    type: $type,
    score: $score,
    profile: $profile,
  ) {
    profileSecondarySkill {
      id
      sector
      type
      score
      profile {
        id
      }
    }
  }
}
`;

export const SAVE_PROFILE_SECONDARY_SKILL = `
mutation Save(
  $sector: String!,
  $type: String!,
  $score: Int!,
  $profile: Int!,
)
{
  saveProfileSecondarySkill(
    sector: $sector,
    type: $type,
    score: $score,
    profile: $profile,
  ) {
    profileSecondarySkill {
      id
    }
  }
}
`;

export const DELETE_PROFILE_SECONDARY_SKILL = `
mutation Delete($id: Int!)
{
  deleteProfileSecondarySkill(id: $id)
  {
    id
  }
}
`;

export const PROJECT = `
{
  project {
    id
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
    canvasType2 {
      id
    }
    admin {
      id
    }
    cohort {
      id
    }
    mentors {
      id
    }
    members {
      id
    }
  }
}
`;

export const SET_PROJECT = `
mutation Set(
  $id: Int!,
  $name: String,
  $description: String,
  $image: String,
  $isActive: Boolean,
  $hasPhase1: Boolean,
  $hasPhase21: Boolean,
  $hasPhase22: Boolean,
  $hasPhase23: Boolean,
  $hasPhase24: Boolean,
  $hasPhase25: Boolean,
  $hasPhase3: Boolean,
  $hasPhase4: Boolean,
  $hasPhase5: Boolean,
  $v4Ref: Int,
  $canvasType2: Int,
  $admin: Int,
  $cohort: Int,
  $mentors: [Int],
  $members: [Int],
)
{
  setProject(
    id: $id,
    name: $name,
    description: $description,
    image: $image,
    isActive: $isActive,
    hasPhase1: $hasPhase1,
    hasPhase21: $hasPhase21,
    hasPhase22: $hasPhase22,
    hasPhase23: $hasPhase23,
    hasPhase24: $hasPhase24,
    hasPhase25: $hasPhase25,
    hasPhase3: $hasPhase3,
    hasPhase4: $hasPhase4,
    hasPhase5: $hasPhase5,
    v4Ref: $v4Ref,
    canvasType2: $canvasType2,
    admin: $admin,
    cohort: $cohort,
    mentors: $mentors,
    members: $members,
  ) {
    project {
      id
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
      canvasType2 {
        id
      }
      admin {
        id
      }
      cohort {
        id
      }
      mentors {
        id
      }
      members {
        id
      }
    }
  }
}
`;

export const SAVE_PROJECT = `
mutation Save(
  $name: String!,
  $description: String!,
  $image: String!,
  $isActive: Boolean!,
  $hasPhase1: Boolean!,
  $hasPhase21: Boolean!,
  $hasPhase22: Boolean!,
  $hasPhase23: Boolean!,
  $hasPhase24: Boolean!,
  $hasPhase25: Boolean!,
  $hasPhase3: Boolean!,
  $hasPhase4: Boolean!,
  $hasPhase5: Boolean!,
  $v4Ref: Int,
  $canvasType2: Int!,
  $admin: Int,
  $cohort: Int,
  $mentors: [Int],
  $members: [Int],
)
{
  saveProject(
    name: $name,
    description: $description,
    image: $image,
    isActive: $isActive,
    hasPhase1: $hasPhase1,
    hasPhase21: $hasPhase21,
    hasPhase22: $hasPhase22,
    hasPhase23: $hasPhase23,
    hasPhase24: $hasPhase24,
    hasPhase25: $hasPhase25,
    hasPhase3: $hasPhase3,
    hasPhase4: $hasPhase4,
    hasPhase5: $hasPhase5,
    v4Ref: $v4Ref,
    canvasType2: $canvasType2,
    admin: $admin,
    cohort: $cohort,
    mentors: $mentors,
    members: $members,
  ) {
    project {
      id
    }
  }
}
`;

export const DELETE_PROJECT = `
mutation Delete($id: Int!)
{
  deleteProject(id: $id)
  {
    id
  }
}
`;

export const PROJECT_DETAIL = `
{
  projectDetail {
    id
    country
    state
    industry
    website
    totalSales
    raisedCapital
    investmentRequest
    numPatents
    numEmployees
    totalAvailableMarket
    servedAvailableMarket
    targetMarket
    incDate
    irl
    validatedByInstructor
    countryVisibility
    stateVisibility
    industryVisibility
    websiteVisibility
    totalSalesVisibility
    raisedCapitalVisibility
    investmentRequestVisibility
    numPatentsVisibility
    numEmployeesVisibility
    totalAvailableMarketVisibility
    servedAvailableMarketVisibility
    targetMarketVisibility
    incDateVisibility
    irlVisibility
    prototypeVisibility
    featuresVisibility
    financialVisibility
    highPrototype {
      id
    }
    lowPrototype {
      id
    }
    project {
      id
    }
  }
}
`;

export const SET_PROJECT_DETAIL = `
mutation Set(
  $id: Int!,
  $country: String,
  $state: String,
  $industry: String,
  $website: String,
  $totalSales: Float,
  $raisedCapital: Float,
  $investmentRequest: Float,
  $numPatents: Int,
  $numEmployees: Int,
  $totalAvailableMarket: Float,
  $servedAvailableMarket: Float,
  $targetMarket: Float,
  $incDate: DateTime,
  $irl: String,
  $highPrototype: Int,
  $lowPrototype: Int,
  $validatedByInstructor: Boolean,
  $countryVisibility: String,
  $stateVisibility: String,
  $industryVisibility: String,
  $websiteVisibility: String,
  $totalSalesVisibility: String,
  $raisedCapitalVisibility: String,
  $investmentRequestVisibility: String,
  $numPatentsVisibility: String,
  $numEmployeesVisibility: String,
  $totalAvailableMarketVisibility: String,
  $servedAvailableMarketVisibility: String,
  $targetMarketVisibility: String,
  $incDateVisibility: String,
  $irlVisibility: String,
  $prototypeVisibility: String,
  $featuresVisibility: String,
  $financialVisibility: String,
  $project: Int,
)
{
  setProjectDetail(
    id: $id,
    country: $country,
    state: $state,
    industry: $industry,
    website: $website,
    totalSales: $totalSales,
    raisedCapital: $raisedCapital,
    investmentRequest: $investmentRequest,
    numPatents: $numPatents,
    numEmployees: $numEmployees,
    totalAvailableMarket: $totalAvailableMarket,
    servedAvailableMarket: $servedAvailableMarket,
    targetMarket: $targetMarket,
    incDate: $incDate,
    irl: $irl,
    highPrototype: $highPrototype,
    lowPrototype: $lowPrototype,
    validatedByInstructor: $validatedByInstructor,
    countryVisibility: $countryVisibility,
    stateVisibility: $stateVisibility,
    industryVisibility: $industryVisibility,
    websiteVisibility: $websiteVisibility,
    totalSalesVisibility: $totalSalesVisibility,
    raisedCapitalVisibility: $raisedCapitalVisibility,
    investmentRequestVisibility: $investmentRequestVisibility,
    numPatentsVisibility: $numPatentsVisibility,
    numEmployeesVisibility: $numEmployeesVisibility,
    totalAvailableMarketVisibility: $totalAvailableMarketVisibility,
    servedAvailableMarketVisibility: $servedAvailableMarketVisibility,
    targetMarketVisibility: $targetMarketVisibility,
    incDateVisibility: $incDateVisibility,
    irlVisibility: $irlVisibility,
    prototypeVisibility: $prototypeVisibility,
    featuresVisibility: $featuresVisibility,
    financialVisibility: $financialVisibility,
    project: $project,
  ) {
    projectDetail {
      id
      country
      state
      industry
      website
      totalSales
      raisedCapital
      investmentRequest
      numPatents
      numEmployees
      totalAvailableMarket
      servedAvailableMarket
      targetMarket
      incDate
      irl
      validatedByInstructor
      countryVisibility
      stateVisibility
      industryVisibility
      websiteVisibility
      totalSalesVisibility
      raisedCapitalVisibility
      investmentRequestVisibility
      numPatentsVisibility
      numEmployeesVisibility
      totalAvailableMarketVisibility
      servedAvailableMarketVisibility
      targetMarketVisibility
      incDateVisibility
      irlVisibility
      prototypeVisibility
      featuresVisibility
      financialVisibility
      highPrototype {
        id
      }
      lowPrototype {
        id
      }
      project {
        id
      }
    }
  }
}
`;

export const SAVE_PROJECT_DETAIL = `
mutation Save(
  $country: String!,
  $state: String!,
  $industry: String!,
  $website: String!,
  $totalSales: Float!,
  $raisedCapital: Float!,
  $investmentRequest: Float!,
  $numPatents: Int!,
  $numEmployees: Int!,
  $totalAvailableMarket: Float!,
  $servedAvailableMarket: Float!,
  $targetMarket: Float!,
  $incDate: DateTime!,
  $irl: String!,
  $highPrototype: Int,
  $lowPrototype: Int,
  $validatedByInstructor: Boolean!,
  $countryVisibility: String!,
  $stateVisibility: String!,
  $industryVisibility: String!,
  $websiteVisibility: String!,
  $totalSalesVisibility: String!,
  $raisedCapitalVisibility: String!,
  $investmentRequestVisibility: String!,
  $numPatentsVisibility: String!,
  $numEmployeesVisibility: String!,
  $totalAvailableMarketVisibility: String!,
  $servedAvailableMarketVisibility: String!,
  $targetMarketVisibility: String!,
  $incDateVisibility: String!,
  $irlVisibility: String!,
  $prototypeVisibility: String!,
  $featuresVisibility: String!,
  $financialVisibility: String!,
  $project: Int!,
)
{
  saveProjectDetail(
    country: $country,
    state: $state,
    industry: $industry,
    website: $website,
    totalSales: $totalSales,
    raisedCapital: $raisedCapital,
    investmentRequest: $investmentRequest,
    numPatents: $numPatents,
    numEmployees: $numEmployees,
    totalAvailableMarket: $totalAvailableMarket,
    servedAvailableMarket: $servedAvailableMarket,
    targetMarket: $targetMarket,
    incDate: $incDate,
    irl: $irl,
    highPrototype: $highPrototype,
    lowPrototype: $lowPrototype,
    validatedByInstructor: $validatedByInstructor,
    countryVisibility: $countryVisibility,
    stateVisibility: $stateVisibility,
    industryVisibility: $industryVisibility,
    websiteVisibility: $websiteVisibility,
    totalSalesVisibility: $totalSalesVisibility,
    raisedCapitalVisibility: $raisedCapitalVisibility,
    investmentRequestVisibility: $investmentRequestVisibility,
    numPatentsVisibility: $numPatentsVisibility,
    numEmployeesVisibility: $numEmployeesVisibility,
    totalAvailableMarketVisibility: $totalAvailableMarketVisibility,
    servedAvailableMarketVisibility: $servedAvailableMarketVisibility,
    targetMarketVisibility: $targetMarketVisibility,
    incDateVisibility: $incDateVisibility,
    irlVisibility: $irlVisibility,
    prototypeVisibility: $prototypeVisibility,
    featuresVisibility: $featuresVisibility,
    financialVisibility: $financialVisibility,
    project: $project,
  ) {
    projectDetail {
      id
    }
  }
}
`;

export const DELETE_PROJECT_DETAIL = `
mutation Delete($id: Int!)
{
  deleteProjectDetail(id: $id)
  {
    id
  }
}
`;

export const PROJECT_FEATURE = `
{
  projectFeature {
    id
    description
    projectDetail {
      id
    }
  }
}
`;

export const SET_PROJECT_FEATURE = `
mutation Set(
  $id: Int!,
  $description: String,
  $projectDetail: Int,
)
{
  setProjectFeature(
    id: $id,
    description: $description,
    projectDetail: $projectDetail,
  ) {
    projectFeature {
      id
      description
      projectDetail {
        id
      }
    }
  }
}
`;

export const SAVE_PROJECT_FEATURE = `
mutation Save(
  $description: String!,
  $projectDetail: Int!,
)
{
  saveProjectFeature(
    description: $description,
    projectDetail: $projectDetail,
  ) {
    projectFeature {
      id
    }
  }
}
`;

export const DELETE_PROJECT_FEATURE = `
mutation Delete($id: Int!)
{
  deleteProjectFeature(id: $id)
  {
    id
  }
}
`;

export const TRANSLATION = `
{
  translation {
    id
    value
    lang
    locale {
      id
    }
  }
}
`;

export const SET_TRANSLATION = `
mutation Set(
  $id: Int!,
  $value: String,
  $lang: String,
  $locale: Int,
)
{
  setTranslation(
    id: $id,
    value: $value,
    lang: $lang,
    locale: $locale,
  ) {
    translation {
      id
      value
      lang
      locale {
        id
      }
    }
  }
}
`;

export const SAVE_TRANSLATION = `
mutation Save(
  $value: String!,
  $lang: String!,
  $locale: Int!,
)
{
  saveTranslation(
    value: $value,
    lang: $lang,
    locale: $locale,
  ) {
    translation {
      id
    }
  }
}
`;

export const DELETE_TRANSLATION = `
mutation Delete($id: Int!)
{
  deleteTranslation(id: $id)
  {
    id
  }
}
`;

export const TRL = `
{
  trl {
    id
    lName {
      id
    }
    lDescription {
      id
    }
  }
}
`;

export const SET_TRL = `
mutation Set(
  $id: Int!,
  $lName: Int,
  $lDescription: Int,
)
{
  setTrl(
    id: $id,
    lName: $lName,
    lDescription: $lDescription,
  ) {
    trl {
      id
      lName {
        id
      }
      lDescription {
        id
      }
    }
  }
}
`;

export const SAVE_TRL = `
mutation Save(
  $lName: Int!,
  $lDescription: Int!,
)
{
  saveTrl(
    lName: $lName,
    lDescription: $lDescription,
  ) {
    trl {
      id
    }
  }
}
`;

export const DELETE_TRL = `
mutation Delete($id: Int!)
{
  deleteTrl(id: $id)
  {
    id
  }
}
`;

export const TRL_QUESTION = `
{
  trlQuestion {
    id
    lName {
      id
    }
    trl {
      id
    }
  }
}
`;

export const SET_TRL_QUESTION = `
mutation Set(
  $id: Int!,
  $lName: Int,
  $trl: Int,
)
{
  setTrlQuestion(
    id: $id,
    lName: $lName,
    trl: $trl,
  ) {
    trlQuestion {
      id
      lName {
        id
      }
      trl {
        id
      }
    }
  }
}
`;

export const SAVE_TRL_QUESTION = `
mutation Save(
  $lName: Int!,
  $trl: Int!,
)
{
  saveTrlQuestion(
    lName: $lName,
    trl: $trl,
  ) {
    trlQuestion {
      id
    }
  }
}
`;

export const DELETE_TRL_QUESTION = `
mutation Delete($id: Int!)
{
  deleteTrlQuestion(id: $id)
  {
    id
  }
}
`;

export const TRL_STATUS = `
{
  trlStatus {
    id
    value
    project {
      id
    }
    question {
      id
    }
  }
}
`;

export const SET_TRL_STATUS = `
mutation Set(
  $id: Int!,
  $value: Boolean,
  $project: Int,
  $question: Int,
)
{
  setTrlStatus(
    id: $id,
    value: $value,
    project: $project,
    question: $question,
  ) {
    trlStatus {
      id
      value
      project {
        id
      }
      question {
        id
      }
    }
  }
}
`;

export const SAVE_TRL_STATUS = `
mutation Save(
  $value: Boolean!,
  $project: Int!,
  $question: Int!,
)
{
  saveTrlStatus(
    value: $value,
    project: $project,
    question: $question,
  ) {
    trlStatus {
      id
    }
  }
}
`;

export const DELETE_TRL_STATUS = `
mutation Delete($id: Int!)
{
  deleteTrlStatus(id: $id)
  {
    id
  }
}
`;

export const UNIVERSITY = `
{
  university {
    id
    name
    country
  }
}
`;

export const SET_UNIVERSITY = `
mutation Set(
  $id: Int!,
  $name: String,
  $country: String,
)
{
  setUniversity(
    id: $id,
    name: $name,
    country: $country,
  ) {
    university {
      id
      name
      country
    }
  }
}
`;

export const SAVE_UNIVERSITY = `
mutation Save(
  $name: String!,
  $country: String!,
)
{
  saveUniversity(
    name: $name,
    country: $country,
  ) {
    university {
      id
    }
  }
}
`;

export const DELETE_UNIVERSITY = `
mutation Delete($id: Int!)
{
  deleteUniversity(id: $id)
  {
    id
  }
}
`;

export const USER = `
{
  user {
    id
    username
    firstName
    lastName
    email
    isActive
    imageUrl
    color
    lang
    plan
    verificationToken
    isVerified
    introStatus
    v4Ref
  }
}
`;

export const SET_USER = `
mutation Set(
  $id: Int!,
  $username: String,
  $firstName: String,
  $lastName: String,
  $email: String,
  $isActive: Boolean,
  $password: String,
  $imageUrl: String,
  $color: String,
  $lang: String,
  $plan: String,
  $verificationToken: String,
  $isVerified: Boolean,
  $introStatus: String,
  $v4Ref: Int,
)
{
  setUser(
    id: $id,
    username: $username,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    isActive: $isActive,
    password: $password,
    imageUrl: $imageUrl,
    color: $color,
    lang: $lang,
    plan: $plan,
    verificationToken: $verificationToken,
    isVerified: $isVerified,
    introStatus: $introStatus,
    v4Ref: $v4Ref,
  ) {
    user {
      id
      username
      firstName
      lastName
      email
      isActive
      imageUrl
      color
      lang
      plan
      verificationToken
      isVerified
      introStatus
      v4Ref
    }
  }
}
`;

export const SAVE_USER = `
mutation Save(
  $username: String!,
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $isActive: Boolean!,
  $password: String!,
  $imageUrl: String!,
  $color: String!,
  $lang: String,
  $plan: String!,
  $verificationToken: String!,
  $isVerified: Boolean!,
  $introStatus: String!,
  $v4Ref: Int,
)
{
  saveUser(
    username: $username,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    isActive: $isActive,
    password: $password,
    imageUrl: $imageUrl,
    color: $color,
    lang: $lang,
    plan: $plan,
    verificationToken: $verificationToken,
    isVerified: $isVerified,
    introStatus: $introStatus,
    v4Ref: $v4Ref,
  ) {
    user {
      id
    }
  }
}
`;

export const DELETE_USER = `
mutation Delete($id: Int!)
{
  deleteUser(id: $id)
  {
    id
  }
}
`;