import React, { useState } from 'react';

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editPostId, setEditPostId] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCreatePost = () => {
    const newPost = { id: Date.now(), title, content, image };
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleEditPost = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImage(postToEdit.image);
      setEditPostId(id);
    }
  };

  const handleUpdatePost = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editPostId ? { ...post, title, content, image } : post
    );
    setPosts(updatedPosts);
    setTitle('');
    setContent('');
    setImage(null);
    setEditPostId(null);
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div style={{ ...styles.appContainer, backgroundImage: 'url("https://media.istockphoto.com/id/1140992203/photo/beach-summer-background.jpg?s=612x612&w=0&k=20&c=dEMuB5XQVjwcmdeOLIa42WIjat_dXwMpohc93VSadFc=")' }}>
      <h1>Blog App</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />
        {editPostId ? (
          <button onClick={handleUpdatePost} style={styles.button}>
            Update Post
          </button>
        ) : (
          <button onClick={handleCreatePost} style={styles.button}>
            Create Post
          </button>
        )}
      </div>
      <div style={styles.postsContainer}>
        <h2>Posts</h2>
        <ul style={styles.ul}>
          {posts.map((post) => (
            <li key={post.id} style={styles.li}>
              <div style={styles.labelCircle}>{post.title.charAt(0)}</div>
              <div style={styles.postContent}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.image && (
                  <img
                    src={URL.createObjectURL(post.image)}
                    alt="Post"
                    style={styles.image}
                  />
                )}
              </div>
              <button
                onClick={() => handleEditPost(post.id)}
                style={styles.button}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={styles.button}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '50px',
    margin: '0 auto',
    maxWidth: '1000px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  formContainer: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  postsContainer: {},
  ul: {
    listStyle: 'none',
    padding: '0',
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    margin: '10px 0',
  },
  labelCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '50%',
    marginRight: '10px',
  },
  postContent: {
    flex: 1,
  },
  image: {
    maxWidth: '50%',
    height: 'auto',
  },
};

export default BlogApp;
