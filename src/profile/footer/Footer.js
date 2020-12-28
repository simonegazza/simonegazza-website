import "./Footer.css"
import mail from "../../statics/mail.png"
import github from "../../statics/github.png"
import ig from "../../statics/ig.png"

const Footer = props => {
    return (
        <div className="footer">
            <table className="footerTable">
                <tbody>
                    <tr>
                        <td className="footerColumn"><a href="https://www.instagram.com/simiraikkonen/"><img className="footerImage" alt="instagram" src={ig} /></a></td>
                        <td className="footerColumn"><a href="https://github.com/simonegazza"><img className="footerImage" alt="instagram" src={github} /></a></td>
                        <td className="footerColumn"><a href="mailto:mail@simonegazza.me"><img className="footerImage" alt="instagram" src={mail} /></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Footer