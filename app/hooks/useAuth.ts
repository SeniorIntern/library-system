import { useRouter } from "next/navigation"
import useUserStore from "../store"
import { useEffect, useState } from "react"

const useAuth = () => {
  const { token, setToken } = useUserStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [token, router])

  return { token, setToken, isLoading }
}

export default useAuth
