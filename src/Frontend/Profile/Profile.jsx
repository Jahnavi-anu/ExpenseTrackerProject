

import profo from '../../assets/profo.png'
import './Profile.css'
const profile = ()=>{
    return(
        <>
        <h1>Profile</h1>
       <div className="ProfilePage">
        
               <div className="ProfileSection">
                  <div className="ProfileTab">
                 <div className="Profile">
                   <img src={profo} alt="" />   
                   <div className="ProfileDetails">
                     <h2>Jahnavi Veeranala</h2>
                     <p>jahnaviveeranala08@gmail.com</p>
                  </div>
                <div className="Editbutton">
                   <button className='edit'>EditProfile</button>
               </div>
                  </div>
               {/* <h1>Hello Janu</h1> */}
          </div>
              
        </div>
           <div className="PreferenceSec">
                 <div className="PersonalDetails">
              <h3>Personal Details</h3>
              <div className="FullName">
                 <label htmlFor="fName">Full Name</label>
                 <input type="text" />
              </div>
              <div className="Email">
                 <label htmlFor="fName">Email</label>
                 <input type="text" />
              </div>
               <div className="PhoneNumber">
                 <label htmlFor="fName">Phone Number</label>
                 <input type="text" />
              </div>
               <div className="Occupation">
                 <label htmlFor="fName">Occupation</label>
                 <input type="text" />
              </div>
               <div className="Address">
                 <label htmlFor="fName">Address</label>
                 <input type="text" />
              </div>
              <div className="DetailsChanges">
                  <button> Save Changes </button>
              </div>

                 </div>
            <div className="Preference">
                   <h3>Preferences</h3>
                 <div className="Theme">
                      <label htmlFor="">Theme</label>
                      <div className="typeSelection">
                             <label htmlFor="">
                                   <input type="radio" 
                                          
                                   /> 
                                   Light
                             </label>
                             <label htmlFor="">
                                   <input type="radio" 
                                          
                                   />
                                   Dark
                             </label>
                      </div>
                 </div>
                 <div className="Notify">
                       <label htmlFor="">Notification</label>
                      <div className="typeSelection">
                             <label htmlFor="">
                                   <input type="checkbox" 
                                          
                                   />
                                   Light
                             </label>
                             <label htmlFor="">
                                   <input type="checkbox" 
                                          
                                   />
                                   Dark
                             </label>
                      </div>
                 </div>
                 <div className="PrivacySec">
                       
                       <button className='passchange'>Change Password</button>
                 </div>
            </div>
      </div>
        
       </div>
        
        </>
    )
}

export default profile;