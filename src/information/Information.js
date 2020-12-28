import "./Information.css"

const Information = props => { 
    return (
        <div className="information">
            <table className="informationTableOuter">
                <tbody>
                    <tr>
                        <td className="cell">
                            <p className="informationP">EDUCATION</p><p className="informationArrow">→</p>
                        </td>
                        <td>
                            <table className="informationTableInner">
                            <tbody>
                                    <tr><td>2017 / today</td></tr>
                                    <tr><td className="certification">Bachelor Degree <br />Computer Science</td></tr>
                                    <tr><td>Università degli studi di Parma</td></tr>
                                    <tr><td>Parma</td></tr>
                                </tbody>
                            </table>
                            <table className="informationTableInner">
                                <tbody>
                                    <tr><td>2012 / 2017</td></tr>
                                    <tr><td className="certification">High School Diploma</td></tr>
                                    <tr><td>Liceo Scientifico G. Marconi</td></tr>
                                    <tr><td>Parma</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="cell">
                            <p className="informationP">WORK</p><p className="informationArrow">→</p>
                        </td>
                        <td>
                            <table className="informationTableInner">
                                <tbody>
                                    <tr><td>2017 / 2020</td></tr>
                                    <tr><td className="certification">AWS Cloud Solution Architect</td></tr>
                                    <tr><td>Soluzioni Futura</td></tr>
                                    <tr><td>Reggio Emilia</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="cell">
                            <p className="informationP">STUFF I LIKE</p><p className="informationArrow">→</p>
                        </td>
                        <td>
                            <table className="silTable">
                                <tbody>
                                    <tr>
                                        <td>Rust</td>
                                    </tr>
                                    <tr>
                                        <td>Haskell</td>
                                    </tr>
                                    <tr>
                                        <td>Java</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud Solution <br /> Architect</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="silTable">
                                <tbody>
                                    <tr>
                                        <td>Bash</td>
                                    </tr>
                                    <tr>
                                        <td>SQL</td>
                                    </tr>
                                    <tr>
                                        <td>JavaScript</td>
                                    </tr>
                                    <tr>
                                        <td>Software <br />Engineering</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="silTable">
                                <tbody>
                                    <tr>
                                        <td>Planning</td>
                                    </tr>
                                    <tr>
                                        <td>Adaptability</td>
                                    </tr>
                                    <tr>
                                        <td>Teamwork</td>
                                    </tr>
                                    <tr>
                                        <td>Problem <br />solving</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="silTable">
                                <tbody>
                                    <tr>
                                        <td>Archery</td>
                                    </tr>
                                    <tr>
                                        <td>Gaming</td>
                                    </tr>
                                    <tr>
                                        <td>Coding</td>
                                    </tr>
                                    <tr>
                                        <td>Hiking</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Information
