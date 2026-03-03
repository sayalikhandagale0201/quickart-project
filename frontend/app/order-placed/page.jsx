'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()

  useEffect(() => {
    // 🔒 localStorage browser-only hota hai
    if (typeof window === "undefined") return

    const userStr = localStorage.getItem("user")

    // ❗ null ya "undefined" dono handle
    if (!userStr || userStr === "undefined") {
      router.push("/login")
      return
    }

    let user = null
    try {
      user = JSON.parse(userStr)
    } catch (e) {
      console.error("Invalid user in storage", e)
      router.push("/login")
      return
    }

    if (!user?.id) {
      router.push("/login")
      return
    }

    const timer = setTimeout(() => {
      router.push("/my-orders")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">
        Order Placed Successfully
      </div>
    </div>
  )
}

export default OrderPlaced
