import { useRouter } from "next/navigation"
import useUserStore from "../store"
import { useEffect } from "react"

const useAuth = () => {
  const { token, setToken } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  return { token, setToken }
}

export default useAuth
