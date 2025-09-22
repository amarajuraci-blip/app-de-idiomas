import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import LoginPage from './components/LoginPage';
// O RegisterPage foi removido
import ProtectedRoute from './components/ProtectedRoute';
import LanguageSelectionPage from './components/LanguageSelectionPage';
import HomePage from './components/HomePage';
import Module1Page from './components/Module1Page';
import LessonPage from './components/LessonPage';
import Module2Page from './components/Module2Page';
import Module3Page from './components/Module3Page';
import Module4Page from './components/Module4Page';
import Module5Page from './components/Module5Page';
import LessonCompletionPage from './components/LessonCompletionPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rotas Protegidas */}
        <Route 
          path="/selecao-idioma" 
          element={<ProtectedRoute><LanguageSelectionPage /></ProtectedRoute>} 
        />
        
        {/* Rotas dinâmicas com base no idioma */}
        <Route path="/:lang/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/:lang/modulo/1" element={<ProtectedRoute><Module1Page /></ProtectedRoute>} />
        <Route path="/:lang/modulo/1/aula/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/:lang/modulo/2" element={<ProtectedRoute><Module2Page /></ProtectedRoute>} />
        <Route path="/:lang/modulo/3" element={<ProtectedRoute><Module3Page /></ProtectedRoute>} />
        <Route path="/:lang/modulo/4" element={<ProtectedRoute><Module4Page /></ProtectedRoute>} />
        <Route path="/:lang/modulo/5" element={<ProtectedRoute><Module5Page /></ProtectedRoute>} />

        {/* Rota para a tela de conclusão */}
        <Route 
          path="/:lang/aula-concluida" 
          element={<ProtectedRoute><LessonCompletionPage /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;