# menifest

### 已经被移除，转移到 worker service中

AppCache is now removed from insecure contexts. AppCache is a powerful feature that allows offline and persistent access to an origin, which is a powerful privilege escalation for an XSS. This will remove that attack vector by only allowing it over HTTPS. 

This feature was deprecated in Chrome 67.

