import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'

const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker()
  
    return (
      promiseInProgress &&
         <div 
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'relative',
            top: '30%',
          }}
        >
        <Loader type="ThreeDots" color="#2BAD60" height="75" width="75" />
      </div>
    )
  }

export default LoadingIndicator