
export function Input ({placeholder , label , referance}){

    return <div >
        {label}
        <div className="mt-2 ,mb-2">
        <input ref={referance} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={placeholder} />
        </div>
    </div>

}