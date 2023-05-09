import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Topheader from './components/topheader';
import Domain from './components/domain';
import About from './components/About';
import Preloader from './components/preloader';
import Service from './components/service';
import Project from './components/project';
import Contact from './components/Contact';

export default function App(){
  
  return(
    <>
    {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDisplay />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
        <Footer />
      </Router> */}
      <Preloader/>
    <Topheader/>
    <Header/>
    <Home/>
    <Domain/>
    <About/>
    <Service/>
    <Project/>
    <Contact/>
    {/* <div className='App'>
      {(doption===0)?<DomainUplaod/>:<DomainUpdate domain={domain} setDoption={setDoption}/>}
      <DomainList setDoption={setDoption} setDomain={setDomain}/>
    </div> */}
    </>
  )
}