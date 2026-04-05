/*
  Serverless endpoint to forward contact form messages via SendGrid
  - Deploy to Vercel/Netlify (or other serverless host that supports Node 18+)
  - Set environment variables: SENDGRID_API_KEY, TO_EMAIL
*/

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const TO_EMAIL = process.env.TO_EMAIL || 'y.v.s.vishnoi@gmail.com'

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!SENDGRID_API_KEY) {
    console.error('Missing SENDGRID_API_KEY')
    return res.status(500).json({ message: 'Mail service not configured' })
  }

  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const payload = {
      personalizations: [
        {
          to: [{ email: TO_EMAIL }],
          subject: subject || 'New message from portfolio contact form',
        },
      ],
      from: { email: 'no-reply@portfolio', name: name || 'Website Visitor' },
      reply_to: { email },
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      ],
    }

    const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!sgRes.ok) {
      const txt = await sgRes.text().catch(() => '')
      console.error('SendGrid error', sgRes.status, txt)
      // Return limited SendGrid response for debugging (trim to avoid leaking large payloads)
      return res.status(502).json({ message: 'Failed to send email', sendgridStatus: sgRes.status, sendgridBody: String(txt).slice(0, 200) })
    }

    return res.status(200).json({ message: 'Email sent' })
  } catch (err) {
    console.error('Contact handler error', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
