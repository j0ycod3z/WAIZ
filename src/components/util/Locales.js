import detectBrowserLanguage from 'detect-browser-language'

const lang = detectBrowserLanguage().toUpperCase();


const Locales = {

  // LOGIN

  login: [
    "Login",
    "Iniciar Sesión"
  ],
  email: [
    "Email",
    "Correo"
  ],
  password: [
    "Password",
    "Contraseña"
  ],
  enter_your_password: [
    "Enter your password",
    "Ingresa tu contraseña"
  ],
  remember_me: [
    "Remember me",
    "Recuérdame"
  ],
  dont_have_an_account: [
    "Don't have an account",
    "No tienes cuenta"
  ],
  sign_up: [
    "Sign up",
    "Regístrate"
  ],
  forgot_your_password: [
    "Forgot your password",
    "Olvidaste tu contraseña"
  ],
  terms_and_conditions: [
    "Terms and conditions",
    "Términos y condiciones"
  ],
  invalid_user_or_password: [
    "Invalid user or password",
    "Usuario o contraseña inválidos"
  ],
  missing_payment_message: [
    "Your trial period has ended, contact",
    "Tu periodo de prueba ha concluido, comunicate a"
  ],

  missing_payment_message_2: [
    "to expand your plan",
    "para ampliar tu plan"
  ],

  //Sign_up

  confirm_password: [
    "Confirm password",
    "Confirmar contraseña"
  ],

  sign_up_title: [
    "Do you want to use wAIz for business or education purposes?",
    "¿Desea utilizar wAIz para fines comerciales o educativos?"
  ],
  sign_up_notice: [
    "Send us an e-mail describing your company or organization and approximately how many people will be using the platform. Also if you want tell us a little bit about your interests or if you have an special request",
    "Envíenos un correo electrónico que describa su empresa u organización y aproximadamente cuántas personas utilizarán la plataforma. Además, si quieres, cuéntanos un poco sobre tus intereses o si tienes una solicitud especial"
  ],
  one_more_step: [
    "Just one more step",
    "Estás a un paso"
  ],
  email_confirmation_notice: [
    "Check your email to verify your account",
    "Revisa tu correo para verificar tu cuenta"
  ],
  email_confirmation_spam: [
    "Note: If the email does not appear in your inbox check your spam emails",
    "Nota: Si el correo no aparece en tu bandeja principal revisa tus correos no deseados"
  ],
  password_dont_match: [
    "Passwords don't match",
    "Las contraseñas no coinciden"
  ],
  user_already_registered: [
    "User already registered",
    "Usuario ya registrado"
  ],
  an_error_has_ocurred: [
    "An error has occurred, try again later",
    "Ha ocurrido un error, prueba de nuevo"
  ],


  //Recovery

  recover_password: [
    "Recover password",
    "Recuperar contraseña"
  ],
  recovery_notice: [
    "Write your email",
    "Escribe tu correo"
  ],
  send: [
    "Send",
    "Enviar"
  ],
  unregistered_user: [
    "Unregistered user",
    "Usuario no registrado"
  ],
  recovery_title: [
    "Check your email to recover your password",
    "Revisa tu correo para recuperar tu contraseña"
  ],
  password_changed: [
    "Password changed",
    "Contraseña modificada"
  ],
  password_changed_notice: [
    "Now you can enter wAIz with your new password",
    "Ahora puedes ingresar a wAIz con tu nueva contraseña"
  ],

  // SIDE-NAV

  cohorts: [
    "Cohorts",
    "Cohorts"
  ],
  projects: [
    "Projects",
    "Proyectos"
  ],
  phases: [
    "Phases",
    "Fases"
  ],
  next_steps: [
    "Next steps",
    "Siguientes Pasos"
  ],
  phase_1: [
    "Phase 1",
    "Fase 1"
  ],
  phase_2: [
    "Phase 2",
    "Fase 2"
  ],
  phase_3: [
    "Phase 3",
    "Fase 3"
  ],
  phase_4: [
    "Phase 4",
    "Fase 4"
  ],
  phase_5: [
    "Phase 5",
    "Fase 5"
  ],
  incubation_acceleration: [
    "Incubation and Acceleration",
    "Incubación y Aceleración"
  ],
  scaling: [
    "Scaling",
    "Escalamiento"
  ],
  reputation_prodcutivity_drivers: [
    "Reputation & Productivity drivers",
    "Procesos (Reputación / Productividad)"
  ],
  project_profile: [
    "Project Profile",
    "Ficha de Proyecto"
  ],
  select_an_option: [
    "Select an option",
    "Selecciona una opción"
  ],
  interviews: [
    "Interviews",
    "Entrevistas"
  ],
  activity_feed: [
    "Activity Feed",
    "Actividad"
  ],
  project_admin: [
    "Project Admin",
    "Administrador de Proyectos"
  ],
  bulk_load: [
    "Bulk load",
    "Carga masiva"
  ],
  instructors: [
    "Instructors",
    "Instructores"
  ],
  admins: [
    "Admins",
    "Administradores"
  ],
  members: [
    "Members",
    "Miembros"
  ],
  mentors: [
    "Mentors",
    "Mentores"
  ],
  new_project: [
    "New Project",
    "Nuevo Proyecto"
  ],
  add_member: [
    "Add Member",
    "Agregar Miembro"
  ],
  add_mentor: [
    "Add Mentor",
    "Agregar Mentor"
  ],
  add_instructor: [
    "Add Instructor",
    "Agregar Instructor"
  ],
  add: [
    "Add",
    "Agregar"
  ],
  download_template: [
    "Download Template",
    "Descargar Plantilla"
  ],
  template_title: [
    "Instructions:",
    "Instrucciones:"
  ],
  template_notice_1: [
    "Download the following template",
    "Descarga la siguiente plantilla",
  ],
  template_notice_2: [
    "Fill in the data",
    "Llena los datos"
  ],
  template_notice_3: [
    "Upload the template file",
    "Sube el archivo de la plantilla"
  ],


  // TOP-NAV

  knowledge_base: [
    "Knowledge Base",
    "Base de Conocimientos"
  ],
  notifications: [
    "Notifications",
    "Notificaciones"
  ],
  search: [
    "Search",
    "Buscar"
  ],
  your_profile: [
    "Your profile",
    "Tu perfil"
  ],
  profile: [
    "Profile",
    "Perfil"
  ],
  settings: [
    "Settings",
    "Ajustes"
  ],
  about: [
    "About",
    "Acerca de"
  ],
  logout: [
    "Logout",
    "Cerrar sesión"
  ],

  //PROFILE

  website: [
    "Website",
    "Sitio web"
  ],
  industry: [
    "Industry",
    "Industria"
  ],
  location: [
    "Location",
    "Ubicación"
  ],
  genre: [
    "Genre",
    "Genero"
  ],
  male: [
    "Male",
    "Masculino"
  ],
  female: [
    "Female",
    "Femenino"
  ],
  public: [
    "Public",
    "Público"
  ],
  private: [
    "Private",
    "Privado"
  ],
  member: [
    "Member",
    "Miembro"
  ],
  description: [
    "Description",
    "Descripción"
  ],
  optional: [
    "Optional",
    "Opcional"
  ],
  save_changes: [
    "Save changes",
    "Guardar cambios"
  ],
  cancel: [
    "Cancel",
    "Cancelar"
  ],

  // PROJECT PROFILE

  project_name: [
    "Project name",
    "Nombre del proyecto"
  ],
  visibility: [
    "Visibility",
    "Visibilidad"
  ],
  technology_readiness_levels: [
    "Technology readiness levels",
    "Nivel de madurez tecnológica"
  ],
  level: [
    "Level",
    "Nivel"
  ],
  show: [
    "Show",
    "Mostrar"
  ],
  open: [
    "Open",
    "Abrir"
  ],
  key_performance_indicators: [
    "Key Performance Indicators",
    "Indicadores Clave de Rendimiento"
  ],
  sales: [
    "Sales",
    "Ventas"
  ],
  employees: [
    "Employees",
    "Empleados"
  ],
  raised_capital: [
    "Raised capital",
    "Capital levantado"
  ],
  investment_request: [
    "Investment Request",
    "Solicitud de Inversión"
  ],
  top_investors: [
    "Top Investors",
    "Principales Inversores"
  ],
  partnerships: [
    "Partnerships",
    "Alianzas"
  ],
  patents: [
    "Patents",
    "Patentes"
  ],
  investment_readiness_levels: [
    "Investment Readiness Levels",
    "Nivel de Preparación para la Inversión"
  ],
  autogenerated: [
    "Autogenerated",
    "Autogenerado"
  ],
  irl_1: [
    "Complete first pass canvas",
    "Primer paso del canvas completo"
  ],
  irl_1d: [
    "Add at least one hipothesis on each canvas section to complete this level.",
    "Agrega por lo menos una hipótesis  en cada una de las nueve secciones del canvas para superar este nivel."
  ],
  irl_2: [
    "Market Size / Competitive analysis",
    "Tamaño del mercado / Análisis competitivo"
  ],
  irl_2d: [
    "You will need to define 3 elements to complete this level: total market available, market available to serve and target market. Fill in the market size information in your project profile.",
    "Necesitarás definir 3 elementos para completar este nivel: mercado total disponible, mercado disponible para servir y mercado meta. Completa la información del tamaño de mercado en la ficha de tu proyecto."
  ],
  irl_3: [
    "Problem Solution / Validation",
    "Validación de Problema / Solución"
  ],
  irl_3d: [
    "Validate at least one hypothesis from customer segments and value proposition to pass this level.",
    " Valida al menos una hipótesis de segmentos de clientes y propuesta de valor para superar este nivel."
  ],
  irl_4: [
    "Prototype low fidelity MVP",
    "Prototipo de MVP de baja fidelidad"
  ],
  irl_4d: [
    "A minimum viable product (MVP) is the best way to test your value propositions. Add the link of your low fidelity MVP to reach this level.",
    "Un producto mínimo viable (MVP) es la mejor manera de probar tus propuestas de valor. Agrega la liga de tu MVP de baja fidelidad para alcanzar este nivel."
  ],
  irl_5: [
    "Product / Market fill validation",
    "Ajuste de Producto/ Mercado"
  ],
  irl_5d: [
    "Validate at least half of your customer segments and value proposition hypotheses to reach this level.",
    "Valida por lo menos la mitad de tus hipótesis de segmentos de cliente y de propuesta de valor para alcanzar este nivel."
  ],
  irl_6: [
    "Right side of canvas validation",
    "Validación del lado derecho del canvas"
  ],
  irl_6d: [
    "Validate at least half of the relationships with customers, channels and income model to reach this level.",
    "Valida al menos la mitad de las relaciones con los clientes, canales y modelo de ingresos para alcanzar este nivel."
  ],
  irl_7: [
    "Prototype high fidelity MVP",
    "Prototipo de MVP de alta fidelidad"
  ],
  irl_7d: [
    "Now that the key assumptions have been tested and validated, you will need a high fidelity MVP to confirm that you are right. Add the league of your high fidelity MVP to reach this level.",
    "Ahora que las suposiciones clave han sido probadas y validadas, necesitarás un MVP de alta fidelidad para confirmar que tengas razón.  Agrega la liga de tu MVP de alta fidelidad para alcanzar este nivel."
  ],
  irl_8: [
    "Rest of the canvas validation",
    "Validación del resto del canvas"
  ],
  irl_8d: [
    "Validate at least half of the hypotheses in all sections of the canvas to reach this level.",
    "Valida al menos la mitad de las hipótesis en todas las secciones del canvas para alcanzar este nivel."
  ],
  irl_9: [
    "Metrics that matter validation",
    "Validación de métricas que importan"
  ],
  irl_9d: [
    "Complete the metrics that matter and get your instructor's approval to reach this level.",
    "Completa las métricas que importan y recibe la aprobación de los instructores para alcanzar este nivel."
  ],
  fit: [
    "Fit",
    "Ajuste"
  ],
  mark_all: [
    "Mark all",
    "Marcar todo"
  ],
  complete_stage: [
    "Complete Stage",
    "Completar Etapa"
  ],

  fit_1: [
    "Problem solution",
    "Problema solución"
  ],
  fit_2: [
    "Product market",
    "Producto mercado"
  ],
  fit_3: [
    "Business model",
    "Modelo de negocio"
  ],
  development_1: [
    "Startup",
    "Startup"
  ],
  development_stage: [
    "Development stage",
    "Etapa de desarrollo"
  ],
  development_2: [
    "Grow up",
    "Grow up"
  ],
  development_3: [
    "Scale up",
    "Scale up"
  ],
  development_4: [
    "Industry domain",
    "Dominio de la industría"
  ],
  frontiers: [
    "Horizons",
    "Horizontes"
  ],
  frontier: [
    "Horizon",
    "Horizonte"
  ],
  key_features: [
    "Key Features",
    "Características Principales"
  ],
  prototypes: [
    "Prototypes",
    "Prototipos"
  ],
  no_prototype_uploaded: [
    "No prototype uploaded",
    "Ningún prototipo subido"
  ],
  see_prototype: [
    "See prototype",
    "Ver prototipo"
  ],
  high_fidelity_mvp: [
    "High Fidelity MVP",
    "MVP de Alta Fidelidad"
  ],
  low_fidelity_mvp: [
    "Low Fidelity MVP",
    "MVP de Baja Fidelidad"
  ],
  metrics: [
    "Metrics",
    "Métricas"
  ],
  validated_by_the_instructor: [
    "Validated by the instructor",
    "Validado por el instructor"
  ],
  market_size: [
    "Market Size",
    "Tamaño de Mercado"
  ],
  total_avaliable_market: [
    "Total Avaliable Market",
    "Mercado Total Disponible"
  ],
  server_avaliable_market: [
    "Server Avaliable Market",
    "Mercado Disponible para Servir"
  ],
  target_market: [
    "Target Market",
    "Mercado Meta"
  ],

  //TRL

  trl_instructions: [
    "Check the boxes that correspond to the process current of your project.",
    "Marque las casillas que corresponden al proceso actual de su proyecto."
  ],

  // CANVAS

  canvas: [
    "Canvas",
    "Canvas"
  ],
  week: [
    "Week",
    "Semana"
  ],
  filters: [
    "Filters",
    "Filtros"
  ],
  all: [
    "All",
    "Todas"
  ],
  untested: [
    "Untested",
    "No respaldadas"
  ],
  valid: [
    "Valid",
    "Válidas"
  ],
  invalid: [
    "Invalid",
    "Inválidas"
  ],
  write_a_name: [
    "Write a name",
    "Escribe un nombre"
  ],
  export_image: [
    "Export Image",
    "Exportar Imagen"
  ],
  export_csv: [
    "Export CSV",
    "Exportar CSV"
  ],
  options: [
    "Options",
    "Opciones"
  ],
  building_block: [
    "Building block",
    "Bloque"
  ],
  hypotheses: [
    "Hypotheses",
    "Hipótesis"
  ],
  made_in_canou: [
    "wAIz ©",
    "wAiz ©"
  ],



  // AREAS

  validate: [
    "Validate",
    "Validar"
  ],
  invalidate: [
    "Invalidate",
    "Invalidar"
  ],
  edit: [
    "Edit",
    "Editar"
  ],
  delete: [
    "Delete",
    "Eliminar"
  ],
  area: [
    "Area",
    "Area"
  ],
  other_areas: [
    "Other areas (Phase 2)",
    "Otras areas (Fase 2)"
  ],

  // AREAS-SCALING

  organization_core: [
    "Organization core",
    "Organización"
  ],
  qtr: [
    "QTR.",
    "Trimestral",
  ],
  one_year: [
    "1 year",
    "1 año",
  ],
  three_five_years: [
    "3-5 years",
    "3-5 años",
  ],
  kpis: [
    "KPIs.",
    "KPIs",
  ],



  // HYPOTHESIS-FORM

  add_hypothesis: [
    "Add Hypothesis",
    "Agregar Hipótesis"
  ],
  edit_hypothesis: [
    "Edit Hypothesis",
    "Editar Hipótesis"
  ],
  save: [
    "Save",
    "Guardar"
  ],
  write_your_hypothesis: [
    "Write your Hypothesis",
    "Escribe tu Hipótesis"
  ],
  color: [
    "Color",
    "Color"
  ],
  types: [
    "Types",
    "Tipos"
  ],
  customer_segment: [
    "Customer Segment",
    "Segmento de Mercado"
  ],

  //AREA-FORM
  rename_area: [
    "Rename Area",
    "Renombrar Area"
  ],
  area_name: [
    "Area name",
    "Nombre del area"
  ],

  // HYPOTHESIS-PANEL

  insights: [
    "Insights",
    "Ideas Clave"
  ],
  deep_dive: [
    "Deep Dive",
    "Profundizar"
  ],
  comments: [
    "Comments",
    "Comentarios"
  ],
  help: [
    "Help",
    "Ayuda"
  ],
  Bot: [
    "bot",
    "bot"
  ],

  // INSIGHTS

  describe_your_insight: [
    "Describe your insight",
    "Describe tu idea"
  ],
  must_have: [
    "Must have",
    "Es necesaria"
  ],
  nice_to_have: [
    "Nice to have",
    "'Nice to have'"
  ],
  invalidate_hypothesis: [
    "Invalidate hypothesis",
    "Invalida hipótesis"
  ],
  insights_empty: [
    "Here you can write your insights",
    "Aquí puedes escribir tus ideas clave"
  ],
  insights_interview: [
    "Write the key ideas of this interview",
    "Escribe las ideas clave de esta entrevista"
  ],

  // DEEP DIVE

  next: [
    "Next",
    "Siguiente"
  ],
  previous: [
    "Previous",
    "Anterior"
  ],
  write_your_answer: [
    "Write your answer",
    "Escribe tu respuesta"
  ],

  // COMMENTS

  write_your_comment: [
    "Write your comment",
    "Escribe tu comentario"
  ],

  comments_empty: [
    "Here you can write your comments",
    "Aquí puedes escribir tus comentarios"
  ],

  // INTERVIEWS

  interview: [
    "Interview",
    "Entrevista"
  ],
  preview: [
    "Preview",
    "Vista previa"
  ],
  demostration: [
    "Demostration",
    "Demostración"
  ],
  weekly: [
    "Weekly",
    "Semanales"
  ],
  totals: [
    "Totals",
    "Totales"
  ],
  customers: [
    "Customers",
    "Clientes"
  ],
  experts: [
    "Experts",
    "Expertos"
  ],
  transcript: [
    "Transcript",
    "Transcripción"
  ],
  summary: [
    "Summary",
    "Resumen"
  ],
  interviewee_information: [
    "Interviewee information",
    "Datos del entrevistado"
  ],
  name: [
    "Name",
    "Nombre"
  ],
  last_name: [
    "Last name",
    "Apellido"
  ],
  job_role: [
    "Job / role",
    "Trabajo / rol"
  ],
  company: [
    "Company",
    "Compañía"
  ],
  contact: [
    "Contact",
    "Contacto"
  ],
  category: [
    "Category",
    "Categoría"
  ],
  type: [
    "Type",
    "Tipo"
  ],
  key_insights: [
    "Key insights",
    "Ideas clave"
  ],
  discard: [
    "Discard",
    "Descartar"
  ],
  new_interview: [
    "New Interview",
    "Nueva Entrevista"
  ],
  interview_method: [
    "Interview method",
    "Método de la entrevista"
  ],
  interviewee_type: [
    "Interviewee type",
    "Tipo de entrevistado"
  ],
  customer: [
    "Customer",
    "Cliente"
  ],
  expert: [
    "Expert",
    "Experto"
  ],
  face_to_face: [
    "Face to face",
    "Cara a cara"
  ],
  telephone: [
    "Telephone",
    "Telefono"
  ],
  video_call: [
    "Video call",
    "Video llamada"
  ],

  // User Profile

  short_bio: [
    "Short Bio",
    "Breve Biografía"
  ],
  experience: [
    "Experience",
    "Experiencia"
  ],
  education: [
    "Education",
    "Educación"
  ],
  what_have_you_made: [
    "What have you made?",
    "¿Qué has hecho?"
  ],
  made_description: [
    "Describe something great you've made",
    "Describe algo genial que hayas hecho"
  ],
  languages: [
    "Languages",
    "Lenguajes"
  ],
  primary_skills: [
    "Primary Skills",
    "Habilidades Principales"
  ],
  secondary_skills: [
    "Secondary Skills",
    "Habilidades Secundarias"
  ],
  write_bio: [
    "Write a short biography",
    "Escribe una breve biografía"
  ],
  job: [
    "Job (position)",
    "Trabajo (Posición)",
  ],
  period: [
    "Period",
    "Periodo"
  ],
  school: [
    "School",
    "Escuela"
  ],
  degree: [
    "Degree",
    "Grado"
  ],
  language: [
    "Language",
    "Lenguaje"
  ],
  phone: [
    "Phone",
    "Teléfono"
  ],
  add_work_experience: [
    "Add work experience",
    "Agregar experiencia laboral"
  ],
  add_education: [
    "Add education",
    "Agregar educación"
  ],
  add_language: [
    "Add language",
    "Agregar lenguaje"
  ],
  add_primary_skill: [
    "Add primary skill",
    "Agregar habilidad primaria"
  ],
  add_secondary_skill: [
    "Add secondary skill",
    "Agregar habilidad secundaria"
  ],
  university: [
    "University",
    "Universidad"
  ],
  first_name: [
    "First name",
    "Nombre"
  ],
  profile_image: [
    "Profile image",
    "Imagen de perfil",
  ],
  export: [
    "Export",
    "Exportar"
  ],
  export_data: [
    "Export data",
    "Exportar datos"
  ],

  //KB

  section: [
    "Section",
    "Sección"
  ],


  //FINANCIAL BOARD

  financial_board: [
    "Financial Board",
    "Tablero Financiero"
  ],

  interval: [
    "Interval",
    "Intervalo"
  ],

  net_income: [
    "Net income",
    "Ingresos Netos"
  ],

  gross_profit_margins: [
    "Gross profit margins",
    "Margen bruto de ganancia"
  ],
  ebitda: [
    "EBITDA",
    "EBITDA"
  ],
  cogs: [
    "COGS",
    "Gastos Operativos"
  ],
  burn_rate: [
    "Burn rate",
    "Burn rate"
  ],
  new_customers: [
    "New Customers (quarterly)",
    "Clientes nuevos (trimestral)"
  ],
  customer_acquisition_cost: [
    "Customer acquisition cost",
    "Costo de adquisión del cliente"
  ],
  customer_lifetime_value: [
    "Customer lifetime value",
    "Valor de vida del cliente"
  ],
  customer_churn_rate: [
    "Customer churn rate",
    "Tasa de abandono del cliente"
  ],
  expenses: [
    "Expenses",
    "Gastos"
  ],
  runaway: [
    "Runway (months)",
    "Flujo para operaciones"
  ],

  // Dashboards

  dashboards: [
    "Dashboards",
    "Tableros"
  ],
  performance: [
    "Performance",
    "Rendimiento"
  ],
  benchmark: [
    "Benchmark",
    "Benchmark"
  ],
  cohort: [
    "Cohort",
    "Cohort"
  ],
  personal: [
    "Personal",
    "Personal"
  ],
  personal_projects: [
    "Personal Projects",
    "Proyectos Personales"
  ],
  overview: [
    "Overview",
    "Panorama general"
  ],
  total: [
    "Total",
    "Total"
  ],
  last_week: [
    "Last week",
    "Última semana"
  ],
  this_week: [
    "This week",
    "Esta semana"
  ],
  show_details: [
    "Show details",
    "Mostrar detalles"
  ],
  hide_details: [
    "Hide details",
    "Ocultar detalles"
  ],
  interview_types: [
    "Interview types",
    "Tipos de entrevistas"
  ],
  interview_empty: [
    "Select or create interviews of your clients & experts",
    "Seleccione o cree entrevistas de sus clientes & expertos"
  ],

  // Search
  search_noun: [
    "Search",
    "Búsqueda"
  ],
  users: [
    "Users",
    "Usuarios"
  ],
  showing_results_for: [
    "Showing results for",
    "Mostrando resultados para"
  ],
  filter: [
    "Filter",
    "Filtro"
  ],
  no_results: [
    "No results",
    "Sin resultados"
  ],

  // Settings

  set_language: [
    "Set Language",
    "Definir Lenguaje"
  ],
  change_language: [
    "Change Language",
    "Cambiar Lenguaje"
  ],
  change_password: [
    "Change Password",
    "Cambiar Contraseña"
  ],
  old_password: [
    "Old password",
    "Contraseña anterior"
  ],
  new_password: [
    "New password",
    "Nueva contraseña"
  ],
  repeat_new_password: [
    "Repeat new password",
    "Repetir nueva contraseña"
  ],
  password_error: [
    "Passwords do not match",
    "Las contraseñas no coinciden"
  ],
  password_done: [
    "Password has been modified",
    "Contraseña modificada"
  ],

  //New project
  create_a_project: [
    "Create a Project",
    "Crea un Proyecto"
  ],
  create_project: [
    "Create project",
    "Crear proyecto"
  ],
  write_the_project_name: [
    "Write the project name",
    "Escribe el nombre del proyecto"
  ],
  write_brief_description: [
    "Write a brief description of the project",
    "Escribe una breve descripción del proyecto"
  ]
}

const lc = locale =>
{
  let lang1 = sessionStorage.getItem('lang');
  if (lang1 == null) lang1 = lang;
  if (locale == null || locale.ref == null) return "";
  if (lang1.startsWith("EN")) return locale.ref;
  for (let t of locale.translations)
    if (lang1.startsWith(t.lang)) return t.value;
  return locale.ref;
}

const lcs = name =>
{
  let lang1 = sessionStorage.getItem('lang');
  if (lang1 == null) lang1 = lang;
  let locale = Locales[name];
  if (locale == null) return "";
  if (lang1.startsWith("EN")) return locale[0];
  if (lang1.startsWith("ES")) return locale[1];
  return locale[0]
}

const getLang = () =>
  sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : lang;

const getDate = (date) =>
{
  if (!date) return '';
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[new Date(date).getMonth()]} ${new Date(date).getDate()}`;
}

export { lc, lcs, lang, getDate, getLang };
