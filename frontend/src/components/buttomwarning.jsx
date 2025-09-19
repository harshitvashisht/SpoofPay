import {Link} from "react-router-dom"

export function ButtomWarning({label , warningtext , to}){
    return <div>
        {label}
       <Link to={to} className="text-blue-500 underline">
        {warningtext}
      </Link>
    </div>
}