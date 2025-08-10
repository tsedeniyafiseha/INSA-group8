Home work ---- The HTTP & HTTPS and Their protocols 

HTTP (Hypertext Transfer Protocol) is the standard protocol for transmitting data in paid text. It enables  browsers to request and receive information from websites.

HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP that encrypts data to protect it from tampering & eavesdropping. It ensures that the information remains secure during transformation.

 Commands ( Request Methods) :- are used to indicate the desired action. The common are:
 
	Get : used to retrieve data from server. 


	Post : used to send data to the server to create new resource.

	Put : used to update/replace an existing resource with new data. If resource doesn’t exist it may create one.

	Patch : used to apply partial modification to a resource.

	Delete : used to remove a specific resource from the server.

	Head : it is similar to Get , but it only retrieves the header information of the resource without the actual body.

	Options : used to describe the options of communication that are available.

	Connect : establishing the tunnel to the server identified by a given URL, often used to proxy connection.

	Trace : performs a message loop-back test along the path to the target resource , primarily used for debugging.

	HTTP Get : use get requests to retrieve a specific resource representation  / information only without modifying it in anyways.

	Server Port : is a numerical identifier that specifies a particular network service / application running on a server.

	HTTP Client Disable : refers to a configuration setting on server or network device that disables the HTTP client functionality.

	HTTP ACL (Access Control List) : it is a set of rules that defines which client are allowed / denied access to specific HTTP service on server.

	HTTP Put : is a HTTP method used to create / replace a resource on the server with the content provided in the request body.

	HTTP Server Max-Online-Users : is a configuration parameter that limits the maximum number of co-current users/clients that can be connected on HTTP server ant any give time.

?  What is the difference between HTTP1 , HTTP2 & HTTP3 ?

 HTTP/1: is the foundational version. Widely supported, relatively simple to implement. But Inefficient due to limitations like head-of-line blocking, the need for multiple connections for parallel downloads, and the overhead of text-based communication.
 
 HTTP/2: Introduces binary framing, multiplexing, header compression, and server push, leading to faster page load times and reduced bandwidth usage. But Still relies on TCP, so it can be affected by head-of-line blocking, particularly in lossy network conditions.
 
HTTP/3:Is the latest version. Uses the QUIC protocol (a UDP-based protocol), which eliminates head-of-line blocking and provides faster connection establishment, better performance on lossy networks, and enhanced security. But less supported.
 
