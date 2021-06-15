import css from "./style.module.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import axios from "axios"

export default function Home() {
   const history = useHistory()
   const [searchInput, setInput] = useState("")
   // INPUT CHANGE
   const inputChange = (e) => {
      setInput(e.target.value)
   }
   const searchUser = () => {
      history.push("/github/" + searchInput)
   }
   return(
      <div className="displayColumn" style={{alignItems: "center", height: "100vh", justifyContent: "center"}}>
         <div className="displayRow">
            <form>
               <input className={css.searchInput} onChange={ (e) => { inputChange(e) } } placeholder="Search a GitHub user here..." value={searchInput}></input>
               <button className={css.searchBtn} onClick={ () => { searchUser() } }>Search</button>
            </form>
         </div>
      </div>
   )
}