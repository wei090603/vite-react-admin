import { getStorage } from "@/utils/storage";
import { Navigate } from "react-router-dom";

function Auth({ children }: any) {
  const isToken = getStorage('token')
  if(isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export {
  Auth
}