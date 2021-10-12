SELECT properties.*, avg(property_reviews.rating) AS
average_ratings
FROM properties
JOIN property_reviews
ON properties.id = property_id
WHERE city LIKE '%ancou%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >=4
ORDER BY cost_per_night
LIMIT 10;