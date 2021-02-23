# Jamstack

The term "Jamstack" is being used to represent this new set of technology. At a high level, Jamstack apps are faster, more secure, and easier to scale.

The main difference is that Jamstack sites are separated between the "frontend" and "backend".

The frontend is concerned with how the website will look, and it does not concern itself with the actual data of the website. This "decoupling" allows the frontend to be hosted separately from the data. Since the frontend is simply static files (HTML, CSS, JavaScript) they are easy to host and scale using a CDN (Content Delivery Network) which replicates the files in multiple geographic locations. The frontend then gets the data via an API (Application Programming Interface).

The backend is concerned with the data for the website. Using a basic blog as an example, a request for the latest post would return the title, header image, content, date published and author. The frontend uses that data to display the webpage. There are many different ways to store the data and provide an API to access the data, however using a cloud based provider is typically used. Rather than maintaining a server, cloud based services take on the burden of security and making sure your data is always available.

The traditional server based approach uses dynamic files (PHP, ASP, etc). Using the blog example again, a request for the latest post will wait until it has all the data (title, header image, content, published date, author) then it will be converted to HTML to display in the browser. The problem with this approach is that the visitor is waiting to see something while this loading / conversion is taking place.

The other issue with a traditional server is scaling. The amount of visitors that you can have at one time depends on the hardware of the server. To accommodate a spike of traffic the server must have more memory and processor capabilities than it typically would need to serve traffic. Having a single server can be upgraded (vertically scale) to handle more traffic, but at a certain point it is better to use multiple servers (horizontally scale) with a load balancer to handle traffic.

Jamstack sites are scalable by default and can handle millions of requests.
