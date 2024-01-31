const Khalti = () => {
    return(
    <div>
      <div className="tab-container relative flex flex-row items-start bg-gray-300 rounded-lg p-1">
        <input type="radio" name="tab" id="tab1" className="tab tab--1 absolute z-10 opacity-0" />
        <label className="tab_label z-20 flex items-center justify-center w-28 h-10 border border-transparent text-xs font-semibold text-gray-600 cursor-pointer transition-opacity duration-300 hover:opacity-100" htmlFor="tab1">Profile</label>

        <input type="radio" name="tab" id="tab2" className="tab tab--2 absolute z-10 opacity-0" />
        <label className="tab_label z-20 flex items-center justify-center w-28 h-10 border border-transparent text-xs font-semibold text-gray-600 cursor-pointer transition-opacity duration-300 hover:opacity-100" htmlFor="tab2">Settings</label>

        <input type="radio" name="tab" id="tab3" className="tab tab--3 absolute z-10 opacity-0" />
        <label className="tab_label z-20 flex items-center justify-center w-28 h-10 border border-transparent text-xs font-semibold text-gray-600 cursor-pointer transition-opacity duration-300 hover:opacity-100" htmlFor="tab3">Notifications</label>

        <div className="indicator w-28 h-10 bg-white absolute top-0 left-0 z-0 rounded-lg border border-gray-300 shadow transition-all duration-200 ease-out"></div>
      </div>
    </div>
  )
}

export default Khalti
