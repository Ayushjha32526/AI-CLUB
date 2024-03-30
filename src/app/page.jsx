import BlogCard from '@/components/blogCard/BlogCard'
import { blogs } from '@/lib/data'
import Image from 'next/image'
import classes from './page.module.css'
import Gallery from './Gallery'

export async function fetchBlogs(){
  const res = await fetch('/api/blog', { cache: 'no-store' });

  return res.json();
}

export default function Home({ blogs }) {
  return (
    <div className={classes.container}>
      <h2>AIML CLUB</h2>
      <div className={classes.wrapper}>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <h3 className={classes.noBlogs}>Click on create options on profile</h3>
        )}
        <Gallery />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const blogs = await fetchBlogs();
  return {
    props: { blogs },
  };
}
