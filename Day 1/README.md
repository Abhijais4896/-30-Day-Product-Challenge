# Paytm UPI — Payment Resolution Tracker -- https://dapper-puffpuff-4e9c26.netlify.app/
### High-Fidelity Product Design Case Study & Clickable Prototype

---

## 1. Executive Summary & Problem Framing

In Indian digital payments, UPI powers over 14 billion transactions monthly. However, when an e-commerce order cancellation or partial return occurs (e.g., on Jiomart, Swiggy, or Amazon), users experience severe anxiety around refunds:

> **The Core Problem:**  
> *"When a UPI transaction goes wrong, users don't always have enough clarity about what happened to their money, what is currently happening, who is responsible for the next step, and when they can expect resolution."*

Historically, apps either show an opaque generic state (*"Refund initiated"*) or bounce users back and forth between the merchant's customer service and the issuing bank.

The **Payment Resolution Tracker** is designed to replace ambiguity with deterministic certainty, without overpromising or making false technical claims about inter-bank settlement switches.

---

## 2. Core UX Heuristic Framework

To build trust and eliminate support friction, every interaction in this prototype is architected to immediately answer three fundamental user questions:

| # | Core User Question | Where It Is Answered | Mechanism & Design Choice |
|---|--------------------|----------------------|---------------------------|
| **1** | **What happened?** | **Screen 1 & Screen 2** | Explicit merchant confirmation pill, amount clarity (₹2,800), and an exact step-by-step chronological audit trail (25 Sep to 28 Sep). |
| **2** | **Where is my money?** | **Screen 3** | Visual multi-entity transit diagram (*Jiomart &rarr; Payment Network &rarr; Your Bank*), explicitly clarifying that merchant action is complete. |
| **3** | **What do I need to do?** | **Screen 4 & Screen 5** | Honest delayed status handling with one-tap escalation that pre-populates all transaction telemetry (Ticket `PTM-28491`). |

---

## 3. Screen-by-Screen Breakdown & Prototype Flow

```
Screen 1 (Payment Status)
   └── [Track refund] ───────────────────────► Screen 2 (What happened? Timeline)
                                                 └── [Where is my money?] ───────► Screen 3 (Where is my money? Flow)
                                                                                     ├── [Got it] ──────────────────────────► (Back to Screen 2)
                                                                                     └── [Something doesn't look right] ────► Screen 4 (Delayed Diagnostic)
                                                                                                                                └── [Get help] ───────────────► Screen 5 (Report Issue)
                                                                                                                                                                  └── [Escalate this issue] ──► Confirmation State (Ticket PTM-28491)
```

### Screen 1: Payment Status
* **Key Content:**
  * Payment of ₹2,800
  * Status: "Refund in progress" with soft warning badge & pulsing dot
  * Supporting copy: *"The merchant has confirmed your refund. We're waiting for the money to reach your bank account."*
  * Expected by: **28 September**
  * Merchant: **Jiomart** | Original Payment: **₹2,800** | Refund Amount: **₹2,800** | Date: **25 September**
* **Primary CTA:** `Track refund` &rarr; opens Screen 2.

### Screen 2: What Happened? (Audit Timeline)
* **Key Content:**
  * 25 Sep: **Payment completed** (₹2,800 paid to merchant)
  * 26 Sep: **Order partially cancelled** (Merchant cancelled part of the order)
  * 26 Sep: **Refund initiated** (Merchant initiated ₹2,800 refund)
  * 27 Sep: **Refund processing** (Refund is being processed)
  * 28 Sep: **Expected in bank account**
  * Short reassurance: *"We'll update you when the refund moves to the next stage."*
* **Primary CTA:** `Where is my money?` &rarr; opens Screen 3.

### Screen 3: Where Is My Money? (Network Transit)
* **Key Content:**
  * Animated node-to-node transit flow between **Jiomart**, **Payment Network (NPCI)**, and **Your Bank (HDFC)**.
  * Main message: *"Your ₹2,800 refund is currently being processed between the payment system and your bank."*
  * Secondary message: *"You don't need to contact the merchant again right now."* (Prevents ticket spam to merchants).
  * Next expected update: **28 September**.
  * 3-step breakdown:
    1. Refund is processed
    2. Bank receives the refund
    3. Money is credited to your account
* **Interactions:**
  * Primary CTA: `Got it` &rarr; returns to Screen 2.
  * Subtle Secondary CTA: `Something doesn't look right` &rarr; opens Screen 4.

### Screen 4: Something Went Wrong (Delayed Handling)
* **Key Content:**
  * Title: *"Your refund hasn't arrived yet"*
  * Message: *"We expected your refund to arrive by 28 September, but it hasn't been confirmed yet."*
  * Diagnostic details:
    * Refund amount: **₹2,800**
    * Transaction: **XXXX1234**
    * Started: **26 September**
    * Expected resolution: **28 September**
    * Current status: **Delayed**
  * **Honesty Commitment:** No false promises that Paytm knows internal bank switch state.
  * Copy: *"We'll help you raise this issue with the transaction details already attached."*
* **Primary CTA:** `Get help` &rarr; opens Screen 5.

### Screen 5: Escalate Issue & Confirmation
* **State A — Pre-populated Issue Form:**
  * Title: *"Report refund issue"*
  * Automatically bound details: Issue (*Refund not received*), Amount (*₹2,800*), Transaction (*XXXX1234*), Started (*26 September*), Expected (*28 September*), Status (*Delayed*).
  * Copy: *"We'll send these transaction details with your request so you don't have to explain everything again."*
  * Primary CTA: `Escalate this issue`.
* **State B — Instant Resolution Confirmation:**
  * *"Your issue has been raised"*
  * **Ticket ID: PTM-28491** (with 1-click copy).
  * *"We'll update you when we receive more information."*
  * Secondary CTAs: `Track issue` and `Back to Payment Status`.

---
Youtube link - https://youtu.be/bkOOqrwnN4U
