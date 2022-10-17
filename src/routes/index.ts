export const ROUTES = {
    HOME_PAGE: '/',
    LOGIN: '/signin',
    REGISTER: '/signup',
    DASHBOARD: '/dashboard',
    PROJET: {
      NEW: '/projet/new',
      CASES: '/expert/cases',
      DETAIL: '/expert/projet/detail',
      PROFILE: '/expert/profile',
      EVALUATION: '/expert/evaluation',
      DETAIL_EVALUATION: '/expert/evaluation/report',
    },
    EXPERT: {
      DASHBOARD: '/expert/dashboard',
      LEARNERS: '/expert/learners',
      CASES: '/expert/cases',
      NEW_CASE: '/expert/cases/new',
      DETAIL_CASE: '/expert/cases/detail',
      PROFILE: '/expert/profile',
      EVALUATION: '/expert/evaluation',
      DETAIL_EVALUATION: '/expert/evaluation/report',
    },
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      EXPERTS: '/admin/experts',
      NEW_EXPERT: '/admin/experts/new',
      PROFILE: '/admin/profile',
    },
    LEARNERS: {
      DASHBOARD: '/learner/dashboard',
      EVALUATION: '/learner/learners',
      FEEDBACK: '/learner/cases',
      SPECIALITIES: '/learner/specialities',
      CONSULTATION: (training: string) => `/learner/consultation/${training}`,
      CONSULT_REPORT: (evaluation: string) =>
        `/learner/consultation-report/${evaluation}`,
    },
  }
  