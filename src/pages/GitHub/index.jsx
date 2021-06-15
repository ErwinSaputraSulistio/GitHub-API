import css from "./style.module.css"
import axios from "axios"
import Swal from 'sweetalert2'
// REACT HOOKS
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function GitHub() {
   const { id } = useParams()
   const [gitData, setGitData] = useState(null)
   const [gitRepos, setGitRepos] = useState([])
   useEffect(() => {
      document.title = "GitHub - Repositories"
      axios.get(process.env.REACT_APP_GITHUB_API + id)
      .then((res) => { 
         setGitData(res.data) 
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
   console.log(gitRepos)
   return(
      <div>
         <div>
            {gitData === null ?
            null
            :
            gitData === "Invalid" ?
            <div>
               GitHub tidak di temukan!
            </div>
            :
            <div className={"displayRow " + css.githubUserBorder}>
               <div className={"displayColumn " + css.githubUserInfo}>
                  <img className={css.githubUserAvatar} src={gitData.avatar_url}/>
                  <span className={css.githubUserName}>{gitData.name}</span>
                  <span className={css.githubUserBio}>{gitData.bio}</span>
               </div>
               <div className={"displayColumn " + css.githubUserRepo}>
                  <span className={css.githubUserRepoText}>Repositories</span> 
                  <div>
                  
                  </div>
               </div>
            </div>
            }
         </div>
      </div>
   )
}