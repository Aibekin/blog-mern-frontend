import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.data);
	const { posts, tags } = useSelector(state => state.posts);
	const [sortContent, setSortContent] = useState(false)

	const isPostsLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, []);

	const handleSortByViews = () => {
		setSortContent(true);
	}

	const handleSortByDate = () => {
		setSortContent(false);
	}

	console.log(posts);

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={sortContent ? 1 : 0} aria-label="basic tabs example">
				<Tab label="Новые" onClick={handleSortByDate} />
				<Tab label="Популярные" onClick={handleSortByViews} />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading
						? [...Array(5)]
						: posts.items.slice().sort((a, b) => sortContent
							? Number(b.viewsCount) - Number(a.viewsCount)
							: new Date(b.createdAt) - new Date(a.createdAt))).map((obj, index) =>
								isPostsLoading ? (
									<Post key={index} isLoading={true} />
								) : (
									<Post
										id={obj._id}
										title={obj.title}
										imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
										user={obj.user}
										createdAt={obj.createdAt}
										viewsCount={obj.viewsCount}
										commentsCount={3}
										tags={obj.tags}
										isEditable={userData?._id === obj.user._id}
									/>
								))}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
							},
							{
								user: {
									fullName: 'Иван Иванов',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
