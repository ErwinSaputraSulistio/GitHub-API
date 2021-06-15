import css from "./Repo.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
// IMAGES
import Top from "../../assets/Top.png"
import Bottom from "../../assets/Bottom.png"

export default function GitHubRepo({ commits, counter, name, url }) {
   const [repoCommits, setCommits] = useState([])
   const [showCommits, switchHideShow] = useState(false)
   const [viewMore, setViewCount] = useState(5)
   useEffect(() => {
      axios.get(commits.slice(0,-6))
      .then((res) => {
         setCommits(res.data)
      })
      .catch((err) => {
         console.log(err.response)
      })
   }, [])
   useEffect(() => {
      switchHideShow(false)
      setViewCount(5)
      axios.get(commits.slice(0,-6))
      .then((res) => {
         setCommits(res.data)
      })
      .catch((err) => {
         console.log(err.response)
      })
   }, [counter])
   return(
      <div className={css.repoBtn}>
         <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between"}}>
            <a className={css.repoText} href={url} target="_blank">{name}</a>
            <img className="hoverThis" onClick={ () => { switchHideShow(!showCommits) } } src={showCommits === false ? Bottom : Top} style={{height: "10%"}}/>
         </div>
         <div className={css.commitsList} style={showCommits === false ? {display: "none"} : null}>
            <b>Commits :</b>
            <div style={{margin: "1.5vw 0"}}>
            {
               repoCommits.slice(0, viewMore).map((item) => {
                  return(
                     <div className="displayRow" style={{justifyContent: "space-between", width: "100%"}}>
                        <span className={css.commitText}>{item.commit.author.name}</span>
                        <span className={css.commitText}>{item.commit.message}</span>
                     </div>
                  )
               })
            }
            </div>
            {
               repoCommits.length > 5 && viewMore < repoCommits.length ?
               <div style={{fontWeight: "bold", textAlign: "center"}}><span className="hoverThis" onClick={ () => { setViewCount(viewMore + 5) } }>View more</span></div>
               :
               null
            }
         </div>
      </div>
   )
}