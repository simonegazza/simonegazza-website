import profilePic from "../statics/profile_pic.png"
import "./Profile.css"
import Footer from "./footer/Footer"

const Profile = props => {
    return (
        <div className="profile">
            <div className="mobileProfile">
                <img src={profilePic} className="profilePic" alt="Profile"/>
                <p className="profileP"> I’m an italian Cloud Solution Architect, based in Parma. 
                    I really enjoy games that are Turing-complete and breaking them. 
                    In my spare time I like to watch Netflix and thinking about how
                    I can improve things around me 
                </p>
                <Footer />
            </div>
        </div>
    )
}

export default Profile