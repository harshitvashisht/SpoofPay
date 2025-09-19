import { useEffect } from "react"
import { useState ,useRef} from "react"

export default function Dropdown(){
       const[openDropdown , setOpenDropdown] = useState(false)
       const dropdownRef = useRef(null)

       function dropdownhandler (){
        setOpenDropdown(prev => !prev)
       }

       useEffect(()=>{
        function handleclickoutside(event){

            if(dropdownRef.current && !dropdownRef.current.contains(event.target))
              setOpenDropdown(false)
        }
        document.addEventListener('mousedown',handleclickoutside)
        return ()=>{
            document.removeEventListener('mousedown',handleclickoutside)
        }
       },[])


return <div ref={dropdownRef} > <button onClick={dropdownhandler} type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>

</button>
{openDropdown && <div id="dropdownDelay" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="/pages/signin" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign In</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>}
</div>

}