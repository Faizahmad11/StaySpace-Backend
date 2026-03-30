import React, { useState } from 'react';
import heroImage from '../assets/bgc1.jpg';
import blog1 from '../assets/imgi_10_1577948594881.jpg';
import blog2 from '../assets/imgi_12_homebanner1.jpg';
import blog3 from '../assets/imgi_24_1583228392669.jpg';

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for Booking Your Dream Stay",
    snippet: "Discover how to find the perfect stay effortlessly with Stayspace. Tips, tricks, and insider advice to book stress-free...",
    content: `Booking the perfect stay doesn’t have to be stressful. With Stayspace, you can easily browse, compare, and select the best accommodations. Start by setting your budget, reading reviews, and checking cancellation policies. Always book early for the best rates and hidden gems. Keep these tips in mind to ensure a smooth and enjoyable stay experience.`,
    image: blog1,
    date: "Feb 28, 2026",
  },
  {
    id: 2,
    title: "How to Get the Best Deals on Stayspace",
    snippet: "Learn how to snag amazing deals and discounts on your next booking. Save money without compromising quality...",
    content: `Stayspace offers various tips to help you get the best deals. Monitor flash sales, subscribe to newsletters, and use flexible dates to find lower prices. Always compare options and check for promo codes. With these strategies, you can save significantly while booking high-quality stays. Remember, the right timing can make a huge difference.`,
    image: blog2,
    date: "Feb 20, 2026",
  },
  {
    id: 3,
    title: "Top 5 Locations to Explore in 2026",
    snippet: "Explore trending destinations for your next trip. Find hidden gems and popular spots curated for you by Stayspace...",
    content: `The year 2026 brings exciting destinations to explore. From scenic mountains to bustling city centers, these locations offer unique experiences. Research local culture, food, and attractions to enhance your travel. Stayspace provides curated stays near top landmarks, so you can immerse yourself in each location effortlessly. Start planning your adventure now!`,
    image: blog3,
    date: "Feb 10, 2026",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0); // Scroll to top for full post
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo(0, 0);
  };

  // If a blog post is selected, show full post
  if (selectedPost) {
    return (
      <div className="blog-post-wrapper">
        <img src={selectedPost.image} alt={selectedPost.title} className="blog-post-img" />
        <h1>{selectedPost.title}</h1>
        <p className="blog-date">{selectedPost.date}</p>
        <p className="blog-content">{selectedPost.content}</p>
        <button className="back-btn" onClick={handleBack}>← Back to Blog</button>
      </div>
    );
  }

  // Otherwise, show blog list
  return (
    <div className="blog-wrapper">
      {/* HERO SECTION */}
      <div className="blog-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
          <h1>Stayspace Blog</h1>
          <p>Tips, guides, and stories for your next perfect stay</p>
        </div>
      </div>

      {/* BLOG CARDS */}
      <div className="blog-container">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} />
            <div className="blog-card-content">
              <p className="blog-date">{post.date}</p>
              <h2>{post.title}</h2>
              <p>{post.snippet}</p>
              <button className="read-more" onClick={() => handleReadMore(post)}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;