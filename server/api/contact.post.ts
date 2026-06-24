import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, whatsapp, message, token } = body

  // Validation check for mandatory parameters
  if (!name || !email || !message || !token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters: name, email, message, or token are mandatory.',
    })
  }

  // Retrieve private Turnstile secret key from secure runtime configuration
  const config = useRuntimeConfig()
  const secretKey = config.turnstile?.secretKey

  if (!secretKey) {
    console.error('Turnstile secret key is not configured in runtimeConfig.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Turnstile secret key is missing.',
    })
  }

  try {
    // Perform server-to-server fetch request to Cloudflare's verification endpoint
    const verifyResult = await $fetch<{ success: boolean }>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: {
        secret: secretKey,
        response: token,
      },
    })

    if (!verifyResult || !verifyResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Security verification failed. Please try again.',
      })
    }
  } catch (err: any) {
    if (err.statusCode === 400) {
      throw err
    }
    console.error('Error validating Turnstile token:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error performing challenge validation with Cloudflare.',
    })
  }

  // TODO: Implement actual email dispatch logic here (e.g. Resend, Nodemailer, or SMTP integration)
  // console.log('Mail payload queue dispatch placeholder:', { name, email, whatsapp, message })

  return { success: true }
})
