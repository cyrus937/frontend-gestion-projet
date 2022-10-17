import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/homePage';
import { LoginPage } from './modules/login/pages';
import { RegistrationPage } from './modules/registration/pages';
import { Dash } from './modules/dashboard/pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='signin' element={<LoginPage />} />
        <Route path='signup' element={<RegistrationPage />} />
        <Route path='dashboard' element={<Dash />} />

        {/*<Route path='expert'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<ExpertDashboard />} />
          <Route path='cases' element={<ClinicalCase />} />
          <Route path='cases/new' element={<NewCasePage />} />
          <Route path='cases/detail' element={<DetailCasePage />} />
          <Route path='learners' element={<LearnerPage />} />
          <Route path='evaluation' element={<EvaluationPage />} />
          <Route
            path='evaluation/report'
            element={<EvaluationDetailReport />}
          />
        </Route>

        <Route path='admin'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='experts' element={<Expert />} />
        </Route>

        <Route path='learner'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<LearnerDashboard />} />
          <Route path='specialities' element={<Specialities />} />
          <Route path='consultation/:training' element={<Consultation />} />
          <Route
            path='consultation-report/:evaluation'
            element={<EvaluationReport />}
          />
        </Route>

        <Route path='/page-not-found' element={<PageNotFound />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/not-connected' element={<NotConnected />} />
        <Route path='*' element={<Navigate to='/page-not-found' replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
