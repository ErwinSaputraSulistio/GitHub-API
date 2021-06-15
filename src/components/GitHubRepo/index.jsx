import css from "./Repo.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
// IMAGES
import Top from "../../assets/Top.png"
import Bottom from "../../assets/Bottom.png"

export default function GitHubRepo({ commits, name, url }) {
   const [repoCommits, setCommits] = useState([])
   const [showCommits, switchHideShow] = useState(false)
   useEffect(() => {
      axios.get(commits.slice(0,-6))
      .then((res) => {
         setCommits(res.data)
      })
      .catch((err) => {
         console.log(err.response)
      })
   }, [])
   console.log(repoCommits)
   return(
      <div className={css.repoBtn}>
         <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between"}}>
            <a className={css.repoText} href={url} target="_blank">{name}</a>
            <img className="hoverThis" onClick={ () => { switchHideShow(!showCommits) } } src={showCommits === false ? Bottom : Top} style={{height: "10%"}}/>
         </div>
         <div className={css.commitsList} style={showCommits === false ? {display: "none"} : null}>
            <b>Commits :</b>
            {
               repoCommits.map((item) => {
                  return(
                     <div className="displayRow" style={{justifyContent: "space-between", width: "100%"}}>
                        <span>{item.commit.author.name}</span>
                        <span>{item.commit.message}</span>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}