# STAR — Security Hardening Across Enterprise Clients

> **Company:** Clockwork Agency
> **Period:** Oct 2019 – Sep 2024
> **Role:** Senior Software Developer / Team Lead
> **Evidence:** Security implementations across Arçelik Global, Ziraat Bank, and Fiat Online

---

## Situation

Across projects like **Arçelik Global**, **Ziraat Bank**, and **Fiat Online**, I encountered repeated needs for security measures encompassing data anonymization, XSS mitigation, secure API authentication, sensitive data encryption, and bot protection.

## Task

Implement reusable security patterns across enterprise client applications and support penetration testing remediation. Applications operated within ISO 27001-scoped environments.

## Action

### Web Security & Headers (Arçelik Global)
- Implemented **Content Security Policy (CSP)** headers with strict `frame-src` rules specifically tailored for third-party financial widgets.
- Hardened server configurations by stripping identifying server version headers (`X-Powered-By`, `Server`).
- Enforced **`SameSite=Strict`** cookie policies across the application.
- Secured the environment pipeline by wrapping `UseDeveloperExceptionPage` within `#if DEBUG` directives to keep stack traces out of production.

### Data Encryption & Access Control (Ziraat Bank)
- Built custom **encryption/decryption pipelines** for sensitive environment configuration data (SMTP credentials, API keys).
- Engineered a secure content-locking mechanism utilizing password protection paired with CAPTCHA validation for sensitive corporate documents.
- Implemented strict Maker-Checker user approval workflows within the CMS.
- Sanitized email recipient handling on public-facing forms.

### Anonymization & API Security
- Engineered an **`IAnonymizationService`** to provide data anonymization routines for user data.
- Enforced **Bearer authentication** on protected API controllers.

### Authorization & Validation Hardening (Fiat Online)
- Hardened **JWT claims** generation and validation for secure state transfer during the 12-state vehicle reservation lifecycle.
- Implemented complex business logic validation (`IsBuyerLegitForMakeReservation`) at the API layer.
- Implemented sensitive data logging controls.

### Bot Mitigation (Agency Portfolio)
- Developed **reCAPTCHA server-side validation** for client portals including Hyundai.

## Result

- Led security remediation across banking and government projects, remediating **30+ critical vulnerabilities**, and supported penetration testing remediation.
- Developed reusable security components (CSP, encryption, anonymization, server-side CAPTCHA).

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about security" | CSP headers, SameSite cookies, JWT claims hardening, API Bearer auth |
| "Compliance experience?" | ISO 27001-scoped environments, IAnonymizationService, strict logging controls for PII |
| "How do you handle sensitive data?" | Config encryption/decryption, #if DEBUG wrappers, email sanitization |
| "Have you handled penetration test findings?" | Supported penetration testing remediation; security hardening included server headers, CSP and server-side CAPTCHA |

---

## Key Technologies

`Security Architecture` · `CSP` · `JWT` · `Cryptography` · `Anonymization` · `ASP.NET Core Security` · `Bearer Auth` · `reCAPTCHA`
