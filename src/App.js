import React from "react"

import BackgroundAnimation from "./background/Background"
import Name from "./name/Name"
import Profile from "./profile/Profile"
import Information from "./information/Information"
import ElenaNironi from "./elenanironi/ElenaNironi"

import "./App.css"

function App() {
  return (
  <div>
      <div className="background"></div>
      <BackgroundAnimation />
    <div className="mobileApp">
        <div className="hi">
          <Name />
        </div>
        <div className="app">
          <Profile />
          <Information />
        </div>
        <ElenaNironi />
    </div>
  </div>
  )
}

export default App