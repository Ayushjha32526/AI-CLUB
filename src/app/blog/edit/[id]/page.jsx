"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import classes from './edit.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router' // Changed from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = ({ params }) => { // Changed from (ctx)
    const CLOUD_NAME = 'doojo83ea'
    const UPLOAD_PRESET = 'my_blog_project_webdevmania'
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState(null) // Changed from ""
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(`/api/blog/${params.id}`)
                if (!res.ok) {
                    throw new Error('Failed to fetch blog details')
                }
                const blog = await res.json()
                setTitle(blog.title)
                setDesc(blog.desc)
                setCategory(blog.category)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlog()
    }, [params.id]) // Added params.id to the dependencies

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>Access Denied</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title === '' || category === '' || desc === '') {
            toast.error("All fields are required")
            return
        }

        try {
            let imageUrl = null
            if (photo) {
                imageUrl = await uploadImage()
            }

            const body = { title, desc, category }

            if (imageUrl != null) {
                body.imageUrl = imageUrl
            }

            const res = await fetch(`/api/blog/${params.id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                throw new Error("Error has occurred")
            }

            router.push(`/blog/${params.id}`) // Changed from `/blog/${blog?._id}`
        } catch (error) {
            console.error(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()
        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            if (!res.ok) {
                throw new Error("Failed to upload image")
            }

            const data = await res.json()
            return data['secure_url']
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <input value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                    <button className={classes.createBlog}>Edit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit
