import React from "react";
import { useState } from "react";
import FilesUploadComponent from "./files-upload-component";
import Fileupdate from "./fileupdate";
import UserProfileList from "./UserProfileList";
export default function Project()
{
    const [option, setOption] = useState(0);
  const [profile, setProfile] = useState({});
    return(
        <>
        <section id="portfolio" class="portfolio">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Portfolio</h2>
          <h3>Check our <span>Portfolio</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-app">App</li>
              <li data-filter=".filter-card">Card</li>
              <li data-filter=".filter-web">Web</li>
            </ul>
          </div>
        </div>

        <div className="App">
      {(option === 0) ? <FilesUploadComponent /> : <Fileupdate profile={profile} setOption={setOption} />}
      <UserProfileList setOption={setOption} setProfile={setProfile} />
    </div>
        </div>

     
    </section>
        </>
    )
}