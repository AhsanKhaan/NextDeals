-- Seed initial data for the affiliate site

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Latest gadgets, smartphones, laptops, and tech accessories'),
('Home & Garden', 'home-garden', 'Everything for your home, from furniture to gardening tools'),
('Fashion', 'fashion', 'Trending clothing, shoes, and accessories for all styles'),
('Health & Beauty', 'health-beauty', 'Skincare, wellness products, and beauty essentials'),
('Sports & Outdoors', 'sports-outdoors', 'Fitness equipment, outdoor gear, and sporting goods'),
('Books & Media', 'books-media', 'Books, movies, music, and educational content');

-- Insert sample products
INSERT INTO products (
    title, slug, description, short_description, category_id, brand, 
    original_price, current_price, discount_percentage, rating, review_count,
    image_urls, affiliate_url, merchant, is_featured, is_trending
) VALUES
(
    'Apple MacBook Air M2 13-inch', 
    'apple-macbook-air-m2-13', 
    'The new MacBook Air with M2 chip delivers incredible performance and battery life in an ultra-thin design.',
    'Powerful M2 chip, 13-inch display, all-day battery life',
    1, 'Apple', 1199.00, 999.00, 17, 4.8, 2847,
    ARRAY['/images/macbook-air-m2-1.jpg', '/images/macbook-air-m2-2.jpg'],
    'https://amazon.com/dp/example1', 'Amazon', true, true
),
(
    'Sony WH-1000XM5 Wireless Headphones', 
    'sony-wh-1000xm5-headphones', 
    'Industry-leading noise canceling with premium sound quality and comfort.',
    'Premium noise canceling, 30-hour battery, crystal clear calls',
    1, 'Sony', 399.00, 299.00, 25, 4.9, 1523,
    ARRAY['/images/sony-headphones-1.jpg', '/images/sony-headphones-2.jpg'],
    'https://amazon.com/dp/example2', 'Amazon', true, false
),
(
    'Dyson V15 Detect Cordless Vacuum', 
    'dyson-v15-detect-vacuum', 
    'Advanced laser technology reveals microscopic dust for a deep clean.',
    'Laser dust detection, powerful suction, 60-minute runtime',
    2, 'Dyson', 749.00, 599.00, 20, 4.7, 892,
    ARRAY['/images/dyson-v15-1.jpg', '/images/dyson-v15-2.jpg'],
    'https://amazon.com/dp/example3', 'Amazon', true, false
),
(
    'iPhone 15 Pro Max', 
    'iphone-15-pro-max', 
    'The ultimate iPhone with titanium design and advanced camera system.',
    'Titanium build, A17 Pro chip, advanced camera system',
    1, 'Apple', 1199.00, 1199.00, 0, 4.9, 5234,
    ARRAY['/images/iphone-15-pro-1.jpg', '/images/iphone-15-pro-2.jpg'],
    'https://amazon.com/dp/example4', 'Amazon', false, true
),
(
    'Nike Air Max 270 Sneakers', 
    'nike-air-max-270-sneakers', 
    'Comfortable lifestyle sneakers with Max Air cushioning.',
    'Max Air cushioning, breathable mesh, iconic design',
    3, 'Nike', 150.00, 120.00, 20, 4.6, 3421,
    ARRAY['/images/nike-air-max-1.jpg', '/images/nike-air-max-2.jpg'],
    'https://amazon.com/dp/example5', 'Amazon', false, true
);

-- Insert product features
INSERT INTO product_features (product_id, feature_name, feature_value) VALUES
(1, 'Processor', 'Apple M2 chip with 8-core CPU'),
(1, 'Memory', '8GB unified memory'),
(1, 'Storage', '256GB SSD'),
(1, 'Display', '13.6-inch Liquid Retina display'),
(1, 'Battery Life', 'Up to 18 hours'),
(2, 'Noise Canceling', 'Industry-leading noise canceling'),
(2, 'Battery Life', 'Up to 30 hours'),
(2, 'Connectivity', 'Bluetooth 5.2, NFC'),
(2, 'Weight', '250g'),
(3, 'Suction Power', '230 Air Watts'),
(3, 'Runtime', 'Up to 60 minutes'),
(3, 'Bin Capacity', '0.77 liters'),
(3, 'Weight', '3.0 kg');

-- Insert initial price history
INSERT INTO price_history (product_id, price, recorded_at) VALUES
(1, 1199.00, CURRENT_TIMESTAMP - INTERVAL '30 days'),
(1, 1099.00, CURRENT_TIMESTAMP - INTERVAL '15 days'),
(1, 999.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(2, 399.00, CURRENT_TIMESTAMP - INTERVAL '20 days'),
(2, 349.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(2, 299.00, CURRENT_TIMESTAMP - INTERVAL '3 days');
