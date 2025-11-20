import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "DishiFree has helped our restaurant reduce food waste significantly. We're able to share surplus food with families in need instead of throwing it away. It's a win-win for everyone!",
      author: "Sarah Agnes",
      role: "Restaurant Owner",
      avatar: "https://images.pexels.com/photos/20335528/pexels-photo-20335528.jpeg",
      rating: 5
    },
    {
      id: 2,
      content: "As a single parent, DishiFree has been a blessing. I can find nutritious food for my children when times are tough. The donors are so generous and the process is incredibly easy.",
      author: "Mwangi Johnson",
      role: "Community Member",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      content: "Our hotel events often have leftover food. With DishiFree, we can instantly connect with local communities. The platform is user-friendly and the impact on food reduction is remarkable.",
      author: "Elena John",
      role: "Hotel Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>What Our Community Says</h2>
        <p className="testimonials-subtitle">
          Hear from donors and receivers who are making a difference in their communities
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                {testimonial.content}
              </div>
              
              <div className="testimonial-author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;