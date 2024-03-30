import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function PUT(req, ctx) {
    await db.connect();

    const id = ctx.params.id;
    const accessToken = req.headers.get('authorization');
    const token = accessToken.split(" ")[1];

    const decodedToken = verifyJwtToken(token);

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 });
    }

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
        }

        // Check if the user has already liked the blog
        const isLiked = blog.likes.includes(decodedToken._id);

        if (isLiked) {
            // If already liked, remove the like
            blog.likes = blog.likes.filter(userId => userId !== decodedToken._id);
        } else {
            // If not liked, add the like
            blog.likes.push(decodedToken._id);
        }

        await blog.save();

        return new Response(JSON.stringify({ msg: 'Successfully toggled like status' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
