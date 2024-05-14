import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../components/Post/index";

export function TagsPosts() {
    const { tag } = useParams();
    const userData = useSelector(state => state.auth.data);
    const { posts } = useSelector(state => state.posts);

    // Фильтруем посты по тегу
    const filteredPosts = posts.items.filter(post => post.tags.includes(tag));

    return (
        <div>
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                        user={post.user}
                        createdAt={post.createdAt}
                        viewsCount={post.viewsCount}
                        commentsCount={3} // Assuming a default value for commentsCount
                        tags={post.tags}
                        isEditable={userData?._id === post.user._id}
                    />
                ))
            ) : (
                <p>Нет постов с тегом "{tag}".</p>
            )}
        </div>
    );
}