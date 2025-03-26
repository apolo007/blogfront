import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostEditor from '../components/PostEditor';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  fetchComments,
  approveComment,
  deleteComment,
  fetchSubscribers,
  fetchGuestPosts,
  updateGuestPost,
} from '../utils/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px;
  background: ${(props) => (props.active ? props.theme.colors.primary : '#ccc')};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
`;

const Select = styled.select`
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
`;

const AdminPanel = () => {
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [editSlug, setEditSlug] = useState(null);
  const [comments, setComments] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [guestPosts, setGuestPosts] = useState([]);
  const [seoKeywords, setSeoKeywords] = useState('');
  const [linkSuggestions, setLinkSuggestions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/admin/login');
    loadData();
  }, [token, navigate]);

  const loadData = async () => {
    try {
      const [postData, commentData, subscriberData, guestData] = await Promise.all([
        fetchPosts(),
        fetchComments(token),
        fetchSubscribers(token),
        fetchGuestPosts(token),
      ]);
      setPosts(postData);
      setComments(commentData);
      setSubscribers(subscriberData);
      setGuestPosts(guestData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content, category, imageUrl: content.match(/src="([^"]+)"/)?.[1] };
      if (editSlug) {
        await updatePost(editSlug, postData, token);
        setEditSlug(null);
      } else {
        await createPost(postData, token);
      }
      setTitle('');
      setContent('');
      setCategory('');
      setSeoKeywords('');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setEditSlug(post.slug);
    setSeoKeywords('');
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure?')) {
      await deletePost(slug, token);
      loadData();
    }
  };

  const handleSeoCheck = () => {
    const keywords = seoKeywords.split(',').map((k) => k.trim().toLowerCase());
    const suggestions = posts
      .filter((p) => keywords.some((k) => p.title.toLowerCase().includes(k) || p.content.toLowerCase().includes(k)))
      .map((p) => ({ title: p.title, slug: p.slug }));
    setLinkSuggestions(suggestions);
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      <Tabs>
        <Tab active={tab === 'posts'} onClick={() => setTab('posts')}>Posts</Tab>
        <Tab active={tab === 'comments'} onClick={() => setTab('comments')}>Comments</Tab>
        <Tab active={tab === 'newsletter'} onClick={() => setTab('newsletter')}>Newsletter</Tab>
        <Tab active={tab === 'guest'} onClick={() => setTab('guest')}>Guest Posts</Tab>
        <Tab active={tab === 'analytics'} onClick={() => setTab('analytics')}>Analytics</Tab>
      </Tabs>

      {tab === 'posts' && (
        <div>
          <h2>{editSlug ? 'Edit Post' : 'Create Post'}</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Blogging">Blogging</option>
              <option value="SEO">SEO</option>
              <option value="Online Business">Online Business</option>
            </Select>
            <PostEditor content={content} setContent={setContent} token={token} />
            <Input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="SEO Keywords (comma-separated)"
            />
            <Button type="button" onClick={handleSeoCheck}>Check SEO</Button>
            {linkSuggestions.length > 0 && (
              <div>
                <h4>Internal Link Suggestions:</h4>
                <ul>
                  {linkSuggestions.map((sug) => (
                    <li key={sug.slug}>
                      <a href={`/post/${sug.slug}`} target="_blank" rel="noopener noreferrer">{sug.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button type="submit">{editSlug ? 'Update' : 'Create'}</Button>
          </Form>
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Views</Th>
                <Th>Likes</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <Td>{post.title}</Td>
                  <Td>{post.category}</Td>
                  <Td>{post.views}</Td>
                  <Td>{post.likes}</Td>
                  <Td>
                    <Button onClick={() => handleEdit(post)}>Edit</Button>
                    <Button onClick={() => handleDelete(post.slug)}>Delete</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {tab === 'comments' && (
        <Table>
          <thead>
            <tr>
              <Th>Post</Th>
              <Th>Name</Th>
              <Th>Comment</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <Td>{posts.find((p) => p._id === comment.postId.toString())?.title}</Td>
                <Td>{comment.name}</Td>
                <Td>{comment.comment}</Td>
                <Td>{comment.approved ? 'Approved' : 'Pending'}</Td>
                <Td>
                  {!comment.approved && <Button onClick={() => approveComment(comment._id, token).then(loadData)}>Approve</Button>}
                  <Button onClick={() => deleteComment(comment._id, token).then(loadData)}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {tab === 'newsletter' && (
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Subscribed At</Th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub._id}>
                <Td>{sub.email}</Td>
                <Td>{new Date(sub.subscribedAt).toLocaleDateString()}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {tab === 'guest' && (
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {guestPosts.map((gp) => (
              <tr key={gp._id}>
                <Td>{gp.title}</Td>
                <Td>{gp.name}</Td>
                <Td>{gp.status}</Td>
                <Td>
                  {gp.status === 'pending' && (
                    <>
                      <Button onClick={() => updateGuestPost(gp._id, 'approved', token).then(loadData)}>Approve</Button>
                      <Button onClick={() => updateGuestPost(gp._id, 'rejected', token).then(loadData)}>Reject</Button>
                    </>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {tab === 'analytics' && (
        <div>
          <h2>Analytics Dashboard</h2>
          <p>Total Posts: {posts.length}</p>
          <p>Total Views: {posts.reduce((sum, p) => sum + p.views, 0)}</p>
          <p>Total Likes: {posts.reduce((sum, p) => sum + p.likes, 0)}</p>
          <p>Total Comments: {comments.length}</p>
          <p>Total Subscribers: {subscribers.length}</p>
          <p>Total Guest Posts: {guestPosts.length}</p>
        </div>
      )}
    </Container>
  );
};

export default AdminPanel;