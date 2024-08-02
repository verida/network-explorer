import React from "react"
import { Oval } from "react-loader-spinner"

const HubLoading = () => {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#D9D9D9"
        secondaryColor="rgb(217, 217,217,0.3)"
        wrapperClass=""
      />
      <div className="flex flex-col items-center gap-3">
        <div className="text-[18px] font-bold leading-[20px] text-foreground">
          Processing Transaction
        </div>
        <div className="text-center text-[14px] font-normal leading-[20px] text-muted-foreground">
          Your transaction is currently being processed. This may take a few
          moments as it is confirmed on the blockchain. Please be patient.
        </div>
      </div>
    </div>
  )
}

export default HubLoading
