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
   return(
      <div className={css.githubPage}>
         {gitData === null ?
         null
         :
         gitData === "Invalid" ?
         <div>
            GitHub tidak di temukan!
         </div>
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
               <span className={css.githubUserRepoText}>Repositories</span> 
               <div>
                  {
                  gitRepos.length === 0 ?
                  <div style={{fontStyle: "italic", margin: "2vw", textAlign: "center"}}>It seems that this user hasn't create any repositories yet</div>
                  :
                  gitRepos.slice(0,5).map((item) => {
                     return(
                        <Repo commits={item.commits_url} name={item.name} url={item.html_url}/>
                     )
                  })}
               </div>
            </div>
         </div>
         }
      </div>
   )
}