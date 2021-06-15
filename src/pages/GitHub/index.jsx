import css from "./style.module.css"
import axios from "axios"
import Swal from "sweetalert2"
import { Octokit } from "@octokit/core"
// COMPONENTS
import Repo from "../../components/GitHubRepo"
// REACT HOOKS
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function GitHub() {
   const { id } = useParams()
   const [gitData, setGitData] = useState(null)
   const [repoCounter, setCounter] = useState(5)
   // GIT REPOS
   const [gitRepos, setGitRepos] = useState([])
   useEffect(() => {
      axios.get(process.env.REACT_APP_GITHUB_API + id)
      .then((res) => { 
         setGitData(res.data) 
         document.title = "GitHub - " + res.data.name
         axios.get(process.env.REACT_APP_GITHUB_API + id + "/repos")
         .then((res) => {
            setGitRepos(res.data)
         })
      })
      .catch((err) => {
         setGitData("Invalid")
         Swal.fire(
            err.response.data.message, 
            "User GitHub yang ingin di cari tidak dapat di temukan!", 
            "error"
         )
      })
   }, [])
   // ARROW FUNCTIONS
   const arrowFunc = (func) => {
      if(func === "+") {
         setCounter(((repoCounter/5) + 1) * 5)
      }
      else if(func === "-") {
         setCounter(((repoCounter/5) - 1) * 5)
      }
   }
   return(
      <div className={css.githubPage}>
         {gitData === null ?
         null
         :
         gitData === "Invalid" ?
         <div className="displayRow" style={{alignItems: "center", fontSize: "32px", height: "100vh", justifyContent: "center"}}>Tidak dapat menemukan user yang di cari!</div>
         :
         <div className={css.githubUserBorder}>
            <a className={"displayColumn " + css.githubUserInfo} href={gitData.html_url} target="_blank">
               <img className={css.githubUserAvatar} src={gitData.avatar_url}/>
               <span className={css.githubUserName}>{gitData.name}</span>
               <span className={css.githubUserBio}>
                  {
                  gitData.bio === null ?
                  <i>It seems that this user hasn't write his/her biodata yet</i>
                  :
                  gitData.bio.length > 100 ? 
                  gitData.bio.slice(0,99) + "..." 
                  : 
                  gitData.bio
                  }
               </span>
               <span className={css.githubClickMe}>[ Visit GitHub ]</span>
            </a>
            <div className={"displayColumn " + css.githubUserRepo}>
               <div className="displayRow" style={{alignItems: "center", borderBottom: "0.1vw solid #9F9F9F", justifyContent: "center"}}>
                  <span className={css.githubUserRepoText}>Repositories</span> 
                  <div className={"displayRow " + css.paginationBorder}>
                     {repoCounter/5 <= 1 ?
                     <span style={{opacity: "0.11"}}>{"<"}</span>
                     :
                     <span className="hoverThis" onClick={ () => { arrowFunc("-") } }>{"<"}</span>
                     }
                     <span>{repoCounter / 5}</span>
                     {repoCounter >= gitRepos.length ?
                     <span style={{opacity: "0.11"}}>{">"}</span>
                     :
                     <span className="hoverThis" onClick={ () => { arrowFunc("+") } }>{">"}</span>
                     }
                  </div>
               </div>
               <div>
                  {
                  gitRepos.length === 0 ?
                  <div style={{fontStyle: "italic", margin: "2vw", textAlign: "center"}}>It seems that this user hasn't create any repositories yet</div>
                  :
                  gitRepos.slice(repoCounter -5, repoCounter).map((item) => {
                     return(
                        <Repo commits={item.commits_url} counter={repoCounter} name={item.name} url={item.html_url}/>
                     )
                  })}
               </div>
            </div>
         </div>
         }
      </div>
   )
}