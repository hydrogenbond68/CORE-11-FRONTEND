import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HashtagPage = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsByHashtag();
  }, [tag]);

  const fetchPostsByHashtag = async () => {
    try {
      const response = await fetch(`http://localhost:5000/hashtag/${tag}`); // Update with actual API endpoint
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts by hashtag:', error);
    }
  };

  return (
    <Container>
      <h1>Posts with #{tag}</h1>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={post.imageUrl} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HashtagPage;
