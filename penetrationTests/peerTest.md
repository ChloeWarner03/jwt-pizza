



My personal attacks:
Date: Today
Target: https://pizza-service.devops-cwarner.click/api/auth
OWASP: A07 - Identification and Authentication Failures
Severity: 2
Description: Brute force password attack against login endpoint. Tested 7 common passwords. The correct password admin was identified as a weak, guessable credential.
Correction: Implement account lockout after failed attempts, require stronger passwords.

![test1](test1.png)