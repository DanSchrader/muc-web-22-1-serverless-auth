import Main from '../components/Main'
import { useEffect, useState } from 'react'

const initialProfile = {
  _id: '',
  name: '',
}

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState(initialProfile)

  useEffect(() => {
    if (!token) {
      return
    }
    fetch('/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(setProfile)
  }, [token])

  return (
    <Main>
      <h1>Profile</h1>
      <p>Hello {profile.name} 👋</p>
    </Main>
  )
}

export default ProfilePage
