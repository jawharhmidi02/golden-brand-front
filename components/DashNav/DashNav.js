import React from 'react'
import DashMenu from '../DashMenu/DashMenu'

const DashNav = () => {
  return (
    <div className="flex flex-col gap-8 px-5 py-8  items-center bg-transparent border-r min-h-[100vh] w-[250px] border-[#2c2d33]">
      <div className="flex flex-row justify-center items-center gap-3">
        <img src="/images/dash-icon.png" alt="mini-logo" className="size-[70px]"></img>
        <div className="flex flex-col">
          <div className="font-bold text-lg text-amber-400 tracking-wider">Golden B.</div>
          <div className="text-[var(--dash-theme5)] font-semibold text-sm tracking-widest">Management</div>
        </div>
      </div>
      <DashMenu/>
    </div>
  )
}

export default DashNav