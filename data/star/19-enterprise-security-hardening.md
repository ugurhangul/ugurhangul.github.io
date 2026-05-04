# STAR — Security Hardening Across Enterprise Clients

> **Company:** Clockwork Agency / Freelance
> **Period:** 2020 – 2024
> **Role:** Lead Developer / Security Architect
> **Evidence:** Security implementations across Arçelik Global, Ziraat Bank, Yeşilay, and Fiat Online

---

## Situation

Enterprise clients in highly regulated sectors (Banking, Automotive, Global Manufacturing, NGOs) have strict security, privacy, and compliance requirements. Across projects like **Arçelik Global**, **Ziraat Bank**, **Yeşilay**, and **Fiat Online**, I encountered repeated needs for robust security measures encompassing GDPR/KVKK compliance, XSS mitigation, secure API authentication, sensitive data encryption, and bot protection. Security could not be an afterthought; it had to be structurally integrated into the application architectures.

## Task

Implement robust, reusable security patterns and compliance measures across diverse enterprise client applications, ensuring successful passage of rigorous corporate security audits and penetration tests.

## Action

### Web Security & Headers (Arçelik Global)
- Implemented **Content Security Policy (CSP)** headers with strict `frame-src` rules specifically tailored for Foreks financial widgets, mitigating Cross-Site Scripting (XSS) and clickjacking risks.
- Hardened server configurations by stripping identifying server version headers (`X-Powered-By`, `Server`).
- Enforced **`SameSite=Strict`** cookie policies across the application.
- Secured the environment pipeline by aggressively wrapping `UseDeveloperExceptionPage` within `#if DEBUG` directives, ensuring stack traces never leak to production.

### Data Encryption & Access Control (Ziraat Bank)
- Built custom **encryption/decryption pipelines** for sensitive environment configuration data (SMTP credentials, API keys) deployed across 15+ international subsidiary sites.
- Engineered a secure content-locking mechanism utilizing password protection paired with CAPTCHA validation for sensitive corporate documents.
- Implemented strict Maker-Checker user approval workflows within the CMS to prevent unauthorized content publication.
- Sanitized email recipient routing on public-facing forms to prevent SMTP injection and spam relaying.

### GDPR Compliance & API Security (Yeşilay)
- Engineered an **`IAnonymizationService`** to provide GDPR/KVKK-compliant data anonymization routines for user data.
- Hardened API perimeters by enforcing strict **Bearer-only authentication** across all protected API controllers, preventing unauthorized data access.

### Authorization & Validation Hardening (Fiat Online)
- Hardened **JWT claims** generation and validation to ensure secure state transfer during the 12-state vehicle reservation lifecycle.
- Implemented complex business logic validation (`IsBuyerLegitForMakeReservation`) at the API gateway layer to prevent malicious reservation manipulation.
- Implemented strict sensitive data logging controls to ensure PII and credit card data never entered application logs.

### Bot Mitigation (Agency Portfolio)
- Standardized and rolled out **reCAPTCHA server-side validation** across multiple high-traffic client portals (İnci Akü, Akra Hotels, Hyundai) to successfully mitigate automated scraping and credential stuffing attacks.

## Result

- Successfully passed rigorous corporate security audits and external penetration tests for major enterprise clients.
- Reusable security patterns (CSP, Encryption, Anonymization, Server-side CAPTCHA) were established and propagated across the broader agency portfolio.
- Ensured regulatory compliance (GDPR, KVKK) without sacrificing application functionality or user experience.

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about security" | CSP headers, SameSite cookies, JWT claims hardening, API Bearer auth |
| "Compliance experience?" | IAnonymizationService for GDPR/KVKK, strict logging controls for PII |
| "How do you handle sensitive data?" | Config encryption/decryption, #if DEBUG wrappers, email sanitization |
| "Have you passed penetration tests?" | Implemented specific fixes (Server headers, CSP, CAPTCHA) for enterprise audits like Ziraat Bank and Arçelik |

---

## Key Technologies

`Security Architecture` · `CSP` · `JWT` · `Cryptography` · `GDPR / KVKK` · `ASP.NET Core Security` · `Bearer Auth` · `reCAPTCHA`
