import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';

const BlogPostDetails = ({ posts }) => {
  const { id } = useParams();
  const post = posts[parseInt(id, 10)];

  if (!post) return <div>Post not found</div>;

  return (
    <Container>
      <Typography variant='h2' sx={{marginLeft:'50%'}}>{post.source.id}</Typography>
      <Card>
        <CardContent>
          <Typography variant="h4"sx={{fontWeight:'bold'}}>{post.title}</Typography>
          {post.urlToImage && <img src={post.urlToImage} alt={post.title} style={{ maxWidth: '100%' }} />}
          <Typography variant='h3'>{post.source.name}</Typography>
          <Typography variant='h5' sx={{color:'DarkBlue',fontWeight:'bold'}}>{post.author}</Typography>
          <Typography variant="body1" paragraph>{post.content}</Typography>
          <Typography variant="body1" paragraph>{post.description}</Typography>
        
          

          <Button component={Link} to="/" variant="contained" color="primary">Back</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogPostDetails;
