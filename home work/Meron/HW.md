# HTTP (HyperText Transfer Protocol) – Homework by Meron

## 📘 What is HTTP?

HTTP stands for HyperText Transfer Protocol.  
It is the foundation of data communication on the web. It defines how browsers (clients) and web servers communicate.

---

## 📚 HTTP Standards and Versions

### 1. HTTP/0.9
- First version (1991)
- Only supported GET requests and plain text
- No headers

### 2. HTTP/1.0
- Introduced request/response headers
- Added support for status codes
- Each request required a new connection

### 3. HTTP/1.1 (Most widely used)
- Introduced persistent connections (keep-alive)
- Added chunked transfers, cache control
- Still very common today

### 4. HTTP/2
- Binary protocol (faster and more efficient)
- Multiplexing (multiple requests at once)
- Header compression

### 5. HTTP/3
- Based on QUIC (uses UDP instead of TCP)
- Faster connection setup, better security
- Still being adopted

---

## 🔧 HTTP Methods (Verbs)

| Method  | Description                   |
|---------|-------------------------------|
| GET     | Retrieve data from the server |
| POST    | Send data to the server       |
| PUT     | Update existing data          |
| DELETE  | Remove data from the server   |
| PATCH   | Partially update data         |
| OPTIONS | Describe communication options|

---

## 🔁 HTTP Request & Response Structure

### Request:
- Method (GET, POST, etc.)
- URL (endpoint)
- Headers (info like user-agent, cookies)
- Body (only for POST, PUT, etc.)

### Response:
- Status Code (200, 404, 500, etc.)
- Headers
- Body (HTML, JSON, text, etc.)

---

## 🔐 HTTP vs HTTPS

| HTTP      | HTTPS                          |
|-----------|--------------------------------|
| Unsecured | Secured with SSL/TLS encryption |
| Uses port 80 | Uses port 443                 |
| Data is visible | Data is encrypted         |

---

## 📦 HTTP Status Codes

| Code | Meaning              |
|------|----------------------|
| 200  | OK                   |
| 201  | Created              |
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Not Found            |
| 500  | Internal Server Error|

---

## 📎 References
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [HTTP/2 vs HTTP/1.1](https://www.cloudflare.com/learning/performance/http2/)
- [What is HTTP?](https://www.w3schools.com/whatis/whatis_http.asp)
