"use client"

import { useState, useEffect } from "react"
import {
  ChevronsUpDown,
  User,
  Settings,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ProfileCard } from "./profile-card"
import { Text } from "@chakra-ui/react"
import Link from "next/link"

export function NavUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: ""
  })
  const [profileValues, setProfileValues] = useState({
    fname: "",
    lname: "",
    email: "",
    age: "",
    phone: ""
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [rating, setRating] = useState<number>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          localStorage.removeItem('token')
          window.location.href = '/login'
          return
        }

        // Fetch profile data
        const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const profileData = await profileResponse.json()
        
        if (!profileResponse.ok) {
          localStorage.removeItem('token')
          window.location.href = '/login'
          throw new Error(profileData.error)
        }

        // Fetch user details with reviews
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const userData = await userResponse.json()
        if (!userResponse.ok) throw new Error(userData.error)

        // Calculate average rating
        const reviews = userData.user.sellerReviews || []
        const avgRating = reviews.length 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
          : undefined

        setRating(avgRating)
        setUserData({
          name: `${profileData.user.firstName} ${profileData.user.lastName}`,
          email: profileData.user.email,
          avatar: profileData.user.avatar || ""
        })

        setProfileValues({
          fname: profileData.user.firstName,
          lname: profileData.user.lastName,
          email: profileData.user.email,
          age: profileData.user.age.toString(),
          phone: profileData.user.contactNumber
        })
      } catch (err) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const { isMobile } = useSidebar()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData.name}</span>
                <span className="truncate text-xs">{userData.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className=" min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 mb-1 font-normal">
              <ProfileCard 
                watchedValues={profileValues} 
                rating={rating}
              />
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href="/settings">
                <DropdownMenuItem>
                  <Settings />
                  Edit Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-400 focus:bg-red-400" 
              onSelect={handleLogout}
            >
              <LogOut />
              <Text>Log out</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
