SELECT properties.city, count(reservations.id) as total_reservations
FROM reservations
JOIN properties
ON properties.id = property_id
GROUP BY city 
ORDER BY total_reservations DESC;

--  \i 1_queries/most_vistedCities.sql