<p align="center">
  <h1>Safeguarding Child Influencers on Instagram 🚸</h1>
</p>

<p align="center">
  <b>Browser Extension Project</b>  
  <br>
  Members: <b>Aaditree Jaisswal</b>, <b>Rachna Ajit Soundatti</b>
</p>

---

## 📚 Problem Statement

This project is motivated by growing concerns highlighted in recent articles regarding the **online safety of child influencers**.  
Many of these young users, especially those with **monetized** or **business accounts**, are exposed to toxic, harmful, and inappropriate comments.

While Instagram offers moderation tools, they are often **reactive** rather than **proactive**, leaving these children vulnerable.

---

## 💡 Our Theory of Change

We believe that by **designing an additional safety layer** that intelligently moderates harmful content and proactively discourages abusive engagement, we can shift the platform experience for child influencers:

- From **reactive moderation** ➔ **to preventive protection**.

If users and parents demonstrate demand for such a tool, **Instagram and similar platforms** would be compelled to **adopt and integrate it system-wide**.

---

## 🛠️ Our Proposed Solution

We aim to build a **middleware layer** (browser extension) that integrates with Instagram's web interface to:

### ✅ Features:

- **Detect and mask abusive language**, including **obfuscated curse words** (e.g., `f#ck`, `f*ck`, `fcuk`) using **natural language processing** and **fuzzy matching** techniques.
- **Implement a dynamic trust score system** for accounts that comment or follow monetized child influencer accounts:
  - The score **begins at 5**.
  - **Deductions** are made when:
    - Comments are flagged by a **Language Model (LLM)**.
    - Comments are reported by other users.
  - **At a trust score of 0**:
    - The account is **automatically restricted** or **blocked** from engaging with child accounts.

- The tool will:
  - **Maintain logs**.
  - **Allow admin override**.
  - **Display warning banners** to educate offending users.

---

## 🎯 End Goal

Our vision is to create a **protective digital layer** ensuring that **monetized child influencer accounts** can operate in a **safer, more respectful online environment**.

By prototyping this middleware and showcasing **public demand**,  
we hope to influence Instagram to **natively integrate these protections**, especially for accounts involving minors.

---

<p align="center">
  <b>Let's make the Internet a safer place for young creators! 🚸🌟</b>
</p>
