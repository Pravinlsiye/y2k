/**
 * Central mail template registry.
 * Every CTA that triggers an email uses one of these.
 */

export interface MailTemplate {
  to: string;
  subject: string;
  body: string;
}

function mailto(t: MailTemplate): string {
  return `mailto:${t.to}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
}

// ── Templates ────────────────────────────────────────────

export const MAIL = {
  requestDemo: mailto({
    to: "sales@y2ksaas.com",
    subject: "Demo Request — Y2kSaaS",
    body: `Hi Y2kSaaS team,

I'd like to schedule a product demo.

Name: 
Company: 
Role: 
Team size: 
What I'd like to see: 

Best time to connect: 

Looking forward to hearing from you.
`,
  }),

  talkExpert: mailto({
    to: "sales@y2ksaas.com",
    subject: "Talk with an Expert — Y2kSaaS",
    body: `Hi Y2kSaaS,

I'd like to speak with one of your engineers.

Name: 
Company: 
Topic / area of interest: 
Brief description of what I'm working on:


Best time / timezone: 

Thanks.
`,
  }),

  sendIntro: mailto({
    to: "careers@y2ksaas.com",
    subject: "Introduction — Open Application",
    body: `Hi Y2kSaaS team,

I'd love to introduce myself and explore opportunities to contribute.

Name: 
Background / current role: 
What I'd like to build at Y2kSaaS:

Portfolio / GitHub / LinkedIn:

Open to: Full-time / Contract / Part-time

Looking forward to connecting.
`,
  }),

  applyRole: (title: string) =>
    mailto({
      to: "careers@y2ksaas.com",
      subject: `Application: ${title}`,
      body: `Hi Y2kSaaS team,

I'm applying for the ${title} role.

Name: 
Current role / company: 
Years of experience: 
Relevant skills:


Portfolio / GitHub / LinkedIn:

Why Y2kSaaS:


Cover letter / additional notes:


Looking forward to hearing from you.
`,
    }),

  sales: mailto({
    to: "sales@y2ksaas.com",
    subject: "Sales Inquiry — Y2kSaaS",
    body: `Hi Y2kSaaS,

I'm interested in your products / services.

Company: 
Use case: 
Team size: 
Timeline: 

Please get in touch.
`,
  }),

  internship: mailto({
    to: "careers@y2ksaas.com",
    subject: "Internship Application — Y2kSaaS",
    body: `Hi Y2kSaaS Careers team,

I am interested in an internship opportunity.

Name: 
University / School: 
Programme / Year: 
Area of interest: (Hardware · Cloud · AI · Developer Tools)
Availability: 
LinkedIn / GitHub / Portfolio:

I have attached my resume to this email.

Looking forward to hearing from you.
`,
  }),

  support: mailto({
    to: "support@y2ksaas.com",
    subject: "Support Request — Y2kSaaS",
    body: `Hi Y2kSaaS Support,

I need help with:

Product / area: 
Issue description:


Steps to reproduce (if applicable):


Expected vs actual behaviour:


Please let me know the next steps.
`,
  }),
} as const;
