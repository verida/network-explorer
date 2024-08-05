import React from "react"

import SuccessIcon from "@/assets/svg/success.svg"

const UnStakeSuccess = () => {
  return (
    <div className="flex flex-col items-center gap-10 pb-5 pt-10">
      <SuccessIcon />
      <div className="flex flex-col gap-4">
        <div className="text-center text-[24px] font-bold leading-[28.8px] text-foreground">
          Process Completed: Storage Node Removed
        </div>
        <div className="text-center text-[14px] font-normal text-muted-foreground">
          The removal of the storage node is complete. Thank you for your
          cooperation. If you have any further questions, please reach out to
          our support team.
        </div>
      </div>
    </div>
  )
}

export default UnStakeSuccess
