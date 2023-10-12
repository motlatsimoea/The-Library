import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileEditScreen from './screens/ProfileEditScreen'
import UploadScreen from './screens/UploadScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import PrivateRoute from './utils/PrivateRoutes'


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
              <Route path="/register" element={<RegisterScreen />} />
              <Route
                path="/" element={<HomeScreen />} />

              <Route 
                path="/book/:id" 
                element={
                  <PrivateRoute>
                      <BookScreen />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/profile/" 
                element={
                  <PrivateRoute>
                        <ProfileScreen />
                  </PrivateRoute>
                  } 
              />

              <Route path="/profile/edit" element={<ProfileEditScreen />} />

              <Route 
                path="/upload" 
                element={<UploadScreen />} 
              />

              <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
