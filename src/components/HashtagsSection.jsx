import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style.css'; // Import custom styles

const HashtagsSection = () => {
  const [hashtags, setHashtags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hashtags from the backend or use dummy data
    fetchHashtags();
  }, []);

  const fetchHashtags = async () => {
    try {
      const response = await fetch('http://localhost:5000/hashtags'); // Update with actual API endpoint
      const data = await response.json();
      setHashtags(data);
    } catch (error) {
      console.error('Failed to fetch hashtags:', error);
    }
  };

  const handleHashtagClick = (tag) => {
    navigate(`/hashtag/${tag}`);
  };

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, hashtags.length - 1));
  };

  return (
    <Container className="hashtags-section">
      <Row className="align-items-center">
        <Col xs="auto">
          <Button variant="outline-primary" onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </Button>
        </Col>
        <Col>
          <Row>
            {hashtags.slice(currentIndex, currentIndex + 10).map((hashtag) => (
              <Col key={hashtag.id} md={2} className="mb-3">
                <Card onClick={() => handleHashtagClick(hashtag.tag)} className="hashtag-card">
                  <Card.Img variant="top" src={hashtag.imageUrl} />
                  <Card.Body>
                    <Card.Title>{hashtag.tag}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={handleNext} disabled={currentIndex + 10 >= hashtags.length}>
            &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HashtagsSection;
